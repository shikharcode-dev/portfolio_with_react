import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Contact from './components/Contact';
import Page5 from './components/Page5';
import Footer from './components/Footer';

const SnowOverlay = () => {
  const [flakes, setFlakes] = useState([]);

  useEffect(() => {
    const generatedFlakes = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 2}s`, 
      animationDelay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.5 + 0.2,
      size: `${Math.random() * 4 + 2}px`,
    }));
    setFlakes(generatedFlakes);
  }, []);

  return (
    <div className="fixed inset-0 z-[50] pointer-events-none overflow-hidden mix-blend-screen">
      {flakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute bg-white rounded-full blur-[1px]"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
          }}
          initial={{ y: -10 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: parseFloat(flake.animationDuration),
            delay: parseFloat(flake.animationDelay),
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const { scrollY } = useScroll();
  const [isPage2Pinned, setIsPage2Pinned] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      // Pin when scrolled almost past Hero (100vh)
      // This ensures we ONLY enable internal scrolling when the page is fully in position!
      if (latest >= window.innerHeight * 0.95) {
        setIsPage2Pinned(true);
      } else {
        setIsPage2Pinned(false);
      }
    });
  }, [scrollY]);

  return (
    <main className="w-full font-sans text-white bg-black relative">
      <SnowOverlay />
      <Navbar />
      
      {/* PAGE 1: Hero */}
      <div id="home" className="sticky top-0 h-screen w-full z-0 overflow-hidden">
        <Hero />
      </div>
      
      {/* PAGE 2: About */}
      <div id="about" className="sticky top-6 z-10 w-full px-2 md:px-4 h-[calc(100vh-24px)] pointer-events-none">
        <div 
          className={`bg-[#0a0817] w-full h-full rounded-[2.5rem] shadow-[0_-10px_30px_rgba(0,0,0,0.8)] border border-white/10 overflow-y-auto hide-scrollbar transition-all ${isPage2Pinned ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          <About />
        </div>
      </div>
      
      {/* PAGE 3: Work */}
      <div id="work" className="relative z-20 w-full pt-6 px-4 md:px-8 mt-[10vh] pointer-events-none">
        <div className="bg-[#1a153a] w-full min-h-screen rounded-[2.5rem] shadow-[0_-15px_40px_rgba(0,0,0,0.9)] border border-white/10 overflow-hidden pointer-events-auto">
          <Work />
        </div>
      </div>
      
      {/* PAGE 4: Contact (Canvas Animation + Quotes) */}
      <div className="relative z-30 w-full bg-[#050606]">
        <Contact />
      </div>

      {/* PAGE 5: Contact Form */}
      <div id="contact" className="relative z-40 w-full pointer-events-none mt-[-100vh]">
        <div className="bg-[#0a0817] w-full min-h-screen rounded-[2.5rem] shadow-[0_-15px_40px_rgba(0,0,0,0.9)] border border-white/10 overflow-hidden pointer-events-auto">
          <Page5 />
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-50 w-full bg-[#050606]">
        <Footer />
      </div>
      
    </main>
  );
}

export default App;
