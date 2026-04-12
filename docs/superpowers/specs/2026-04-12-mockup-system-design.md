# Interactive App Mockup System — Design Spec
**Date:** 2026-04-12
**Project:** Insights Portfolio (React + Vite)
**Scope:** ProjectPage layout redesign + DeviceMockup system for Clarity Business

---

## Context

The portfolio's project pages need a way to showcase interactive apps inside a realistic device frame. Clarity Business is the first project to use this. The system must be reusable for future projects with minimal configuration.

The current `MockupLayout` in `ProjectPage.jsx` renders a 1:1 split grid (gallery left, mockup right). The brief changes this to a centered, minimal layout where the iPhone mockup is the single focal point — no gallery for now.

---

## Layout Decision

**A2 — Everything centered.**

Header → divider → mockup → CTA, all on a single centered vertical axis.

```
┌─────────────────────────────────┐
│         ◈ Analytics · SaaS      │  ← NicheLabel (centered)
│         Clarity Business        │  ← h1 (centered)
│         Dashboard VSL Funnel    │  ← sub (centered, muted)
│                                 │
│   Dashboard de analytics para   │  ← desc (centered, max-w 480px)
│   agencias digitales. Meta...   │
│                                 │
│   [ Meta Ads ] [ GHL ] [ Ana ]  │  ← Tags (centered)
│                                 │
│  ─────────────────────────────  │  ← thin divider
│                                 │
│          ┌─────────┐            │
│          │  iPhone │            │  ← DeviceMockup (centered, maxHeight 380)
│          │  (live) │            │
│          └─────────┘            │
│                                 │
│   [ Contactar sobre proyecto ]  │  ← CTA (centered)
└─────────────────────────────────┘
```

**Mobile (< 768px):** Same flow, mockup scales to ~280px maxHeight.

---

## System Architecture

### Reusability model

Projects opt-in to the mockup layout via the `mockup` key in `projects.js`:

```js
{
  id: "clarity",
  mockup: {
    device: "iphone",          // "iphone" | future: "desktop", "tablet"
    src: "https://...",        // URL loaded in iframe (supports ?demo=true)
  }
}
```

If `mockup` is absent → `DefaultLayout` (existing, unchanged).  
If `mockup` is present → `MockupLayout` (redesigned, centered).

Adding a new project with a mockup = add the `mockup` key. Zero code changes.

### Component: `DeviceMockup`

**Location:** `src/react/components/ui/DeviceMockup.jsx` — **no changes needed.**

The component already correctly:
- Loads `marcos.png` as device frame (z-index 2, pointer-events: none)
- Uses `placehold.png` as CSS mask to clip content to screen area
- Renders an iframe at iPhone 16 native size (390×844px)
- Scales it via `transform: translate + scale` to fit the rendered frame width
- Adapts to container width via `ResizeObserver`

The only change: pass `maxHeight={380}` (was 640).

### Component: `MockupLayout`

**Location:** `src/react/pages/ProjectPage.jsx` — **rewrite this function only.**

Key changes:
- Remove gallery (`<Gallery>`, `<GalleryDivider>` not rendered)
- Change from `display: grid 1fr 1fr` to `display: flex; flexDirection: column; alignItems: center`
- All header elements: add `textAlign: "center"` + `margin: 0 auto`
- Tags: `justifyContent: "center"`
- DeviceMockup: `maxHeight={380}`, centered via `margin: 0 auto`
- CTA: centered

---

## Animation

Maintain existing `fadeUp` variant with staggered delays. Keep `viewport={{ once: true }}` pattern. No changes to animation system.

---

## iPhone 16 Scaling

The current math in DeviceMockup is correct for iPhone 16:
- Frame aspect ratio: `1288 / 2614` (~0.493)
- Screen insets: `SCREEN_LEFT = 5.59%`, `SCREEN_TOP = 2.98%`, `SCREEN_RIGHT = 6.68%`
- At `maxHeight=380`: containerWidth ≈ 187px → screenWidth ≈ 164px → scale ≈ 0.42
- Scaled iframe: 390×844 → ~164×355px — fits within visible screen area ✓

The CSS mask handles all visual clipping. No overflow fix needed.

---

## Files to Modify

| File | Change |
|------|--------|
| `src/react/pages/ProjectPage.jsx` | Rewrite `MockupLayout` function — centered layout, no gallery, `maxHeight={380}` |

**Unchanged:**
- `src/react/components/ui/DeviceMockup.jsx` — no changes
- `src/react/data/projects.js` — no changes (clarity entry already correct)
- `DefaultLayout` — no changes

---

## Verification

1. `npm run dev` → open `http://localhost:5173/proyectos/clarity`
2. Check: all elements are centered on a dark background
3. Check: iPhone frame renders with live Clarity app inside
4. Check: app is interactive (click, scroll) within the visible screen area
5. Resize browser to < 768px and confirm responsive behavior
6. Check: DeviceMockup for a project without `mockup` key still uses DefaultLayout
