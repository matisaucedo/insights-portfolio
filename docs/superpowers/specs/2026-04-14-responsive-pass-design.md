# Responsive Pass — Design Spec
**Date:** 2026-04-14  
**Status:** Approved  
**Scope:** Full responsive pass + Roadmap redesign (Timeline Scroll Pro style)

---

## Context

The portfolio is currently partially responsive. Navigation has no mobile menu, several sections (Roadmap, ProjectRow grid, ProjectPage mockups) break at mobile widths, and there's no tablet breakpoint. The Roadmap section uses a static IntersectionObserver animation instead of scroll-driven. This spec covers making the entire site pixel-perfect across all devices, and redesigning the Roadmap section to match the Timeline Scroll Pro style (scroll-driven glow path + metallic orb pins).

---

## Breakpoint Strategy

Replace the current inconsistent `809px` breakpoint with a standardized 3-tier system:

| Token | Value | Targets |
|-------|-------|---------|
| `xs`  | ≤ 480px | iPhone SE, small Androids |
| `sm`  | ≤ 768px | Standard phones (iPhone 15, Pixel) |
| `md`  | ≤ 1024px | Tablet portrait (iPad) |
| `lg`  | > 1024px | Desktop — no changes |

In `index.css`: replace `@media (max-width: 809px)` → `@media (max-width: 768px)`, add new `@media (max-width: 1024px)` block.

---

## 1. Navigation — Hamburger Drawer

**Trigger:** ≤ 768px

**Behavior:**
- Desktop nav links (`Inicio / Proyectos / Nosotros` + CTA button) hidden via `display: none` at ≤768px
- Hamburger icon (3 lines, 22×16px, `rgba(255,255,255,1)`) replaces them at the right of the logo
- On tap: drawer slides in from the right (`x: 220 → 0`, Framer Motion spring `stiffness: 300, damping: 28`)
- Overlay: `position: fixed; inset: 0; background: rgba(0,0,0,0.5); opacity: 0→0.5` (tap to close)
- Drawer: `width: 220px; background: #0d0d0d; border-left: 1px solid rgba(255,255,255,0.08); padding: 24px 20px`
- Drawer contents: links (14px vertical list, `border-bottom: 1px solid rgba(255,255,255,0.06)`, 14px padding-y) + CTA button at bottom
- Same hamburger icon becomes × on open (Framer Motion `rotate: 0 → 45` on line 1, `opacity: 1 → 0` on line 2, `rotate: 0 → -45` on line 3)
- Close on: overlay click, link click, × tap, Escape key

**Implementation:** Add `useState(false)` + `AnimatePresence` in `HomePage.jsx` Nav component. No new files needed.

---

## 2. Roadmap — Scroll-Driven Glow + Metallic Orbs

