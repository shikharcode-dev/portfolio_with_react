import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Code, GitBranch, Terminal } from 'lucide-react';
import { FaReact, FaGithub, FaPython, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiMongodb, SiTailwindcss, SiRedux } from 'react-icons/si';
import ZeroGravitySkills from './ZeroGravitySkills';
import GlobeCard from './GlobeCard';

const CodeEditorMockup = () => {
  return (
    <div 
      className="w-full max-w-[400px] bg-[#0d0d12]/90 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col font-mono text-sm transform-gpu transition-all duration-500"
      style={{
        transform: 'perspective(1000px) rotateX(15deg) rotateY(15deg) rotateZ(-5deg) scale(0.9)',
      }}
    >
      <div className="bg-[#1a1a24] h-8 flex items-center px-4 gap-2 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        <div className="mx-auto text-xs text-slate-500 pr-8">index.js</div>
      </div>
      <div className="p-4 md:p-6 text-slate-300 overflow-hidden leading-relaxed text-[10px] md:text-xs">
        <p><span className="text-purple-400">import</span> <span className="text-yellow-200">React</span> <span className="text-purple-400">from</span> <span className="text-green-300">'react'</span>;</p>
        <p><span className="text-purple-400">import</span> <span className="text-yellow-200">&#123; createRoot &#125;</span> <span className="text-purple-400">from</span> <span className="text-green-300">'react-dom/client'</span>;</p>
        <br/>
        <p><span className="text-purple-400">const</span> <span className="text-blue-400">App</span> = () <span className="text-purple-400">=&gt;</span> (</p>
        <p className="ml-4">&lt;<span className="text-red-400">div</span> <span className="text-orange-300">className</span>=<span className="text-green-300">"app"</span>&gt;</p>
        <p className="ml-8">&lt;<span className="text-red-400">h1</span>&gt;Hello World!&lt;/<span className="text-red-400">h1</span>&gt;</p>
        <p className="ml-4">&lt;/<span className="text-red-400">div</span>&gt;</p>
        <p>);</p>
        <br/>
        <p><span className="text-blue-400">createRoot</span>(<span className="text-orange-200">document</span>.<span className="text-blue-400">getElementById</span>(<span className="text-green-300">'root'</span>)).<span className="text-blue-400">render</span>(&lt;<span className="text-blue-400">App</span> /&gt;);</p>
      </div>
    </div>
  );
};

const ContactCard = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText('mshikhar353@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full bg-[#7c3aed] bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl overflow-hidden relative flex flex-col justify-center items-center p-8 transition-transform hover:scale-[1.02] duration-300 min-h-[250px]">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight text-center">
        Do you want to start a project together?
      </h3>
      <button 
        onClick={handleCopy}
        className="bg-[#131320] hover:bg-black text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold transition-all flex items-center gap-3 border border-white/10 shadow-2xl text-sm md:text-base cursor-pointer"
      >
        <div className="w-5 h-5 flex items-center justify-center opacity-70">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
        </div>
        {copied ? "Copied!" : "Copy Email Address"}
      </button>
    </div>
  );
};

