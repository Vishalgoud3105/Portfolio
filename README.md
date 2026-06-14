# C.Vishal Goud — Futuristic AI Portfolio

A scroll-driven, immersive portfolio built with **React + Vite + Tailwind CSS + React Three Fiber**. Seven themed sections with 3D particle fields, holographic UI elements, and Framer Motion scroll animations — all with a cyberpunk AI/robotics aesthetic.

**Live Site:** [vishalgoud3105.github.io/Portfolio](https://vishalgoud3105.github.io/Portfolio/)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS v3 (custom cyberpunk theme) |
| 3D / Particles | React Three Fiber + @react-three/drei + Three.js |
| Animations | Framer Motion (scroll reveals, counters, transitions) |
| 3D Model Viewer | Google model-viewer 3.3 (for GLB files) |
| Icons | Lucide React |
| Fonts | Orbitron + Space Grotesk (Google Fonts) |
| Deployment | GitHub Pages via `gh-pages` |

---

## Sections

| # | Section | Theme |
|---|---------|-------|
| 1 | **Home** — AI Awakening | R3F particle canvas + glitch hero text + hologram orb |
| 2 | **About** — Creator's Genesis | Holographic bio card + grid background + service cards |
| 3 | **Projects** — Innovation Gallery | Neon card grid with hover image overlays |
| 4 | **Experience** — Timeline Corridor | Sci-fi two-column timeline (work + education) |
| 5 | **Skills** — Neural Network | Animated canvas neural net + SVG circular skill meters |
| 6 | **Resume** — Data Core | Animated server rack visual + 14 certification cards |
| 7 | **Contact** — Communication Hub | Terminal console UI + animated contact form |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## Project Structure

```
Portfolio/
├── public/
│   └── assets/
│       └── img/          ← All images served statically
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Loader.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── Hero.jsx      ← Three.js particles + glitch text
│   │   ├── About.jsx     ← Holographic panels
│   │   ├── Projects.jsx  ← 6 project cards
│   │   ├── Experience.jsx← Timeline corridor
│   │   ├── Skills.jsx    ← Neural network + circular meters
│   │   ├── Resume.jsx    ← Server rack + certs
│   │   └── Contact.jsx   ← Terminal + form
│   ├── data/
│   │   └── portfolio.js  ← All content in one place
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html            ← Vite entry point
├── vite.config.js        ← base: '/Portfolio/'
├── tailwind.config.js    ← Custom cyber color palette
└── package.json
```

---

## 3D Models (Tripo AI)

Create these models in Tripo AI, export as `.glb`, place in `public/assets/3d/`, then uncomment the `<model-viewer>` tags in each section.

| File | Section | Tripo AI Prompt |
|------|---------|----------------|
| `ai-brain.glb` | Hero | *Translucent holographic AI brain with glowing neural pathway connections. Neon cyan and purple colors, glass-like surface with circuit patterns inside. Futuristic sci-fi aesthetic.* |
| `robotic-eye.glb` | Hero (alt) | *Cyberpunk robotic eye with glowing neon cyan iris. Metallic chrome exterior with angular geometric panels. Pupil emits a scanning beam. Dark steel aesthetic.* |
| `holo-panel.glb` | About | *Futuristic holographic control panel floating in space. Glowing cyan hologram screens with data graphs. Translucent projections, sci-fi UI panel.* |
| `data-server.glb` | Resume | *Sci-fi server rack with glowing neon LED ports. Holographic data streams floating around it. Cyberpunk digital core aesthetic.* |
| `ben10-echo-echo.glb` | Projects | **Already created — no prompt needed ✅** |

---

## Design System

```
Colors:
  bg:      #05050f   (near-black)
  bg2:     #080818   (section alt bg)
  card:    #0c0c20   (card background)
  cyan:    #00f5ff   (primary accent)
  purple:  #7c3aed   (secondary)
  blue:    #3b82f6   (tertiary)
  magenta: #ff00ff   (glitch effect)

Fonts:
  Headings:  Orbitron  (futuristic geometric)
  Body:      Space Grotesk (clean modern)
```

---

## Contact Form

Currently uses a mock delay for the success animation. To make it live:

**Formspree (easiest):**
1. Sign up at [formspree.io](https://formspree.io) → create a form
2. In `Contact.jsx` replace `handleSubmit` with a real `fetch` POST to your endpoint

---

*Built with React. Powered by AI. Cyberpunk aesthetic.*