**Reference:** [Timeline Scroll Pro](https://timelinescrollpro.framer.website/) (Sapphire theme → adapted to `#fa8039`)

### Desktop (> 768px) — S-curve preserved

**Path animation:**
- Replace `IntersectionObserver` + `path.animate()` with Framer Motion `useScroll` + `useTransform`
- `useScroll({ target: containerRef, offset: ["start 85%", "end 15%"] })` → `scrollYProgress`
- `strokeDashoffset = useTransform(scrollYProgress, [0, 1], [1497, 0])` as a `MotionValue`
- Bind to `<motion.path>` via `style={{ strokeDashoffset }}`
- Path glow (4-layer drop-shadow, applied via `filter` on SVG `<g>` wrapping the active path):
  ```
  drop-shadow(0 0 2px rgba(250,128,57,1))
  drop-shadow(0 0 8px rgba(250,128,57,0.85))
  drop-shadow(0 0 20px rgba(250,128,57,0.5))
  drop-shadow(0 0 45px rgba(250,128,57,0.2))
  ```

**Metallic orb pins** (replace dashed border left):
- Inner sphere: `28px`, `border-radius: 50%`
- Background: `radial-gradient(circle at 30% 28%, rgba(255,255,255,0.98) 0%, rgba(230,218,205,0.85) 10%, rgba(185,168,148,0.7) 25%, rgba(130,112,92,0.5) 45%, rgba(70,58,44,0.3) 68%, rgba(18,14,10,0.18) 100%)`
- Box-shadow (active): `0 0 10px rgba(250,128,57,1), 0 0 22px rgba(250,128,57,0.65), 0 0 48px rgba(250,128,57,0.3), 0 0 80px rgba(250,128,57,0.1), inset 0 1.5px 0 rgba(255,255,255,0.65), inset -1px -2px 6px rgba(0,0,0,0.5)`
- Outer ring 1: `52px`, `border: 1px solid rgba(250,128,57,0.22)`, pulsing animation
- Outer ring 2: `72px`, `border: 1px solid rgba(250,128,57,0.08)`, animation-delay 0.4s
- Step number: `font-size: 11px`, `font-family: 'Courier New', monospace`, `color: rgba(250,128,57,0.65)`, positioned left of orb
- Inactive state (scroll not reached): dark orb `background: #111`, no glow, no rings, `opacity: 0.3` on card

**Per-step activation:** each step gets its own `useTransform` threshold derived from `scrollYProgress`. Steps activate at 0.15, 0.4, 0.65, 0.9 of total section scroll.

**Content cards** (replace dashed-border boxes):
- `background: rgba(9,10,14,0.94)`, `border: 1px solid rgba(255,255,255,0.065)`, `border-radius: 14px`
- `padding: 18px 20px`, `backdrop-filter: blur(16px)`
- `box-shadow: 0 8px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.03)`
- Step pill: `background: rgba(250,128,57,0.1); border: 1px solid rgba(250,128,57,0.22); border-radius: 999px; font-size: 9px; font-weight: 700; letter-spacing: 0.1em; color: #fa8039`
- Title: `15px`, `font-weight: 500`, `letter-spacing: -0.025em`
- Body: `12px`, `color: rgba(255,255,255,0.52)`, `line-height: 1.55em`

### Mobile (≤ 768px) — Vertical timeline

**Layout:** vertical center line + orbs on left + text on right (approved approach A)

**Line:**
- `position: absolute; left: 14px; width: 1.5px; background: rgba(255,255,255,0.06)`
- Progress fill: `background: linear-gradient(to bottom, #fa8039, rgba(250,128,57,0.25))`; height driven by `useTransform(scrollYProgress, [0, 1], ["0%", "100%"])`
- Glow layer: `7px wide, filter: blur(4px), background: linear-gradient(to bottom, rgba(250,128,57,0.6), transparent)`

**Orbs:** `18px`, same metallic radial-gradient, same glow box-shadow (scaled down)

**Steps:** stacked vertically, `padding-left: 44px`, `margin-bottom: 32px`

**Activation:** same `scrollYProgress` thresholds, each step's orb and text fade/scale in

---

## 3. ProjectRow Grid — Mobile Reflow

**File:** `src/react/index.css` + `HomePage.jsx`

At ≤ 768px:
- `.project-row` changes from `grid-template-columns: 1fr auto` to `display: flex; flex-direction: column`
- Project thumbnail: full width, `height: clamp(180px, 50vw, 220px)`, `border-radius: 8px`, sits above text
- Title: `fontSize: clamp(16px, 4.5vw, 19px)`
- Remove hardcoded `width: 140px; height: 96px` on image wrapper

---

## 4. ProjectPage Mockups — Mobile Layout

**File:** `src/react/pages/ProjectPage.jsx`

At ≤ 768px:
- `MockupBlock` with `device: "split"`: the existing tab switcher handles content, but the container needs to adapt
- `maxWidth: 860` → `maxWidth: min(860px, 100%)` (already safe with CSS, but needs `overflow: hidden` on parent)
- Switcher buttons: `padding: "8px 16px"`, `minWidth: 100` (from 136) to fit on 390px screens
- `MAC_MAX` height: `min(540, containerWidth * 0.62)` — responsive to container
- `IPHONE_MAX` height: `min(620, containerWidth * 0.85)`
- Single-device `MockupBlock`: `marginTop: clamp(40px, 8vw, 88px)`

---

## 5. Section Padding — Responsive Scaling

**File:** `src/react/index.css`

```css
/* Current */
.section-py { padding-top: 64px; padding-bottom: 64px; }
@media (max-width: 809px) { ... }

/* New */
.section-py { padding-top: 96px; padding-bottom: 96px; } /* desktop */
@media (max-width: 1024px) { .section-py { padding-top: 72px; padding-bottom: 72px; } } /* tablet */
@media (max-width: 768px) { .section-py { padding-top: 56px; padding-bottom: 56px; } } /* mobile */
@media (max-width: 480px) { .section-py { padding-top: 48px; padding-bottom: 48px; } } /* xs */
```

Sections to update: `AIFeaturesSection` (`paddingTop: 96` → CSS class), `GuaranteesSection`, `RoadmapSection` header.

---

## 6. AIFeaturesSection — Gap + Padding

At ≤ 768px:
- `gridTemplateColumns: "1fr 1fr"` → `"1fr"` (already handled in CSS, verify)
- `gap: 64` → `gap: 32` via CSS media query
- `paddingTop/Bottom: 96` → handled by `.section-py` class

---

## 7. MobileApp Section

At ≤ 480px:
- Phone image height: `240px` (from `300px !important`)
- Add `@media (max-width: 480px)` block in `index.css`

---

## 8. Footer

At ≤ 768px:
- `paddingTop: 64 → 40`, `paddingBottom: 48 → 32`
- Grid already collapses to 1-col (keep)

---

## 9. Container

At ≤ 1024px (tablet):
- `padding-left: 20px; padding-right: 20px` (from 24px)

At ≤ 768px: stays at 16px (already correct)

---

## Background Color

`src/react/index.css`: `--bg: #000` → `#0a0a0a` already set. Verify `body` background matches `#0a0a0f` (current is `#0a0a0a` — close enough, not changing).

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/react/HomePage.jsx` | Nav hamburger drawer (state + AnimatePresence), ProjectRow responsive |
| `src/react/sections/RoadmapSection.jsx` | Full rewrite: useScroll, metallic orbs, cards, vertical mobile layout |
| `src/react/pages/ProjectPage.jsx` | MockupBlock responsive sizing |
| `src/react/sections/AIFeaturesSection.jsx` | Padding → CSS class |
| `src/react/sections/MobileApp.jsx` | Minor height adjustment |
| `src/react/index.css` | Breakpoints: 809→768, add 1024 tablet block, section padding, footer padding, roadmap mobile styles, projectrow mobile styles |

---

## Verification

1. `npm run dev` — check at 390px, 768px, 1024px, 1440px using browser devtools
2. Test nav drawer: open/close via hamburger, overlay click, link click, Escape
3. Scroll through Roadmap at 1440px — verify glow fills progressively with scroll
4. Scroll through Roadmap at 390px — verify vertical timeline fills progressively
5. Open `/proyectos/donor` at 390px — verify mockup switcher fits, Mac/iPhone switch works
6. `npx playwright screenshot http://localhost:5173/ /tmp/portfolio-mobile.png --viewport-size=390,844`
7. `npx playwright screenshot http://localhost:5173/ /tmp/portfolio-tablet.png --viewport-size=768,1024`
8. `npx playwright screenshot http://localhost:5173/proyectos/donor /tmp/donor-mobile.png --viewport-size=390,844`