const About = () => {
  const cardClasses = "bg-[#131320]/80 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden relative transition-transform hover:scale-[1.02] duration-300";

  return (
    <section id="about" className="min-h-screen bg-[#0a0817] text-white overflow-hidden relative">
      
      {/* Background glow blobs to tie into the Hero's aesthetic without harsh cuts */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[40%] rounded-full bg-pink-500/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[40%] left-[30%] w-[20%] h-[20%] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none"></div>

      {/* Scroll Transition Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 150 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, type: "spring", bounce: 0.2 }}
        className="max-w-7xl mx-auto px-4 md:px-8 py-24 w-full relative z-10"
      >
        
        {/* 2-Column Masonry Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
          
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2">
            
            {/* Bio Card (Tall) */}
            <div className={`${cardClasses} bg-gradient-to-b from-[#1a153a]/80 to-[#131320]/80 flex flex-col min-h-[500px]`}>
              {/* Angled Code Editor Top Section */}
              <div className="w-full h-[300px] flex items-center justify-center pt-8 overflow-hidden">
                <CodeEditorMockup />
              </div>
              
              {/* Text Bottom Section */}
              <div className="p-8 mt-auto">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-white">Hi, I'm </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Shikhar Mishra</span>
                </h3>
                <p className="text-base text-slate-300 leading-relaxed font-medium">
                  B.Tech CSE '29 @ CGC University Mohali. Over the last few years, I've developed my frontend dev skills to deliver dynamic, scalable, and responsive web applications.
                </p>
              </div>
            </div>

            {/* CTA Card (Short) */}
            <div className="w-full">
              <ContactCard />
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2">
            
            {/* Skills Physics Card (Medium) */}
            <div className={`${cardClasses} h-[300px]`}>
              <ZeroGravitySkills />
            </div>

            {/* Globe Card (Medium) */}
            <div className="h-[300px]">
              <GlobeCard />
            </div>

            {/* Tech Stack Orbit Card (Medium) */}
            <div className={`${cardClasses} h-[300px] flex items-center p-8`}>
              <div className="w-[55%] z-10">
                <h3 className="text-2xl font-bold text-white mb-4">Tech Stack</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  I specialize in a variety of languages, frameworks, and tools that allow me to build robust and scalable applications.
                </p>
              </div>
              
              {/* Dual-Orbit System on the right edge */}
              <div className="w-[45%] h-full absolute right-0 top-0 flex items-center justify-end overflow-hidden pointer-events-none">
                <div className="relative w-96 h-96 mr-[-150px] flex items-center justify-center">
                  
                  {/* Orbit tracks */}
                  <div className="absolute inset-0 border-[1.5px] border-white/10 rounded-full scale-[0.55]"></div>
                  <div className="absolute inset-0 border-[1.5px] border-white/5 rounded-full scale-[0.85]"></div>
                  
                  {/* Inner Orbit (Clockwise) */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute orbit-icon-1 bg-[#1a1a24] rounded-full w-12 h-12 flex items-center justify-center shadow-[0_0_15px_rgba(97,218,251,0.2)] border border-[#61DAFB]/30">
                      <FaReact size={24} className="text-[#61DAFB]" />
                    </div>
                    <div className="absolute orbit-icon-2 bg-[#1a1a24] rounded-full w-12 h-12 flex items-center justify-center shadow-[0_0_15px_rgba(49,120,198,0.2)] border border-[#3178C6]/30">
                      <SiTypescript size={20} className="text-[#3178C6]" />
                    </div>
                    <div className="absolute orbit-icon-3 bg-[#1a1a24] rounded-full w-12 h-12 flex items-center justify-center shadow-[0_0_15px_rgba(247,223,30,0.2)] border border-[#F7DF1E]/30">
                      <SiJavascript size={20} className="text-[#F7DF1E]" />
                    </div>
                    <div className="absolute orbit-icon-4 bg-[#1a1a24] rounded-full w-12 h-12 flex items-center justify-center shadow-[0_0_15px_rgba(71,162,72,0.2)] border border-[#47A248]/30">
                      <SiMongodb size={20} className="text-[#47A248]" />
                    </div>
                  </div>

                  {/* Outer Orbit (Counter-Clockwise) */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute orbit-icon-5 bg-[#1a1a24] rounded-full w-12 h-12 flex items-center justify-center shadow-[0_0_15px_rgba(55,118,171,0.2)] border border-[#3776AB]/30">
                      <FaPython size={22} className="text-[#3776AB]" />
                    </div>
                    <div className="absolute orbit-icon-6 bg-[#1a1a24] rounded-full w-12 h-12 flex items-center justify-center shadow-[0_0_15px_rgba(227,79,38,0.2)] border border-[#E34F26]/30">
                      <FaHtml5 size={22} className="text-[#E34F26]" />
                    </div>
                    <div className="absolute orbit-icon-7 bg-[#1a1a24] rounded-full w-12 h-12 flex items-center justify-center shadow-[0_0_15px_rgba(21,114,182,0.2)] border border-[#1572B6]/30">
                      <FaCss3Alt size={22} className="text-[#1572B6]" />
                    </div>
                    <div className="absolute orbit-icon-8 bg-[#1a1a24] rounded-full w-12 h-12 flex items-center justify-center shadow-[0_0_15px_rgba(118,74,188,0.2)] border border-[#764ABC]/30">
                      <SiRedux size={20} className="text-[#764ABC]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default About;
