import React, { useState } from 'react';
import { Home, User, Briefcase, Mail, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (section) => {
    setIsOpen(false);
    const vh = window.innerHeight;
    
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'about') {
      // About is directly after Hero (which is 100vh)
      window.scrollTo({ top: vh, behavior: 'smooth' });
    } else if (section === 'work') {
      // Work is exactly after About. Hero (100vh) + About (100vh)
      window.scrollTo({ top: vh * 2, behavior: 'smooth' });
    } else if (section === 'contact') {
      // Contact form is all the way at the bottom of the page
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]">
        {/* Floating Pill Navbar */}
        <div className="bg-[#0a0817]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-full px-4 py-2 flex items-center gap-4 md:gap-6 transition-all duration-300">
          
          {/* 3D Luffy Logo (Left) */}
          <button onClick={() => scrollToSection('home')} className="flex-shrink-0 relative group flex items-center cursor-pointer">
            <div className="absolute inset-0 bg-blue-500/50 rounded-full blur-md group-hover:blur-lg transition-all opacity-0 group-hover:opacity-100"></div>
            <img 
              src="/luffy-logo.jpg" 
              alt="Luffy Logo" 
              className="w-10 h-10 rounded-full object-cover border-2 border-white/20 relative z-10 transition-transform group-hover:scale-105"
            />
          </button>

          {/* Desktop Links with Icons */}
          <div className="hidden md:flex items-center space-x-1">
            <button onClick={() => scrollToSection('home')} className="group flex items-center gap-2 text-slate-300 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 text-sm font-medium transition-all cursor-pointer">
              <Menu size={16} className="text-blue-400 group-hover:scale-110 transition-transform" />
              <span>Home</span>
            </button>
            <button onClick={() => scrollToSection('about')} className="group flex items-center gap-2 text-slate-300 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 text-sm font-medium transition-all cursor-pointer">
              <User size={16} className="text-pink-400 group-hover:scale-110 transition-transform" />
              <span>About</span>
            </button>
            <button onClick={() => scrollToSection('work')} className="group flex items-center gap-2 text-slate-300 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 text-sm font-medium transition-all cursor-pointer">
              <Briefcase size={16} className="text-orange-400 group-hover:scale-110 transition-transform" />
              <span>Work</span>
            </button>
            <button onClick={() => scrollToSection('contact')} className="group flex items-center gap-2 text-slate-300 hover:text-white px-4 py-2 rounded-full hover:bg-white/10 text-sm font-medium transition-all cursor-pointer">
              <Mail size={16} className="text-green-400 group-hover:scale-110 transition-transform" />
              <span>Contact</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger (Right) */}
          <div 
            className="md:hidden pr-2 text-slate-300 cursor-pointer hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Grid Menu */}
      <div 
        className={`fixed inset-0 z-[90] bg-[#0a0817]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-12">
          <button onClick={() => scrollToSection('home')} className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 text-white hover:bg-white/10 active:scale-95 transition-all">
            <Menu size={32} className="text-blue-400" />
            <span className="font-semibold text-lg tracking-wide">Home</span>
          </button>
          <button onClick={() => scrollToSection('about')} className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 text-white hover:bg-white/10 active:scale-95 transition-all">
            <User size={32} className="text-pink-400" />
            <span className="font-semibold text-lg tracking-wide">About</span>
          </button>
          <button onClick={() => scrollToSection('work')} className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 text-white hover:bg-white/10 active:scale-95 transition-all">
            <Briefcase size={32} className="text-orange-400" />
            <span className="font-semibold text-lg tracking-wide">Work</span>
          </button>
          <button onClick={() => scrollToSection('contact')} className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 text-white hover:bg-white/10 active:scale-95 transition-all">
            <Mail size={32} className="text-green-400" />
            <span className="font-semibold text-lg tracking-wide">Contact</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
