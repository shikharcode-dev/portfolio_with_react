import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Cinematic React',
    tags: ['React', 'TMDB API', 'TailwindCSS', 'Framer Motion'],
    desc: 'A modern, cinematic movie discovery application. Built with React and integrated with the TMDB API to fetch real-time movie data, trailers, and cast information. Features a Netflix-style UI with smooth infinite scrolling and complex state management.',
    points: [
      'Integrated TMDB REST API for dynamic movie fetching.',
      'Implemented custom infinite scroll and pagination.',
      'Built a cinematic hero section with auto-playing trailers.',
      'Managed complex application state using Redux Toolkit.'
    ],
    link: 'https://github.com/shikharcode-dev/cinematic-react',
    liveLink: 'https://cinematic-react-lac.vercel.app/',
    image: '/projects/cinematic.jpg',
    color: 'from-red-500 to-rose-600'
  },
  {
    id: 2,
    title: 'Sky-Mart Platform',
    tags: ['React', 'Redux', 'Node.js', 'Stripe'],
    desc: 'A full-featured e-commerce platform designed for speed and scalability. Includes product filtering, a dynamic shopping cart, and seamless checkout flows.',
    points: [
      'Developed a dynamic shopping cart with persistent local storage.',
      'Created complex product filtering and sorting mechanisms.',
      'Implemented a responsive grid system for product displays.',
      'Optimized component rendering for high performance.'
    ],
    link: 'https://github.com/shikharcode-dev/Sky-Mart',
    liveLink: 'https://sky-mart-drab.vercel.app/',
    image: '/projects/skymart.jpg',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 3,
    title: 'FinTrack Pro',
    tags: ['React', 'Chart.js', 'TailwindCSS', 'Firebase'],
    desc: 'An advanced personal finance dashboard that allows users to track expenses, visualize income, and manage budgets in real-time with beautiful charts.',
    points: [
      'Built interactive data visualizations using Chart.js.',
      'Implemented secure user authentication flows.',
      'Designed a responsive, glassmorphism-based dashboard UI.',
      'Developed real-time data sync for transaction histories.'
    ],
    link: 'https://github.com/shikharcode-dev/FinTrack-Pro',
    liveLink: 'https://shikharcode-dev.github.io/FinTrack-Pro/',
    image: '/projects/fintrack.jpg',
    color: 'from-emerald-500 to-green-600'
  },
  {
    id: 4,
    title: 'Grid Project Movie UI',
    tags: ['HTML5', 'CSS Grid', 'Flexbox', 'UI Design'],
    desc: 'A masterclass in modern CSS layouts. This project faithfully recreates a complex, asymmetrical movie platform UI entirely using raw CSS Grid and Flexbox techniques.',
    points: [
      'Engineered complex asymmetrical layouts using advanced CSS Grid.',
      'Ensured 100% responsiveness across all device breakpoints.',
      'Implemented custom CSS animations and hover states.',
      'Built without relying on heavy UI frameworks.'
    ],
    link: 'https://github.com/shikharcode-dev/Grid-project-Movie-UI',
    liveLink: 'https://shikharcode-dev.github.io/Grid-project-Movie-UI/',
    image: '/projects/gridui.jpg',
    color: 'from-purple-500 to-fuchsia-600'
  },
  {
    id: 5,
    title: 'E-Com Digital Project',
    tags: ['React', 'Context API', 'CSS Modules'],
    desc: 'A lightweight, fast, and accessible e-commerce storefront focusing on core shopping fundamentals and clean component architecture.',
    points: [
      'Managed application state cleanly using React Context API.',
      'Built highly reusable and modular UI components.',
      'Implemented accessible form validations and error handling.',
      'Designed a minimalist, user-centric shopping experience.'
    ],
    link: 'https://github.com/shikharcode-dev/E-Com-project',
    image: '/projects/ecom.jpg',
    color: 'from-orange-500 to-amber-600'
  }
];

// Tech tags mapping for colors
const techColors = {
  'React': 'text-cyan-400',
  'Node.js': 'text-green-400',
  'TailwindCSS': 'text-teal-400',
  'Redux': 'text-purple-400',
  'HTML5': 'text-orange-500',
  'CSS Grid': 'text-blue-400',
  'Chart.js': 'text-pink-400',
  'Firebase': 'text-yellow-500',
  'Stripe': 'text-indigo-400',
  'TMDB API': 'text-emerald-400',
  'Framer Motion': 'text-fuchsia-400',
  'Flexbox': 'text-blue-500',
  'Context API': 'text-cyan-300',
  'CSS Modules': 'text-pink-300',
  'UI Design': 'text-rose-400'
};

const Work = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Stop body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  return (
    <section id="work" className="min-h-screen w-full bg-[#050505] py-24 px-4 md:px-16 relative overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl font-bold text-white mb-16"
        >
          My Selected Projects
        </motion.h2>

        <div className="flex flex-col w-full">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(project)}
              className="group relative border-b border-white/10 py-10 flex flex-col md:flex-row md:items-center justify-between cursor-pointer transition-colors hover:bg-white/[0.02]"
            >
              <div className="flex flex-col gap-2 relative z-10">
                <h3 className="text-2xl md:text-4xl font-bold text-slate-200 group-hover:text-white transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-4 mt-2">
                  {project.tags.map(tag => (
                    <span key={tag} className={`text-sm font-medium ${techColors[tag] || 'text-orange-400'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 md:mt-0 relative z-10 flex items-center gap-2 text-slate-400 group-hover:text-white transition-colors duration-300">
                <span className="font-semibold tracking-wider text-sm uppercase">Read More</span>
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Hover Image Preview */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed pointer-events-none z-40 hidden md:block"
            style={{
              top: mousePosition.y - 150, // Center image on cursor (image height / 2)
              left: mousePosition.x + 40, // Offset to the right of cursor
            }}
          >
            <div className="w-[400px] h-[300px] rounded-xl overflow-hidden shadow-2xl border border-white/10 relative">
              <div className={`absolute inset-0 bg-gradient-to-tr ${hoveredProject.color} opacity-20`} />
              <img 
                src={hoveredProject.image} 
                alt={hoveredProject.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#0a0a0f] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Banner Image */}
              <div className="w-full h-[300px] md:h-[400px] relative shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent z-10" />
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Area */}
              <div className="p-8 md:p-12 overflow-y-auto z-20 -mt-20 relative flex-1">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 drop-shadow-lg">
                  {selectedProject.title}
                </h2>
                
                <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">
                  {selectedProject.desc}
                </p>

                <div className="space-y-4 mb-12 max-w-2xl">
                  {selectedProject.points.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-orange-400 mt-2.5 shrink-0 shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
                      <p className="text-slate-400 leading-relaxed text-base">{point}</p>
                    </div>
                  ))}
                </div>

                {/* Footer / Tech Stack / Link */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
                  
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2 flex-1">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                    <a 
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 transition-colors flex-1 sm:flex-none justify-center border border-white/20"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      Repo
                    </a>

                    {selectedProject.liveLink && (
                      <a 
                        href={selectedProject.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-slate-200 transition-colors flex-1 sm:flex-none justify-center shadow-lg"
                      >
                        Live Demo
                        <svg className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Work;
