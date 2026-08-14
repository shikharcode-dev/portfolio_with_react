import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#050606] border-t border-white/5 pt-32 pb-12 px-6 flex flex-col items-center justify-center overflow-hidden z-[40]">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
      
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        
        {/* Massive Call to Action Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-slate-500 tracking-tighter mb-4">
            Let's Build Something
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">Extraordinary.</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg mt-6">
            Always open to new opportunities, collaborations, and exploring the frontiers of web development.
          </p>
        </motion.div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            href="mailto:mshikhar353@gmail.com"
            className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all group"
          >
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              <Mail className="text-blue-400 w-8 h-8" />
            </div>
            <h3 className="text-white font-bold text-lg mb-1">Email Me</h3>
            <p className="text-slate-400 text-sm">mshikhar353@gmail.com</p>
          </motion.a>

          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            href="https://github.com/shikharcode-dev" target="_blank" rel="noreferrer"
            className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all group"
          >
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]">
              <FaGithub className="text-purple-400 w-8 h-8" />
            </div>
            <h3 className="text-white font-bold text-lg mb-1">GitHub</h3>
            <p className="text-slate-400 text-sm">shikharcode-dev</p>
          </motion.a>

          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            href="https://www.linkedin.com/in/shikharmishra007" target="_blank" rel="noreferrer"
            className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/50 transition-all group"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
              <FaLinkedin className="text-emerald-400 w-8 h-8" />
            </div>
            <h3 className="text-white font-bold text-lg mb-1">LinkedIn</h3>
            <p className="text-slate-400 text-sm">shikharmishra007</p>
          </motion.a>
        </div>

        {/* Bottom Bar */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <div className="flex flex-col items-center md:items-start gap-1 mb-4 md:mb-0">
            <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 tracking-tight">
              Shikhar Mishra
            </h2>
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} All rights reserved. Crafted with passion.
            </p>
          </div>

          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all group"
          >
            <span>Back to Top</span>
            <ArrowUp size={16} className="group-hover:-translate-y-1 group-hover:text-blue-400 transition-all" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
