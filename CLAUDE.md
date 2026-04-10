# Insights Software — Portfolio (React Minta Landing)

## Rol
Ingeniero de software de clase mundial. Construyes experiencias visuales de alta calidad. Cada decisión es precisa, deliberada y premium.

---

## Stack Actual (React + Vite)
| Capa | Tecnología |
|------|-----------|
| Lenguaje | React 18 + JSX |
| Bundler | Vite (dev: 5173, prod: dist/) |
| Estilos | TailwindCSS v3.4.17 + CSS inline |
| Animaciones | Framer Motion |
| Íconos | SVG inline |
| Servidor | Node.js `server.js` → localhost:3000 |

---

## Estructura de Archivos (React Build)
```
portfolio/
├── index.html                    # Vite dev entry point (mirrors react.html)
├── react.html                    # Vite build entry point
├── server.js                     # Express: serves dist/react.html
├── assets/
│   └── images/
│       ├── speaker.jpg           # Used in Nosotros section (charla badge)
│       └── team/
│           ├── federico.png      # Team member: CEO
│           ├── juan.png          # Team member: Comercial
│           ├── matias.png        # Team member: Visual · IA
│           └── valentin.png      # Team member: Desarrollo · IA
├── src/react/
│   ├── index.css                 # Global styles, tokens, media queries
│   ├── main.jsx                  # Router, Lenis, AnimatePresence
│   ├── HomePage.jsx              # Nav, HomeScreen, ProyectosScreen, NosotrosScreen (TEAM array at line 16)
│   ├── components/
│   │   └── ui/
│   │       ├── AnimatedText.jsx
│   │       ├── Container.jsx
│   │       ├── FadeUp.jsx
│   │       ├── Gallery.jsx
│   │       ├── GrainOverlay.jsx
│   │       ├── ParallexLayer.jsx
│   │       ├── PulsingOrb.jsx
│   │       ├── ScrollBackground.jsx
│   │       ├── Section.jsx
│   │       ├── SectionLabel.jsx
│   │       ├── SectionTag.jsx
│   │       └── StaggerGrid.jsx
│   ├── data/
│   │   └── projects.js           # 9 projects + NICHES + WHATSAPP_URL
│   ├── pages/
│   │   └── ProjectPage.jsx       # Individual project detail page
│   └── sections/
│       ├── StatsSection.jsx      # Geist Mono numbers, RAF count-up
│       ├── FeatureTrio.jsx       # 3 cards, stagger
│       ├── AIFeaturesSection.jsx # Split layout, left icon + right text
│       ├── RoadmapSection.jsx    # 4 diagonal steps, vertical line
│       ├── SuccessCases.jsx      # 3 testimonial cards
│       ├── GuaranteesSection.jsx # Shield icon + 3-col guarantees
│       └── MobileApp.jsx         # Mobile app section
└── tailwind.config.js            # Tokens: colors, typography
```

---

## Design System (Minta Tokens)
```css
Colors:
  --bg: #000            (main bg)
  --bg-surface: #0d0d0d (card bg)
  --txt: #fff           (primary text)
  --txt-muted: #c2c2c2  (secondary)
  --txt-muted2: #8a8a8a (tertiary)
  --acc: #fa8039        (accent/orange)

Typography:
  Headings:   Inter, weight 400, letter-spacing: -0.04em
  Body:       Inter, weight 400
  Stats:      Geist Mono weight 300, "tnum" "zero" enabled
  Labels:     Inter, weight 500, 11px, uppercase, letter-spacing: 0.14em

Spacing: TailwindCSS default (4px base)
Border:   1px solid rgba(255,255,255,0.08) — cards
          1px solid rgba(255,255,255,0.12) — UI elements
```

---

## Animation System (Framer Motion)
- **Hero**: initial `opacity: 0, y: 48` → animate `opacity: 1, y: 0` (duration 0.9s, stagger 0.2-0.65s)
- **Sections**: `whileInView` on scroll, `viewport={{ once: true }}`
- **Stagger**: `transition.staggerChildren: 0.12-0.14s`
- **Cards hover**: `scale: 1.02` or `y: -4px` with duration 0.25s
- **Count-up (Stats)**: RAF with easeOutCubic, 800ms duration

---

## Core Components
**SectionLabel** — Arrow prefix + uppercase label (accepts `center` boolean)
**Section** — Wrapper with id + relative positioning for glows
**Container** — max-width: 1128px, padding: 24px (responsive)

---

## Sections & Status
1. **Hero** ✅ — Full viewport, dark bg, centered text, CTA button
2. **StatsSection** ✅ — 4 Geist Mono numbers, "tnum" "zero" features
3. **FeatureTrio** ✅ — 3 cards, hover lift, stagger animation
4. **AIFeaturesSection** ✅ — Split layout, centered header + SectionLabel
5. **RoadmapSection** ✅ — 4 steps, diagonal stagger, vertical line, dots
6. **SuccessCases** ✅ — 3 testimonial cards, hover lift
7. **GuaranteesSection** ✅ — Shield icon, 3-col text
8. **MobileApp** ✅ — Mobile app showcase section

Nav: Fixed header, 56px height, blur backdrop, logo + links + CTA
Footer: 4-col grid on desktop, collapses to 1-col on mobile (<809px)

---

## Build & Run
```bash
npm run dev          # Vite at :5173 (hot-reload)
npm run build        # Vite build to dist/
npm start            # Express server at :3000
npm run preview      # Build + serve at :3000
```

---

## Scripts
| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `vite --config vite.config.js` | Hot-reload development at :5173 |
| `build` | `vite build --config vite.config.js` | Build for production to `dist/` |
| `start` | `node server.js` | Serve production build at :3000 |
| `preview` | `npm run build && node server.js` | Build + serve production locally |

---

## Known Fixes (Completed)
- ✅ Geist Mono font loaded via Google Fonts in react.html
- ✅ RoadmapSection dots positioned correctly with `calc(OFFSETS[i] + 9px)`
- ✅ SectionLabel accepts `center` prop, passed in 4 centered sections
- ✅ Footer mobile grid collapses via `.footer-grid` media query in index.css
- ✅ Server correctly serves dist/
- ✅ Orphaned section files removed (AIFeatures, Roadmap, Stats, Testimonials, etc.)
- ✅ Dev artifacts cleaned (screenshot scripts, PNGs, test-results)
- ✅ Team photos directory created and files copied with correct names
- ✅ server.js `/ref` route fixed to point to `assets/minta-framer-ai (1)/images`
- ✅ package.json scripts updated (dev, build, start, preview)
- ✅ Team member photos updated: `assets/images/team/{federico,juan,matias,valentin}.png` → used in TeamSpotlight carousel (Nosotros section)
- ✅ Speaker image updated: `assets/images/speaker.jpg` → displayed in Nosotros "En mis últimas charlas" section
- ✅ Created `index.html` entry point for Vite dev server (mirrors react.html)

---

## Work Rules
- Always read file before editing
- Inline styles for layout/animation; TailwindCSS for utility classes
- Use Framer Motion `whileInView` with `viewport={{ once: true }}`
- All animations trigger on scroll (headless screenshots won't show them)
- No CSS-in-JS libraries — inline + Tailwind only
- Keep animations tight: 0.6-0.8s duration, 0.1-0.15s stagger

---

## Current Status
✅ **PRODUCTION READY**

All 8 sections + Nav + Footer match Minta's 1:1 layout, spacing, typography, and animations. Code is clean, well-organized, and fully documented. Project can be deployed immediately.
