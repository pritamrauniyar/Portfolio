# 🚀 Pritam Rauniyar — Developer Portfolio

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0.0-black?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Lenis Scroll](https://img.shields.io/badge/Lenis-Smooth_Scroll-blueviolet)](https://github.com/darkroomengineering/lenis)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, interactive developer portfolio website built for **Pritam Rauniyar** (Software Engineer II @ Uber / AI Engineer). Featuring ultra-smooth physics-based animations, fluid page transitions, glassmorphic UI design, and responsive design across all devices.

---

## ✨ Features & Highlights

- 🎭 **Physics & Motion**: Smooth page transitions and element reveals powered by **Framer Motion 11**.
- 🧈 **Inertia Scrolling**: Silky-smooth scrolling experience integrated via **Lenis Smooth Scroll**.
- 🖱️ **Interactive Custom Cursor & Magnetic Elements**: Reactive custom cursor with magnetic pull effect on buttons and links.
- 🌌 **Animated Canvas Background**: Dynamic, subtle particle/gradient background effect with noise texture overlay.
- 📊 **Dynamic Impact Counters**: Animated counters that count up on scroll to highlight engineering impact metrics.
- ⏳ **Interactive Journey & Career Timeline**: Visual timeline showcasing experience across Uber, Ola, Elevate K-12, and education at MNNIT.
- 🗂️ **Showcase Pages**:
  - **Home**: Hero section with Typed.js dynamic text, impact metrics, tech marquee, and career journey.
  - **About**: Personal background, engineering philosophy, and technical skillset breakdown.
  - **Projects**: Live demos and repositories for AI and web applications.
  - **Certificates**: Cloud and software engineering certifications (Azure, AWS, C++, Generative AI).
  - **Blogs**: Engineering thoughts, tech articles, and tutorials.
  - **Contact**: Fast communication form and direct reach-out options.
- 📈 **Analytics**: Integrated with **Google Analytics 4 (React-GA4)**.

---

## 🛠️ Tech Stack

### **Frontend & Framework**
- **React 18** (`react`, `react-dom`)
- **React Router v6** (`react-router-dom`)
- **Redux & Redux-Thunk** (`redux`, `react-redux`, `redux-thunk`)

### **Styling & Motion**
- **Framer Motion 11** — Declarative animations and route transitions
- **Lenis** — Ultra-smooth inertia scrolling
- **Typed.js** — Typing effect in the hero header
- **CSS3 / Glassmorphism** — Modern glass cards, backdrop filters, CSS custom properties, and responsive grid layouts
- **React Icons** — High-quality SVG icon sets

---

## 📁 Project Structure

```text
my_portfolio/
├── public/
│   ├── data/
│   │   ├── journeyData.json       # Career & education milestones
│   │   └── projectsData.json      # Projects data & links
│   ├── images/                    # Logos, avatars, and assets
│   └── PritamRauniyarResume.pdf   # Downloadable resume
├── src/
│   ├── components/
│   │   ├── AnimatedBackground/    # Canvas/particle background
│   │   ├── AnimatedCounter/       # Animated count-up component
│   │   ├── CollaborateTransition/ # Smooth transition effects
│   │   ├── CustomCursor/          # Interactive cursor tracking
│   │   ├── Footer/                # Site footer and links
│   │   ├── HeroSection/           # Hero banner with typed headlines
│   │   ├── ImpactMetrics/         # Key metrics showcase
│   │   ├── Journey/               # Career timeline & milestones
│   │   ├── MagneticButton/        # Magnetic physics button component
│   │   ├── Navbar/                # Navigation header
│   │   ├── PageTransition/        # Animated page router wrappers
│   │   ├── ResumeDownload/        # Resume preview and download modal
│   │   ├── SmoothScroll/          # Lenis scroll provider & hooks
│   │   ├── SvgIcons/              # Tech and company SVG icons
│   │   ├── TechMarquee/           # Infinite animated tech stack loop
│   │   ├── TextReveal/            # Kinetic typography text reveal
│   │   └── TiltCard/              # 3D interactive tilt cards
│   ├── pages/
│   │   ├── About/                 # Bio, skillset, and engineering values
│   │   ├── Blogs/                 # Technical articles
│   │   ├── Certificates/          # Cloud certifications showcase
│   │   ├── Contact/               # Contact form and direct links
│   │   ├── Home/                  # Landing page
│   │   └── Project/               # Featured projects gallery
│   ├── App.js                     # Root router and global providers
│   └── index.js                   # Entry point
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v16 or higher recommended) and `npm`.

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
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The optimized production bundle will be generated in the `build/` folder.

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
