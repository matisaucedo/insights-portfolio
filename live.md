# Live — Insights Portfolio

> ⚠️ **LEER ANTES DE HACER NADA**: La sesión anterior intentó ejecutar este plan pero **no quedó bien**. El usuario pidió explícitamente **re-ejecutar el plan desde cero**. No asumir que nada de lo que figura como "hecho" en commits viejos está realmente terminado — **verificar cada punto contra el feedback de Fede** antes de dar nada por cerrado.

## Contexto

**Branch activa**: `dev-2026-04-18-feedback-fede` (NO mergear a main hasta que el usuario diga "subí a prod")
**Main**: `main` — PROHIBIDO push directo (hard rule COO)
**Stack**: React 19 + Vite + Framer Motion + Lenis + TailwindCSS v3.4
**Acento**: `#fa8039` · fondo `#000`

---

## Plan original (feedback Fede) — RE-EJECUTAR

### 1. Home hero
- Subir el título del hero
- Bordes de imagen hero con blur/fade (estilo página `/proyectos`)
- Header image con carga rápida (preload, fetchpriority)

### 2. Copy honesto
- Remover **"+100 proyectos"** en todos lados (real son ~10) — revisar que quede en 0 menciones a "+100"

### 3. Bugs de navegación
- `/nosotros` rompe el back/home
- Botón back en project detail roto
- Imágenes lentas en Nosotros
- Drawer mobile debe cerrarse al cambiar ruta

### 4. DonorTrack
- Agregar nota: **la app está construida como web responsive** (no rebuild, solo aclarar)

### 5. Reemplazar CTA WhatsApp con form multi-step
- Wizard: **nombre → email → idea → presupuesto**
- Presupuesto radio: **$6k–$8k / $8k–$10k / $10k+**
- Página de **gracias** después del submit
- Form conectado a Formspree (placeholder OK, usuario configura)

### 6. Pixel-perfect scraping de refs
- Form: https://www.framer.com/marketplace/components/leadqualification/
- Thank you: https://editr.framer.media/
- Contenido adaptado: https://insightsconsulting.info/software-insights
- **Verificar contra screenshots de refs — no aproximar**

### 7. Autonomía
- Ejecutar agentes en paralelo (Frontend Lead + Form Builder + Bug Hunter + Pixel-Perfect)
- Sin intervención del usuario hasta terminar

---

## Qué hay que hacer al retomar

1. **Leer `CLAUDE.md`** del repo + `MEMORY.md` del vault
2. **Chequear estado actual** de la branch `dev-2026-04-18-feedback-fede`:
   - `git log --oneline main..HEAD` para ver qué se tocó
   - **No confiar en los mensajes de commit** — verificar visualmente cada item del plan con chrome-devtools screenshots
3. **Re-ejecutar el plan completo** siguiendo los 7 puntos de arriba
4. Dispatchar agent-team en paralelo con Mermaid canvas (hard rule COO)
5. Verificar con screenshots antes de reportar "hecho" (hard rule verify-before-finish)

## Pendientes del usuario

- **Formspree**: crear form real en formspree.io y reemplazar placeholder `xblzjjow` en `src/react/pages/ContactoPage.jsx`
- **Merge a main**: SOLO cuando el usuario diga literalmente "subí a prod"

## Pendientes para próxima conversación

- **/gracias — adaptar visual Framer `editr.framer.media`**
  - **NO** clonar contenido del ref (no tiene video ni la info nuestra)
  - **MANTENER** la página `/gracias` actual (`GraciasPage.jsx`) con su contenido propio (video + mensaje + CTAs)
  - **APLICAR** solo el lenguaje visual / composición / tipografía del ref editr a la estructura existente
  - Verificar contra `/tmp/insights-refs/editr.png`

## Rutas para QA (dev server puerto 5173)

- `/` — home
- `/proyectos`
- `/nosotros`
- `/proyectos/donor` — verificar appNote pill
- `/contacto` y `/contacto/donor` — wizard 4 steps
- `/gracias` — thank you page

## Refs visuales (descargados en sesión previa, pueden seguir válidos)

- `/tmp/insights-refs/leadqual.png` — form ref
- `/tmp/insights-refs/editr.png` — thank you ref

---

_Sesión previa dejó commits `70dff3c` y `0639619` en la branch pero el usuario dijo que el trabajo no está terminado. Re-evaluar, re-ejecutar, y verificar con screenshots antes de cerrar._
