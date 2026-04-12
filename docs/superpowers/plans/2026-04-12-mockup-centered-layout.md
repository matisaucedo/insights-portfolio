# Mockup Centered Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `MockupLayout` in `ProjectPage.jsx` to display a centered, single-column layout with the iPhone mockup as the sole visual focus — no gallery.

**Architecture:** Only `MockupLayout` function is changed. `DeviceMockup`, `DefaultLayout`, `projects.js`, and all other components remain untouched. The mockup system's reusability contract (projects opt-in via `mockup` key in `projects.js`) is already in place.

**Tech Stack:** React 18, Framer Motion, inline styles + TailwindCSS, Vite dev server at `:5173`

---

### Task 1: Rewrite `MockupLayout` in `ProjectPage.jsx`

**Files:**
- Modify: `src/react/pages/ProjectPage.jsx:156-233`

- [ ] **Step 1: Replace the `MockupLayout` function**

Open `src/react/pages/ProjectPage.jsx` and replace lines 153–233 (the `MockupLayout` function and its comment banner) with:

```jsx
/* ══════════════════════════════════════════════════════════════════════════
   MOCKUP LAYOUT — centered single column, device mockup as hero
   ══════════════════════════════════════════════════════════════════════════ */
function MockupLayout({ project, navigate }) {
  return (
    <div style={{ paddingTop: 80, minHeight: "100vh", paddingBottom: 120, background: "#000" }}>
      <div className="container-minta" style={{ paddingTop: 48, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <BackButton navigate={navigate} />

        {/* Niche label */}
        <NicheLabel text={project.nl} />

        {/* Title */}
        <motion.h1
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: "clamp(32px, 5vw, 62px)",
            fontWeight: 400,
            letterSpacing: "-0.04em",
            lineHeight: "1.0em",
            color: "#fff",
            marginBottom: 16,
          }}
        >
          {project.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={0.12}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: "rgba(255,255,255,0.40)",
            letterSpacing: "-0.01em",
            marginBottom: 16,
          }}
        >
          {project.sub}
        </motion.p>

        {/* Description */}
        <motion.p
          custom={0.18}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.32)",
            lineHeight: "1.65em",
            maxWidth: 480,
            marginBottom: 20,
          }}
        >
          {project.desc}
        </motion.p>

        {/* Tags */}
        <Tags tags={project.tags} delay={0.22} />

        {/* Divider */}
        <motion.div
          custom={0.26}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            width: "100%",
            height: 1,
            background: "rgba(255,255,255,0.07)",
            margin: "40px 0",
          }}
        />

        {/* Device Mockup */}
        <motion.div
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ width: "100%" }}
        >
          <DeviceMockup src={project.mockup.src} maxHeight={380} />
        </motion.div>

        {/* CTA */}
        <div style={{ marginTop: 56 }}>
          <CtaButton />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify `BackButton` alignment**

`BackButton` currently renders with `marginBottom: 48` and is a flex row with an arrow. Since the parent is now `alignItems: center`, it will be centered. That's fine — no change needed.

- [ ] **Step 3: Commit**

```bash
git add src/react/pages/ProjectPage.jsx
git commit -m "feat: redesign MockupLayout to centered single-column with iPhone hero"
```

---

### Task 2: Visual verification

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

Open `http://localhost:5173/proyectos/clarity`

- [ ] **Step 2: Check centered layout**

Verify:
- Badge, title, subtitle, description, tags are all horizontally centered
- A thin gray divider separates the text from the mockup
- iPhone frame is centered with the Clarity app rendering inside
- App is interactive (click, scroll within device bounds)
- No content overflow outside the phone frame

- [ ] **Step 3: Check responsive behavior**

Resize browser to < 768px. Verify:
- iPhone scales down correctly (CSS `maxWidth: maxHeight * ASPECT` handles this automatically)
- No horizontal scroll

- [ ] **Step 4: Verify DefaultLayout unchanged**

Navigate to a project without a `mockup` key (e.g. any other project in the grid). Confirm `DefaultLayout` still renders correctly with gallery + description + CTA.
