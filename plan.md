# Premium Enhancement Plan — "Yeah That Was Expensive"

## Vision Statement

This portfolio should feel like walking into a private equity firm's penthouse lobby: warm materials, restrained power, quiet intelligence, and one or two moments of jaw-dropping craft that make visitors pause and screenshot. The goal is to take the existing holographic ROYGBIV / warm cream / serif-mono foundation — which is already distinctive — and add the obsessive layer of spatial depth, choreographed motion, tactile micro-interactions, and cinematic data visualization that separates a student portfolio from something that looks like it cost $80,000 to build. Every interaction should whisper "precision" — the same quality a capital markets analyst brings to a credit memo.

---

## 1. Micro-interactions & Tactile Feedback

### 1a. Custom Cursor System
**Difficulty: Medium | Impact: ★★★★★**

Replace the default cursor site-wide with a custom cursor component. The site already uses `data-cursor="expand"` attributes on interactive elements (visible in `Header.jsx` and `Footer.jsx`) but has no custom cursor implementation consuming them.

- **Default state**: Small 8px filled circle (`#1C1C28`) with a 32px ring outline (`rgba(0,68,204,0.3)`) that trails the dot with spring physics (`stiffness: 180, damping: 18`).
- **Hover on interactive elements** (`data-cursor="expand"`): Ring expands to 56px with the ROYGBIV gradient border (`holo-hue-wave` keyframes already defined in `globals.css`). Dot shrinks to 4px.
- **Hover on text blocks**: Cursor morphs into a thin vertical bar (text cursor shape) with `accent-blue` (#0044CC) color.
- **Drag state** (e.g., `ProjectsShowcase` carousel): Ring becomes a horizontal grab indicator, two small arrows flanking the dot.
- **Click feedback**: Ring contracts sharply to 16px then springs back (spring `stiffness: 500, damping: 12`) — a "snap" feeling.
- **Link hover**: Ring fills with `rgba(204,0,34,0.08)` background, label text like "VIEW" or "OPEN" appears inside the ring in JetBrains Mono 8px uppercase.

Create `components/effects/CustomCursor.jsx` as a client component, mounted once in `ClientShell.jsx`. Track `mousemove` with `framer-motion` `useMotionValue` for zero-lag dot, spring-delayed ring.

### 1b. Button Press Depth
**Difficulty: Easy | Impact: ★★★★☆**

The `MagneticButton` component already has magnetic pull via `useMagnetic(0.3)` and a brutalist box-shadow. Enhance:

- On `whileTap`, add `scale: 0.97`, remove box-shadow instantly, and apply a subtle inner shadow: `box-shadow: inset 0 2px 4px rgba(0,0,0,0.08)`.
- Add a micro "click ring" — a 1px circle that expands outward from the click point and fades, like a ripple. Use the ROYGBIV gradient for the ring stroke.
- Transition the border from `#E61A42` (cycling) to `#1A5DD8` during the press, then back on release — a subtle color "flash."

### 1c. Number Proximity Reactions (KPI Section)
**Difficulty: Medium | Impact: ★★★★★**

In `KPIFullscreen.jsx`, the four metrics (4.00, 3, 6+, 10+) use `CounterDisplay`. Add cursor-proximity awareness:

- Track mouse position relative to each `CounterDisplay`. When the cursor is within 150px:
  - The number subtly increases its `letter-spacing` (tracking expands from `-0.02em` to `0.02em`) — as if the digits "breathe apart" to make room for the cursor.
  - A faint radial gradient follows the cursor position within the counter box, using the ROYGBIV colors from `holo-hue-wave`.
  - The border lines (`border-l-2 border-r-2 border-accent`) pulse brighter in sync with proximity.
- When cursor leaves: digits spring back together with a satisfying settle.

### 1d. Nav Link Directional Underline
**Difficulty: Easy | Impact: ★★★☆☆**

Replace the basic underline with one that slides in from the cursor entry direction:
- Left entry = underline grows from left. Right entry = grows from right.
- Track `mouseenter` event's `clientX` relative to element center.
- On active state, underline becomes a ROYGBIV gradient bar using `holo-wave` at 1px height.

---

## 2. Cinematic Scroll Storytelling

### 2a. Hero-to-Content Transition
**Difficulty: Hard | Impact: ★★★★★**

As the user scrolls past the Spline hero, use `useScroll` + `useTransform` to:
1. Scale the Spline scene down to `0.92` and add `border-radius: 24px` (the 3D object recedes into a card).
2. Simultaneously, the `InfoBanner` marquee slides up from below with a `translateY` driven by scroll progress.
3. Apply `GrainOverlay` (already exists at `components/effects/GrainOverlay.jsx`) that increases opacity from 0 to 0.04 as the hero scrolls away — transition from "clean 3D" to "textured print."

### 2b. Section Divider Wipes
**Difficulty: Medium | Impact: ★★★★☆**

Between major sections, scroll-triggered "wipe" transitions:

- **KPI to Projects**: A diagonal wipe (top-left to bottom-right) using a CSS clip-path animated by scroll progress. The wipe edge is a thin ROYGBIV gradient line (1px) that sweeps across.
- **Projects to Skills**: A horizontal "blinds" reveal — 6 horizontal strips sequentially revealing the Skills section, each strip 16.6vh tall, staggered by 0.05s.
- **Skills to Competencies**: The `SectionAtmosphere` blobs cross-fade their colors with `transition: 1.2s cubic-bezier(0.22, 1, 0.36, 1)`.

### 2c. Timeline as Pinned Cinematic Experience
**Difficulty: Hard | Impact: ★★★★★**

`TimelineScroll.jsx` currently uses basic `whileInView` fades. Transform it:

- Pin the section for `300vh` of scroll distance using `position: sticky`.
- The center `holo-line` draws downward driven by `scrollYProgress` (already exists — make it the primary visual anchor).
- Each entry materializes one at a time: dot appears first (scale 0→1 with overshoot spring), then the entry "types in" character-by-character (JetBrains Mono, 30ms per character).
- Add a floating "year marker" beside the progressing line — a Bloomberg terminal date badge: near-black background, `#1AAF42` mono text.
- Background: as the line progresses, atmospheric blobs shift color temperature. Create `timeline-early` (cooler blues/greens, 2022-2023) and `timeline-late` (warmer reds/golds, 2025-2026) atmosphere variants.

### 2d. Horizontal Scroll for Projects
**Difficulty: Medium | Impact: ★★★★☆**

Upgrade `ProjectsShowcase.jsx` to a true scroll-jacked horizontal section:

- When section enters viewport, pin it. Vertical scroll translates to horizontal card movement.
- Each card passing through the "active zone" (center 40% of viewport) scales from `0.92` to `1.0`, and its `SparkLine` animates `pathLength` from 0 to 1 at that moment.
- `LiveMetrics` numbers only start flickering when the card is in the active zone.
- Use the existing `HorizontalScroll.jsx` effect component as the foundation.

---

## 3. Typography as Art

### 3a. Variable Font for Display
**Difficulty: Medium | Impact: ★★★★☆**

- Replace Cormorant Garamond with **Fraunces** (Google Fonts, variable, optical sizing) for display text — has built-in "wonk" axes for personality and goes 100-900 weight.
- Alternatively: **Instrument Serif** for a modern editorial quality.
- Keep JetBrains Mono (perfect for the financial terminal aesthetic) and Plus Jakarta Sans (body).
- Update `layout.jsx` font imports and `tailwind.config.js` `fontFamily`.

### 3b. Scroll-Driven Weight Animation
**Difficulty: Medium | Impact: ★★★★★**

With a variable font (Fraunces, `wght` axis 100-900):

- Drive `font-weight` by scroll position: starts at `200` (delicate), reaches `800` (commanding) as section enters full viewport. Text literally "solidifies."
- In `CTASection.jsx`, "Seeking Finance Opportunities" starts at weight 300 and settles at 800 as it enters view.
- Apply via `useTransform(scrollYProgress, [0, 0.5], [200, 800])` piped into `style={{ fontVariationSettings: "'wght' ${weight}" }}`.

### 3c. KPI Numbers as Giant Display Typography
**Difficulty: Easy | Impact: ★★★★☆**

- Increase KPI font size to `clamp(4rem, 10vw, 8rem)` — these should be the dominant visual in the section, like a Bloomberg headline price.
- Add tabular number font feature: `font-feature-settings: 'tnum' 1` so digits don't shift width during count-up.
- The `+` suffix on "6+" and "10+" styled separately in `text-accent` color at half the size, vertically aligned to top — like a superscript indicator.

### 3d. Text That Breathes on Idle
**Difficulty: Easy | Impact: ★★★☆☆**

For the CTA heading and the ghost formula `PV = FV / (1+r)^n`:

```css
@keyframes text-breathe {
  0%, 100% { letter-spacing: -0.02em; }
  50%       { letter-spacing: -0.015em; }
}
.text-breathe { animation: text-breathe 6s ease-in-out infinite; }
```

The effect is subliminal — text gently expanding and contracting like breathing.

---

## 4. Light, Shadow & Materiality

### 4a. Unified Light Source System
**Difficulty: Hard | Impact: ★★★★★**

Create a global light source that multiple elements respond to:

- Track cursor position globally in `ClientShell.jsx`. Store normalized `(x, y)` on CSS custom properties `--light-x` and `--light-y` on `document.documentElement`.
- Every card computes shadow offset as `calc((0.5 - var(--light-x)) * 12px)` horizontal and `calc((0.5 - var(--light-y)) * 12px)` vertical. All card shadows shift together — "light is coming from where you're looking."
- Specular highlight: radial-gradient overlay positioned at `(var(--light-x) * 100%, var(--light-y) * 100%)` — a faint white/holographic sheen following the global light.

### 4b. Multi-Layer Shadow Depth System
**Difficulty: Easy | Impact: ★★★★☆**

Replace flat shadows with a 3-layer system:

```css
--shadow-sm:
  0 1px 2px rgba(0,0,0,0.03),
  0 2px 4px rgba(0,0,0,0.03),
  0 4px 8px rgba(0,0,0,0.02);

--shadow-md:
  0 2px 4px rgba(0,0,0,0.04),
  0 4px 8px rgba(0,0,0,0.03),
  0 8px 16px rgba(0,0,0,0.03),
  0 16px 32px rgba(0,0,0,0.02);

--shadow-lg:
  0 4px 8px rgba(0,0,0,0.04),
  0 8px 16px rgba(0,0,0,0.03),
  0 16px 32px rgba(0,0,0,0.03),
  0 32px 64px rgba(0,0,0,0.02);
```

Apply `--shadow-sm` at rest, `--shadow-md` on hover, `--shadow-lg` to modals.

### 4c. Glass Morphism for Skill Cards
**Difficulty: Medium | Impact: ★★★★☆**

Upgrade `SkillCard` in `SkillsHorizontal.jsx`:

- Background: `rgba(248, 246, 244, 0.4)` (more transparent than current `bg-surface/60`).
- `backdrop-filter: blur(16px) saturate(1.4)`.
- Inner border highlight: `border-top: 1px solid rgba(255,255,255,0.6); border-left: 1px solid rgba(255,255,255,0.4)`. Creates "glass catching light."
- On hover, increase `saturate` to `1.8` and add faint ROYGBIV gradient to top border.

### 4d. Specular Edge Highlights on Project Cards
**Difficulty: Medium | Impact: ★★★★☆**

Enhance `TiltCard.jsx`:

- Add a "specular edge" — when tilted, the top edge gets a bright highlight line (1px, `rgba(255,255,255,0.8)`) that shifts position based on tilt angle.
- Increase current radial gradient overlay from `rgba(200,127,150,0.05)` to `0.12`. Add a second ring at `rgba(126,212,188,0.06)` for a holographic double-highlight.
- `box-shadow` intensifies with tilt magnitude: shadow grows larger and more diffuse as tilt increases.

---

## 5. Motion Design System

### 5a. Staggered Entrance Choreography
**Difficulty: Medium | Impact: ★★★★★**

Standardize all section entrances. Create `hooks/useStaggerEntrance.js`:

1. Section label (`font-mono text-xs uppercase tracking-[0.4em]`): enters first, fade + translateY(12px), 0.4s.
2. Headline (`TextReveal`): enters second, delayed 0.2s after label.
3. Content grid/cards: stagger each with `delay: 0.1 * index`, spring with overshoot (`stiffness: 300, damping: 25, mass: 0.8`).
4. Decorative elements (ghost numbers, sparklines, ambient blurs): enter last, slow 0.8s fade.

Unify `KPIFullscreen.jsx`, `ProjectsShowcase.jsx`, `CompetenciesSticky.jsx`, and `TimelineScroll.jsx` under this shared system.

### 5b. Spring Physics for All Motion
**Difficulty: Easy | Impact: ★★★★☆**

Replace all `ease: [0.22, 1, 0.36, 1]` with spring configs. Define in `lib/motion.js`:

```js
export const springs = {
  snappy:  { type: 'spring', stiffness: 500, damping: 30 },         // buttons, toggles
  content: { type: 'spring', stiffness: 200, damping: 25, mass: 0.8 }, // cards, text
  ambient: { type: 'spring', stiffness: 40,  damping: 15, mass: 2 },   // blobs, backgrounds
};
```

### 5c. Page Route Transitions
**Difficulty: Hard | Impact: ★★★★★**

Add animated transitions between `/`, `/about`, `/projects`, `/contact`:

- Wrap `{children}` in `layout.jsx` with `AnimatePresence` + `motion.div` keyed on `pathname`.
- **Exit**: Page slides up 30px and fades out over 0.3s. A gradient overlay wipes down from top.
- **Enter**: New page enters from opacity 0 + translateY(20px), springs into place over 0.5s.
- Header remains static (already `fixed`). Active nav indicator slides between positions using `layoutId`.

### 5d. Extended Magnetic Pull
**Difficulty: Easy | Impact: ★★★☆☆**

The `useMagnetic` hook exists but is only used on `MagneticButton`. Extend to:

- Header social icons (LinkedIn, Mail) — `useMagnetic(0.2)`.
- "View All Projects" link in `ProjectsShowcase.jsx`.
- Each timeline dot in `TimelineScroll.jsx` — subtle attraction when cursor is nearby.

---

## 6. Data Visualization & Financial Aesthetics

### 6a. Bloomberg Terminal KPI Treatment
**Difficulty: Medium | Impact: ★★★★★**

Redesign `KPIFullscreen` to feel like a Bloomberg data panel:

- Each KPI in a "terminal cell" with thin horizontal rules above/below in `rgba(0,68,204,0.15)`.
- A blinking cursor (`|`) after the number during count-up, disappearing on completion.
- A micro sparkline (20px wide, 12px tall) next to each number showing a tiny uptrend in `#1A5DD8`.
- Section footer: `"DATA AS OF MAR 2026 · LIVE"` in JetBrains Mono 9px, `text-muted/40`, with a pulsing `#1AAF42` dot.
- For GPA 4.00: add 8 tiny bars (3px wide each, all at max height) showing semester-by-semester perfection. `#1A5DD8` color with faint glow.

### 6b. Project Card Live Ticker Enhancement
**Difficulty: Medium | Impact: ★★★★☆**

Enhance existing `LiveMetrics` and `SparkLine` in `ProjectsShowcase.jsx`:

- Add "bid/ask" micro-animation: two numbers that occasionally flip with `#1AAF42` (up) / `#CC0022` (down) flash.
- Sparkline "live tip" — rightmost point has a hover tooltip styled as a Bloomberg data tip (dark bg, mono text).
- Increase scan line glow from `rgba(0,68,204,0.05)` to `0.08`.
- At card bottom, add a "mini order book" — 3 stacked 2px bars on each side (green left, red right), updating randomly every 2 seconds.

### 6c. Animated Deal Flow Visualization
**Difficulty: Hard | Impact: ★★★★★**

A Sankey-style flow diagram as an interstitial between KPI and Projects:

- Flow: `Skills (Python, Excel, SQL)` → `Roles (U.S. Bank CM, U.S. Bank CB, Z-Lab)` → `Outcomes (6 ABF Deals, $1.2M Credit, 10+ Structures)`.
- SVG `stroke-dashoffset` animation — flows pulse continuously.
- Color-coded: Finance paths `#E61A42→#E56B1A`, Research paths `#1A5DD8→#5E1AAF`, Leadership `#1AAF42`.
- Hover on any node highlights its connected paths, dims unrelated ones.

---

## 7. Sound Design (Optional but Elite)

### 7a. Interaction Audio Layer
**Difficulty: Medium | Impact: ★★★☆☆**

Optional, disabled-by-default:

- Speaker toggle in header (next to theme toggle).
- **Hover tone**: 50ms sine wave at different frequencies per element type. Buttons: 440Hz, Nav: 523Hz, Cards: 330Hz. Volume 3-5%.
- **Click**: Soft "tock" sound — 80ms, fast attack, quick decay. Web Audio API only (no audio files = zero latency).
- **Timeline milestone**: Subtle "ding" (brief C major chord) when line crosses each entry.
- **Number count-up**: Faint "tick" per digit, like a mechanical counter.

Preference stored in `localStorage`. Default: OFF.

---

## 8. Color & Light Moments

### 8a. Strategic ROYGBIV Deployment
**Difficulty: Easy | Impact: ★★★★☆**

Currently `text-accent` applies `holo-hue-wave` everywhere — this dilutes impact. Refine:

- **Most elements**: Use static colors. `#CC0022` for finance sections, `#0044CC` for technical, `#440099` for skills. Add `.text-accent-static { color: #CC0022; }` class.
- **Reserve ROYGBIV animation for 4 hero moments only**:
  1. Logo "J. Han" on hover.
  2. CTA button "Get in Touch."
  3. Timeline center line as it fills.
  4. Section headlines on first appearance (animate once, settle to static).

### 8b. Dark Mode as a Designed Experience
**Difficulty: Hard | Impact: ★★★★★**

Dark mode as two distinct aesthetics rather than an invert:

- **Light mode**: Warm cream `#F0EDEA`, paper texture, soft blobs — "classic finance."
- **Dark mode**: Near-black `#0C0C14` with blue tint, more saturated blobs (increase opacity 0.07→0.15), more vivid ROYGBIV — "Bloomberg terminal."
- Dark cards: `background: rgba(20, 20, 35, 0.6)` with `backdrop-filter: blur(12px)`. Borders: `rgba(0,68,204,0.2)` — wire-frame aesthetic.
- Dark text: headlines `#E8E6E2` (warm off-white), body `#A0A0B0`.
- Transition between modes: 0.6s cross-fade, not a hard snap.

### 8c. Iridescent Card Treatment
**Difficulty: Medium | Impact: ★★★★☆**

For active project card in `ProjectsShowcase.jsx` (`isActive === true`):

- Add iridescent border using existing `@property --border-angle` and `border-angle-rotate` keyframes already in `globals.css`.
- `conic-gradient(from var(--border-angle), #E61A42, #E56B1A, #D8AC1A, #1AAF42, #1A5DD8, #5E1AAF, #AF1ACA, #E61A42)` behind a 1px border mask.
- The "holographic credit card" effect — fitting for a finance portfolio.

### 8d. Gradient Mesh Background Moments
**Difficulty: Medium | Impact: ★★★★☆**

At `CTASection.jsx`:

- 4-5 overlapping radial gradients with different ROYGBIV colors, each on different drift timings.
- Gradually intensifies as user scrolls deeper: 0.03 opacity → 0.08. Builds visual energy toward "Get in Touch."

---

## 9. Loading & First Impression

### 9a. Custom Loading Sequence
**Difficulty: Hard | Impact: ★★★★★**

Replace the plain gradient loading fallback with a branded sequence:

- **Phase 1 (0-0.5s)**: Cream screen. A single ROYGBIV line draws across center, 1px tall.
- **Phase 2 (0.5-1.5s)**: "J. HAN" types character-by-character in JetBrains Mono, 12px, centered above the line. Each character flashes `#1A5DD8`.
- **Phase 3 (1.5-2.5s)**: "FINANCE & COMPUTER SCIENCE" fades in below the line, `text-muted`.
- **Phase 4 (Spline loaded)**: Screen splits horizontally (top half slides up, bottom half slides down) to reveal the 3D hero. Spring animation for the split.

Create `components/effects/LoadingScreen.jsx`. Manage in `SplineHero.jsx` via Spline `onLoad` callback. Minimum display: 2s.

### 9b. Hero Text Overlay on Spline
**Difficulty: Medium | Impact: ★★★★★**

Add a name/title overlay directly on the Spline hero (inside `SplineHero.jsx`):

- Bottom-left: "JIABEI HAN" in Cormorant/Instrument Serif, `text-display` size. Below: "Capital Markets | WashU '26" in JetBrains Mono 11px uppercase.
- `mix-blend-mode: multiply` in light mode, `screen` in dark — integrates with the 3D scene.
- Parallaxes upward at 0.5x scroll speed and fades out. Position above vignette gradients (higher z-index).

### 9c. Above-the-Fold Density
**Difficulty: Easy | Impact: ★★★★☆**

Two consecutive marquees (`InfoBanner` + `FinanceTicker`) feel redundant. Options:

- Merge into one banner: static top line with "WashU '26 | Finance & CS | 4.00 GPA | U.S. Bank Capital Markets" in JetBrains Mono, and a slower scrolling finance ticker below.
- Or eliminate `InfoBanner` entirely — let `FinanceTicker` alone serve as the ambient texture.

---

## 10. Details That Separate Good from Great

### 10a. ROYGBIV Scrollbar
**Difficulty: Easy | Impact: ★★★☆☆**

Enhance the existing custom scrollbar:

```css
::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom,
    #E61A42, #E56B1A, #D8AC1A, #1AAF42, #1A5DD8, #5E1AAF, #AF1ACA
  );
  box-shadow: 0 0 6px rgba(0,68,204,0.2);
}
```

### 10b. Section-Aware Selection Color
**Difficulty: Easy | Impact: ★★★☆☆**

Update `--selection-bg` CSS custom property in `SectionAtmosphere.jsx` per section:

- Finance sections: `rgba(204,0,34,0.15)`
- Technical sections: `rgba(0,68,204,0.2)`
- Timeline: `rgba(0,119,51,0.15)`
- CTA: `rgba(68,0,153,0.15)`

### 10c. Premium Focus States
**Difficulty: Easy | Impact: ★★★☆☆**

Replace ring focus with animated ROYGBIV outline:

```css
:focus-visible {
  outline: 2px solid #E61A42;
  animation: holo-hue-wave 4s linear infinite;
  outline-offset: 3px;
  border-radius: inherit;
}
```

### 10d. 404 Page
**Difficulty: Easy | Impact: ★★★☆☆**

Create `app/not-found.jsx`:

- "404" in massive display type (20vw), using `CounterDisplay` count-up from 000 to 404.
- Below: `"This page doesn't exist yet. Like an unissued bond."` in JetBrains Mono.
- Single `MagneticButton` → home: "Return to Portfolio."
- Single large atmospheric blob drifting slowly.

### 10e. Browser Tab Theme Color
**Difficulty: Easy | Impact: ★★☆☆☆**

Update `<meta name="theme-color">` every 3 seconds cycling through the ROYGBIV palette in `layout.jsx`. The browser chrome subtly changes color — a signature detail for visitors on mobile/Chrome.

### 10f. Open Graph as Premium Business Card
**Difficulty: Easy | Impact: ★★★★☆**

Enhance `app/opengraph-image.jsx`:

- "JIABEI HAN" large serif on cream background.
- "Finance & Computer Science | WashU '26" in mono below.
- A ROYGBIV gradient bar across the bottom 4px.
- Key stats: "4.00 GPA | U.S. Bank | 6+ ABF Deals" in small mono.
- Looks like a premium business card, not a default template.

### 10g. Performance Budget
**Difficulty: Medium | Impact: ★★★★☆**

- All scroll animations: `useTransform` only — never update React state on scroll.
- Custom cursor: `requestAnimationFrame` directly, not React re-renders.
- Mobile: reduce to 2 atmospheric blobs, blur radius 40px. `@media (max-width: 768px)` overrides.
- Spline: `IntersectionObserver` to only initialize when hero is visible.
- Target: Lighthouse >= 90 desktop, >= 75 mobile. FCP < 1.5s.

---

## Implementation Priority Matrix

| Phase | Enhancements | Effort | Combined Impact |
|-------|-------------|--------|-----------------|
| **Phase 1** | 1a Custom Cursor, 5b Spring Physics, 3c Giant KPIs, 10a-c Scrollbar/Selection/Focus | 3 days | Immediate "feels different" |
| **Phase 2** | 9a Loading Screen, 9b Hero Text Overlay, 6a Bloomberg KPIs, 2a Hero Transition, 4b Shadow System | 4 days | First impression transformation |
| **Phase 3** | 2c Pinned Timeline, 2d Horizontal Projects, 5a Stagger System, 4a Light Source | 5 days | Scroll experience overhaul |
| **Phase 4** | 8b Dark Mode (proper), 5c Page Transitions, 4c Glass Morphism, 8c Iridescent Cards | 4 days | Polish and premium finish |
| **Phase 5** | 3a Variable Font, 3b Scroll-Weight, 6c Deal Flow Viz, 7a Sound, 10d 404 | 3 days | Elite finishing touches |

---

### Critical Files for Implementation
- `app/globals.css` — design system, animation keyframes, dark mode
- `components/sections/KPIFullscreen.jsx` — Bloomberg terminal treatment
- `components/sections/TimelineScroll.jsx` — pinned cinematic timeline
- `components/sections/ProjectsShowcase.jsx` — horizontal scroll + live data
- `components/sections/SplineHero.jsx` — loading screen, text overlay, blend
- `components/layout/ClientShell.jsx` — global cursor, light source tracker
- `hooks/useMagnetic.js` — extend magnetic pull system
- `lib/motion.js` — create unified spring physics constants
