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

Spacing: TailwindCSS default (4px base), section-py: 64/56/48px (desktop/tablet/mobile)
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

Nav: Fixed header, 56px height, blur backdrop, logo + Inicio/Proyectos/Nosotros links + CTA
Footer: 3-col grid (Servicios, Tecnologías, Navegación) + bottom company description, collapses to 1-col on mobile (<809px)

---

## Build & Run
```bash
npm run dev          # Vite at :5173 (hot-reload)
npm run build        # Vite build to dist/
npm start            # Express server at :3000
npm run preview      # Build + serve at :3000
```

## Deploy (Render)
- Repo: https://github.com/matisaucedo/InsightsPortfolio
- Service type: **Web Service**
- Build Command: `npm install && npm run build`  ← importante: instala devDeps (vite)
- Start Command: `npm start`
- Branch: `main` (auto-deploy on push)
- URL: https://www.insightsapps.tech/
- Service ID: `srv-d7a1o70gjchc739sqpf0`

---

## Scripts
| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `vite --config vite.config.js` | Hot-reload development at :5173 |
| `build` | `vite build --config vite.config.js` | Build for production to `dist/` |
| `start` | `node server.js` | Serve production build at :3000 |
| `preview` | `npm run build && node server.js` | Build + serve production locally |

---

## Work Rules
- Always read file before editing                                                     
- Inline styles for layout/animation; TailwindCSS for utility classes
- Use Framer Motion `whileInView` with `viewport={{ once: true }}`
- All animations trigger on scroll (headless screenshots won't show them)
- No CSS-in-JS libraries — inline + Tailwind only
- Keep animations tight: 0.6-0.8s duration, 0.1-0.15s stagger

---

## Setup & Resources (2026-04-12)

**Stack confirmado:** React 18 + Vite + Tailwind 3.4 + Framer Motion + Lenis. **GSAP descartado por completo. Vercel descartado — deploy en Render.**

**Sistema de diseño (fuente de verdad):** `/Users/matiassaucedo/Documents/Matias boveda/design-system/`. Antes de tocar componentes, leer `design-system/guia-ejecucion.md` (playbook práctico).

**Dispatcher de modelos disponible** (subagentes globales en `~/.claude/agents/`):
- `design-quick` (Haiku) — lookups simples, valores de tokens, "dónde está X"
- `design-build` (Sonnet) — implementación estándar de UI
- `design-architect` (Opus) — decisiones arquitecturales / refactors

Sonnet (sesión principal) los invoca cuando matchean. Si no lo hace, decirle explícitamente: `usá design-quick para...`

**Tokens del proyecto** documentados en bóveda: `design-system/tokens-por-proyecto/insights-minta.md`.

**Sistema de Mockup** (project_mockup_system.md en memoria): iPhone funcionando ✅. **Próximo task:** Mac mockup interactivo, replica la arquitectura de DeviceMockup con frame PNG de MacBook (z:2 screen div, z:1 frame img).

**Verificación visual:** `npx playwright screenshot http://localhost:5173/ out.png` (Playwright MCP deshabilitado por costo de tokens — usar CLI).

## Sync Design System

Al terminar una feature visual (nuevos tokens, cambios en `src/index.css`, nuevos componentes con CSS vars),
abrir sesión de bóveda y correr `/sync-design-system insights` antes del commit final.
