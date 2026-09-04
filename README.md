# 🚀 Pritam Rauniyar — Developer Portfolio

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-black?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Lenis Scroll](https://img.shields.io/badge/Lenis-Smooth_Scroll-blueviolet)](https://github.com/darkroomengineering/lenis)
[![Tests](https://img.shields.io/badge/Tests-9%20passing-brightgreen)](#-testing)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A cinematic, high-performance developer portfolio engineered for **Pritam Rauniyar** (Software Engineer II @ Uber).
> Features procedural audio design, a custom physics cursor, glassmorphic UI, an interactive system architecture blueprint, a command palette, and theme switching — all running at 60 fps with zero layout shifts.

**🌐 Live**: [pritamrauniyar.com.np](https://pritamrauniyar.com.np/)

---

## ✨ Features & Highlights

### 🎨 Design & Motion System
- **Custom Physics Cursor** — Raw `requestAnimationFrame` dot tracking with lerped ring, magnetic pull on interactive elements, and smart visibility handling (blur/focus/tab-switch recovery).
- **Procedural Audio Engine** — Web Audio API synthesizer generating click, hover, whoosh, warp, and ambient sounds entirely in code — zero audio files loaded.
- **Page Transitions** — Framer Motion `AnimatePresence` route transitions with staggered child reveals.
- **Inertia Scrolling** — Silky-smooth scroll via **Lenis** with global `window.__lenis` access for programmatic control.
- **Animated Canvas Background** — O(n²) particle system with inter-particle connection lines, scroll-based RAF pause (>700px), and `visibilitychange` optimization.
- **Glassmorphism UI** — `backdrop-filter` glass cards, CSS custom properties for theme tokens, responsive grid layouts.

### ⚡ Interactive Components
- **Command Palette** — `Cmd/Ctrl + K` omni-search across pages, projects, links, and actions. Fuzzy-matched results with keyboard navigation.
- **System Architecture Blueprint** — Interactive modal (`Cmd/Ctrl + I`) showing live project architecture with animated data-flow pipes, beacon pulses, and contract schema tabs.
- **Career Track Record Timeline** — Responsive vertical timeline with accessible company markers (Uber, Ola, Elevate K-12, MNNIT), category filters, 2×2 stats matrix, and CSS-variable-driven layout.
- **Impact Metrics** — Animated count-up counters triggered on scroll-into-view, showcasing production-scale engineering benchmarks.
- **Tech Marquee** — Auto-touring infinite loop with Fisher-Yates shuffle, responsive slot constellations, and category-filtered tech stack showcase.
- **Resume Download** — Animated multi-state button with quantum warp transition overlay on download.
- **Collaborate CTA** — Full-screen quantum warp transition overlay with procedural audio feedback.
- **TiltCard** — CSS `perspective` + `transform: rotateX/Y` 3D tilt cards with parallax depth layers.
- **Magnetic Buttons** — Physics-based magnetic pull effect on hover using pointer position delta.
- **DevTools HUD** — Hidden developer overlay for performance metrics.

### 📄 Pages
| Page | Description |
|------|-------------|
| **Home** | Hero section with `Typed.js` dynamic roles, impact metrics, tech marquee, and career journey |
| **Projects** | Tiered project showcase (Flagship → Production → Experimental) with live demos and repos. Features SplitHive, AI apps, and web platforms |
| **About** | Engineering philosophy, technical skillset breakdown, and personal background |
| **Certificates** | Cloud & software engineering certifications (Azure, AWS, C++, Generative AI) |
| **Blogs** | Engineering articles, tech tutorials, and thought pieces |
| **Contact** | Instant Webmail launchers (Gmail, Outlook), scheduling callout, and direct links. Available for SDE2 / Senior Software Engineer roles |

### 🎛️ UX & Accessibility
- **Theme Switching** — Multiple color themes with CSS custom properties.
- **Keyboard Navigation** — Full keyboard support across Command Palette, Architecture Modal, and all interactive elements.
- **Touch Detection** — Automatic detection of touch-only devices (`(hover: none) and (pointer: coarse)`) to disable custom cursor on mobile.
- **Responsive Design** — CSS-variable-driven breakpoints with mobile-first grid layouts across all components.
- **Analytics** — Google Analytics 4 integration via `react-ga4`.

---

## 🛠️ Tech Stack

### Frontend & Framework
| Technology | Purpose |
|---|---|
| **React 18** | Component architecture with lazy-loaded routes |
| **React Router v6** | Client-side routing with animated transitions |
| **Redux + Redux-Thunk** | Global state management |
| **Framer Motion 11** | Declarative animations, `AnimatePresence`, layout transitions |

### Motion & Audio
| Technology | Purpose |
|---|---|
| **Lenis** | Ultra-smooth inertia scrolling |
| **Typed.js** | Dynamic typing effect in hero header |
| **Web Audio API** | Procedural sound synthesis (no audio files) |
| **Canvas API** | Particle system background with RAF optimization |

### Styling & Icons
| Technology | Purpose |
|---|---|
| **CSS3 / Glassmorphism** | `backdrop-filter` glass cards, custom properties, responsive grids |
| **React Icons** | High-quality SVG icon sets (FontAwesome, Simple Icons, etc.) |

### Build & Quality
| Technology | Purpose |
|---|---|
| **Create React App** | Build toolchain and dev server |
| **Jest + React Testing Library** | 9 smoke tests covering all major components |
| **Google Analytics 4** | User analytics via `react-ga4` |
| **Web Vitals** | Core Web Vitals monitoring |

---

## 📁 Project Structure

```text
my_portfolio/
├── public/
│   ├── data/
│   │   ├── journeyData.json          # Career & education milestones
│   │   └── projectsData.json         # Tiered projects data & links
│   ├── images/                       # Logos, avatars, and assets
│   └── PritamRauniyarResume.pdf      # Downloadable resume
├── src/
│   ├── components/
│   │   ├── AnimatedBackground/       # Canvas particle system with RAF optimization
│   │   ├── AnimatedCounter/          # Scroll-triggered count-up component
│   │   ├── ArchitectureModal/        # Interactive system architecture blueprint
│   │   ├── CollaborateTransition/    # Quantum warp overlay transition
│   │   ├── CommandPalette/           # Cmd+K omni-search with fuzzy matching
│   │   ├── CustomCursor/             # Physics-based cursor with visibility recovery
│   │   ├── DevToolsHUD/              # Hidden developer performance overlay
│   │   ├── Footer/                   # Site footer and social links
│   │   ├── HeroSection/             # Hero banner with typed headlines
│   │   ├── ImpactMetrics/            # Production-scale engineering metrics
│   │   ├── InteractiveTerminal/      # Terminal-style interactive component
│   │   ├── Journey/                  # Career timeline & milestones
│   │   ├── MagneticButton/           # Physics-based magnetic pull button
│   │   ├── MyContext/                # React context provider
│   │   ├── Navbar/                   # Navigation header with route links
│   │   ├── PageTransition/           # Framer Motion route transition wrappers
│   │   ├── ResumeDownload/           # Multi-state resume download modal
│   │   ├── RouteLoader/              # Lazy route loading indicator
│   │   ├── SmoothScroll/             # Lenis scroll provider & hooks
│   │   ├── SvgIcons/                 # Tech and company SVG icons
│   │   ├── TechMarquee/             # Auto-touring infinite tech stack loop
│   │   ├── TextReveal/               # Kinetic typography scroll reveal
│   │   ├── TiltCard/                 # 3D interactive tilt cards
│   │   └── TreeModal/                # Responsive timeline with company markers
│   ├── pages/
│   │   ├── About/                    # Bio, skillset, and engineering values
│   │   ├── Blogs/                    # Technical articles
│   │   ├── Certificates/             # Cloud certifications showcase
│   │   ├── Contact/                  # Contact form, webmail launchers
│   │   ├── Home/                     # Landing page
│   │   └── Project/                  # Tiered projects gallery
│   ├── utils/
│   │   └── soundEngine.js            # Procedural Web Audio synthesizer
│   ├── App.js                        # Root router, global shortcuts, lazy routes
│   ├── App.test.js                   # 9 smoke tests
│   └── index.js                      # Entry point
├── package.json
└── README.md
```

---

## 🧪 Testing

The project includes **9 comprehensive smoke tests** covering all major components:

```bash
npm test -- --watchAll=false
```

| Test | Validates |
|------|-----------|
| Sound engine initialization | Procedural audio triggers including warp |
| Document environment | DOM availability for SSR safety |
| ResumeDownload button | Multi-state rendering and click transitions |
| CollaborateTransition | Quantum warp overlay trigger |
| ImpactMetrics | Distinct production benchmarks without redundancy |
| Navbar hierarchy | Link order: Home → Projects → About → Certificates → Blogs → Contact |
| Contact webmail launchers | Gmail, Outlook instant launchers and scheduling callout |
| ArchitectureModal | Live beacons, data flow pipes, contract schema tab |
| TreeModal timeline | Responsive timeline with company markers and filters |

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + K` | Open Command Palette |
| `Cmd/Ctrl + I` | Open System Architecture Blueprint |
| `Escape` | Close any open modal or palette |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher
- `npm` (bundled with Node.js)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pritamrauniyar/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run the development server**:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The optimized production bundle is generated in the `build/` folder (~133 kB gzipped JS).

5. **Run tests**:
   ```bash
   npm test -- --watchAll=false
   ```

---

## 🏗️ Architecture Notes

- **Lazy-loaded routes** — All page components use `React.lazy()` + `Suspense` with a `RouteLoader` fallback for optimal code-splitting.
- **RAF optimization** — `AnimatedBackground` and `CustomCursor` use raw `requestAnimationFrame` loops with `visibilitychange` and scroll-position guards to prevent zombie loops and wasted CPU.
- **Lenis integration** — `window.__lenis` is exposed globally so modals (`ArchitectureModal`, `CommandPalette`) can call `__lenis.stop()` / `__lenis.start()` to freeze scroll while overlays are active.
- **Sound engine** — Singleton pattern with `try/catch` guards and muted flag on every method. Safe for SSR and ad-blockers.
- **Custom cursor** — Functional state updates, `body.has-custom-cursor` class toggling, and epsilon threshold on ring lerp to eliminate sub-pixel jitter.

---

## 📬 Contact & Connect

- **Website**: [pritamrauniyar.com.np](https://pritamrauniyar.com.np/)
- **Email**: [pritamrauniyar.np@gmail.com](mailto:pritamrauniyar.np@gmail.com)
- **LinkedIn**: [linkedin.com/in/pritamrauniyar](https://www.linkedin.com/in/pritamrauniyar/)
- **GitHub**: [github.com/pritamrauniyar](https://github.com/pritamrauniyar/)
- **Facebook**: [facebook.com/pritamrauniyar.np](https://facebook.com/pritamrauniyar.np/)
- **Instagram**: [instagram.com/pritamrauniyar.np](https://www.instagram.com/pritamrauniyar.np/)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
