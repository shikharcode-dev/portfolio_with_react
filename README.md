# Shikhar Mishra - Portfolio 🚀

A cutting-edge, highly interactive web developer portfolio built with React, Vite, TailwindCSS, and Framer Motion. This portfolio focuses on delivering a cinematic, physics-driven user experience with a futuristic glassmorphism aesthetic.

## 🌟 Live Features

- **Physics-Driven Animations**: Butter-smooth scrolling animations powered by `framer-motion`'s `useScroll` and `useTransform` hooks.
- **Cinematic Hero Section**: Features a dynamic, rotating 3D space station background layered under beautiful glowing typography.
- **Scroll Layering Architecture**: Employs an advanced `sticky` positioning system to create a vertical layering effect where sections seamlessly slide over one another.
- **Interactive About Section**: A masonry grid of animated skill cards that light up dynamically on hover.
- **Animated Projects Showcase**: Display your work in a sleek grid format, complete with glassmorphic modal popups when clicking on a project.
- **Interactive Anime Canvas**: A unique narrative contact scroll experience featuring smooth transitions from One Piece and Naruto aesthetics.
- **Premium Glassmorphic Footer**: Features floating contact cards with ambient glow effects and a dynamic background.
- **Snow Particles**: A global, screen-blended snow particle overlay that brings the entire experience to life.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: `lucide-react` & `react-icons`

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shikharcode-dev/portfolio_with_react.git
   cd portfolio_with_react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📂 Project Structure

```text
src/
├── components/
│   ├── Navbar.jsx    # Sticky top navigation with programatic scrolling
│   ├── Hero.jsx      # Cinematic space station entry
│   ├── About.jsx     # Skills and about me masonry grid
│   ├── Work.jsx      # Projects grid with modal support
│   ├── Contact.jsx   # 800vh scroll-driven canvas narrative
│   ├── Page5.jsx     # Clean glassmorphism contact form
│   └── Footer.jsx    # Premium glowing footer & social links
├── App.jsx           # Main orchestrator & scroll pin logic
├── index.css         # Global styles & keyframe animations
└── main.jsx          # React entry point
```

## 🎨 Design Philosophy

This portfolio was designed to stand out. It explicitly avoids plain colors in favor of:
- **Ambient Glows**: Using Tailwind's extensive color palette to cast soft light behind cards.
- **Glassmorphism**: Backdrop filters (`backdrop-blur`) combined with semi-transparent borders.
- **Micro-interactions**: Everything reacts to the user's cursor, from subtle hover lifts to dynamic border color changes.

## 🤝 Contact

Designed and developed by **Shikhar Mishra**.

- **Email**: mshikhar353@gmail.com
- **LinkedIn**: [shikharmishra007](https://www.linkedin.com/in/shikharmishra007)
- **GitHub**: [shikharcode-dev](https://github.com/shikharcode-dev)

---
*Crafted with passion and React.*
