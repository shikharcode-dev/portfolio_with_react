import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { ArrowRight, X } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

// --- 3D Star Component to cover Gemini Logo ---
const RotatingStar = () => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.5;
  });
  return (
    <mesh ref={meshRef} scale={1.5}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#38bdf8" wireframe />
      <mesh scale={0.9}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#0284c7" transparent opacity={0.5} />
      </mesh>
    </mesh>
  );
};

// --- Hover-to-Center Floating Card ---
const FloatingCard = ({ title, children, xPos, yPos, depth, blur, mouseX, mouseY, onClick, isVisible, delay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const parallaxFactor = depth * 30;

  const moveX = useTransform(mouseX, [-0.5, 0.5], [parallaxFactor, -parallaxFactor]);
  const moveY = useTransform(mouseY, [-0.5, 0.5], [parallaxFactor, -parallaxFactor]);
  
  const smoothX = useSpring(moveX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(moveY, { stiffness: 50, damping: 20 });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.3, y: 50 }}
          animate={{ opacity: 1, scale: 0.7 + (depth * 0.3), y: 0 }}
          exit={{ opacity: 0, scale: 0.3, y: -50, transition: { duration: 0.3, delay: 0 } }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay }}
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            left: xPos,
            top: yPos,
            x: smoothX,
            y: smoothY,
            filter: isHovered ? "blur(0px)" : `blur(${blur}px)`,
            zIndex: isHovered ? 30 : 20,
          }}
          className={`absolute w-64 md:w-80 bg-[#0a0a0a]/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.5)] pointer-events-auto cursor-pointer transition-all duration-300 -translate-x-1/2 -translate-y-1/2 ${isHovered ? 'shadow-[0_0_50px_rgba(255,255,255,0.1)] border-white/30' : ''}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 rounded-[2rem] transition-opacity duration-500 pointer-events-none" />
          {title && <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-400 mb-3">{title}</h3>}
          <div className="text-sm text-slate-300 font-medium leading-relaxed line-clamp-3">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Contact = () => {
  const containerRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(16);
  const [activeCard, setActiveCard] = useState(null);
  
  // Phase tracking for sequential animations
  const [phase, setPhase] = useState(0);
  
  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) - 0.5;
    const y = (clientY / window.innerHeight) - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };
  
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const numFrames = isMobile ? 50 : 225;
      const startFrame = 16;
      
      for (let i = startFrame; i <= numFrames; i++) {
        const img = new Image();
        img.src = `/video_frames_24fps_high_quality/frame_${String(i).padStart(6, '0')}.jpg`;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const isMobile = window.innerWidth < 768;
    const endFrame = isMobile ? 50 : 240;
    const startFrame = 16;
    const progress = Math.max(0, Math.min(1, latest * 1.05));
    const frame = Math.floor(startFrame + (progress * (endFrame - startFrame)));
    setCurrentFrame(Math.max(startFrame, Math.min(endFrame, frame)));

    // Determine Phases with adjusted thresholds for 800vh
    if (latest < 0.1) setPhase(0); // Intro
    else if (latest >= 0.1 && latest < 0.45) setPhase(1); // One Piece
    else if (latest >= 0.45 && latest < 0.8) setPhase(2); // Naruto
    else setPhase(3); // Outro
  });

  const canvasRef = useRef(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    const img = new Image();
    img.src = `/video_frames_24fps_high_quality/frame_${String(currentFrame).padStart(6, '0')}.jpg`;
    img.onload = () => {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
      const newWidth = img.width * ratio;
      const newHeight = img.height * ratio;
      const x = (canvas.width - newWidth) / 2;
      const y = (canvas.height - newHeight) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, newWidth, newHeight);
    };
  }, [currentFrame]);

  // Centerpiece Parallax
  const centerMoveX = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);
  const centerMoveY = useTransform(mouseY, [-0.5, 0.5], [-30, 30]);
  const smoothCenterX = useSpring(centerMoveX, { stiffness: 30, damping: 20 });
  const smoothCenterY = useSpring(centerMoveY, { stiffness: 30, damping: 20 });

  // Scroll-linked transforms for Intro and Outro
  const rawIntroOpacity = useTransform(scrollYProgress, [0, 0.05, 0.08, 0.1], [0, 1, 1, 0]);
  const rawIntroScale = useTransform(scrollYProgress, [0, 0.05, 0.1], [0.8, 1, 1.2]);
  const rawIntroY = useTransform(scrollYProgress, [0, 0.05, 0.1], [300, 0, -300]);
  
  // Apply spring smoothing for a "good animation" feel
  const introOpacity = useSpring(rawIntroOpacity, { stiffness: 100, damping: 20 });
  const introScale = useSpring(rawIntroScale, { stiffness: 100, damping: 20 });
  const introY = useSpring(rawIntroY, { stiffness: 100, damping: 20 });
  
  // Outro fades in between 0.8 and 0.85 and stays
  const outroOpacity = useTransform(scrollYProgress, [0.8, 0.85, 0.95], [0, 1, 1]);
  const outroY = useTransform(scrollYProgress, [0.8, 0.85, 0.95], [100, 0, -50]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#050606] h-[800vh]"
      onMouseMove={handleMouseMove}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden z-0">
        
        {/* Canvas Background */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050606]/90 via-[#050606]/50 to-[#050606]/90 pointer-events-none" />
        
        {/* 3D Star */}
        <div className="absolute bottom-4 right-16 w-36 h-36 z-40 pointer-events-none flex items-center justify-center">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={2} />
            <RotatingStar />
          </Canvas>
        </div>

        {/* --- Phase 0: Intro (Scroll Linked & Spring Smoothed) --- */}
        <motion.div 
          style={{ opacity: introOpacity, scale: introScale, y: introY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <h2 className="text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[8vw] leading-[1.1] font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-200 via-white to-orange-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] tracking-tight whitespace-nowrap">
            Shikhar Mishra
          </h2>
        </motion.div>

        {/* --- Phase 1: One Piece --- */}
        <AnimatePresence>
          {phase === 1 && (
            <motion.div 
              className="absolute inset-0 hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
              {/* Central Poster (Appears First) */}
              <motion.div 
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                style={{ x: smoothCenterX, y: smoothCenterY }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] lg:w-[400px] h-auto shadow-[0_0_100px_rgba(239,68,68,0.3)] rounded-3xl pointer-events-auto flex flex-col items-center"
              >
                <img src="/images/one-piece-poster.jpg" alt="One Piece Poster" className="w-full h-auto object-cover rounded-3xl" />
                <div className="absolute inset-0 border border-red-500/30 rounded-3xl pointer-events-none" />
                
                {/* Auto-typing text */}
                <div className="absolute -bottom-16 w-[150%] text-center">
                  <TypeAnimation
                    sequence={[
                      '"If you don\'t take risks, you can\'t create a future." - Luffy', 4000,
                      '"Power isn\'t determined by your size, but the size of your heart!"', 4000,
                      '"I don\'t want to conquer anything. I just want to be free!"', 4000,
                    ]}
                    wrapper="span"
                    speed={50}
                    className="text-red-400/90 font-medium tracking-wide text-sm drop-shadow-md"
                    repeat={Infinity}
                  />
                </div>
              </motion.div>

              {/* Staggered Cards (Delayed entry) */}
              <FloatingCard 
                title="Frontend Dev" xPos="15%" yPos="20%" depth={0.6} blur={3} mouseX={mouseX} mouseY={mouseY} isVisible={true} delay={0.6}
                onClick={() => setActiveCard({
                  title: "Frontend Dev", content: "Building responsive and interactive user interfaces using component-based architecture, dynamic interfaces, and infinite scrolling.", link: "https://www.freecodecamp.org/", platform: "freeCodeCamp"
                })}
              >
                Building responsive and interactive user interfaces using component-based architecture, dynamic interfaces, and infinite scrolling.
              </FloatingCard>
              
              <FloatingCard 
                title="React Mastery" xPos="85%" yPos="25%" depth={0.9} blur={1} mouseX={mouseX} mouseY={mouseY} isVisible={true} delay={0.8}
                onClick={() => setActiveCard({
                  title: "React Mastery", content: "Deep dive into JSX, Props, State, Hooks, Event handling, Conditional rendering, Forms, and Component structure.", link: "https://react.dev/", platform: "React Docs"
                })}
              >
                Deep dive into JSX, Props, State, Hooks, Event handling, Conditional rendering, Forms, and Component structure.
              </FloatingCard>

              <FloatingCard 
                title="HTML & CSS" xPos="12%" yPos="75%" depth={1.2} blur={0} mouseX={mouseX} mouseY={mouseY} isVisible={true} delay={1.0}
                onClick={() => setActiveCard({
                  title: "HTML & CSS", content: "Semantic HTML5, CSS3, Flexbox, CSS Grid, Responsive Design, Media Queries, Transitions, and Animations.", link: "https://developer.mozilla.org/", platform: "MDN Web Docs"
                })}
              >
                Semantic HTML5, CSS3, Flexbox, CSS Grid, Responsive Design, Media Queries, Transitions, and Animations.
              </FloatingCard>

              <FloatingCard 
                title="Redux & Data" xPos="80%" yPos="80%" depth={0.4} blur={5} mouseX={mouseX} mouseY={mouseY} isVisible={true} delay={1.2}
                onClick={() => setActiveCard({
                  title: "Redux & Data", content: "Global state management, Slices, Actions, Reducers, API Integration, CRUD Operations, and Local Storage.", link: null, platform: null
                })}
              >
                Global state management, Slices, Actions, Reducers, API Integration, CRUD Operations, and Local Storage.
              </FloatingCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Phase 2: Naruto --- */}
        <AnimatePresence>
          {phase === 2 && (
            <motion.div 
              className="absolute inset-0 hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
              {/* Central Poster (Appears First) */}
              <motion.div 
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                style={{ x: smoothCenterX, y: smoothCenterY }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] lg:w-[400px] h-auto shadow-[0_0_100px_rgba(249,115,22,0.4)] rounded-3xl pointer-events-auto flex flex-col items-center"
              >
                <img src="/images/naruto-poster.jpg" alt="Naruto Poster" className="w-full h-auto object-cover rounded-3xl" />
                <div className="absolute inset-0 border border-orange-500/30 rounded-3xl pointer-events-none" />
                
                {/* Auto-typing text */}
                <div className="absolute -bottom-16 w-[150%] text-center">
                  <TypeAnimation
                    sequence={[
                      '"I\'m not gonna run away, I never go back on my word!" - Naruto', 4000,
                      '"Hard work is worthless for those that don\'t believe in themselves."', 4000,
                      '"If you don\'t like your destiny, have the courage to change it!"', 4000,
                    ]}
                    wrapper="span"
                    speed={50}
                    className="text-orange-400/90 font-medium tracking-wide text-sm drop-shadow-md"
                    repeat={Infinity}
                  />
                </div>
              </motion.div>

              {/* Staggered Cards (Delayed entry) */}
              <FloatingCard 
                title="Philosophy" xPos="15%" yPos="25%" depth={1.3} blur={0} mouseX={mouseX} mouseY={mouseY} isVisible={true} delay={0.6}
                onClick={() => setActiveCard({
                  title: "Philosophy", content: "Learn → Build → Break → Debug → Improve → Repeat", link: null, platform: null
                })}
              >
                <span className="italic font-bold text-orange-400">Learn → Build → Break → Debug → Improve → Repeat</span>
              </FloatingCard>

              <FloatingCard 
                title="MERN Vision" xPos="85%" yPos="30%" depth={0.7} blur={2} mouseX={mouseX} mouseY={mouseY} isVisible={true} delay={0.8}
                onClick={() => setActiveCard({
                  title: "MERN Vision", content: "My long-term development goal is to become a Full-Stack MERN Developer. Moving deeper into backend development with Node.js, Express.js, and MongoDB.", link: "https://www.mongodb.com/mern-stack", platform: "MERN Community"
                })}
              >
                My long-term development goal is to become a Full-Stack MERN Developer. Moving deeper into backend development with Node.js, Express.js, and MongoDB.
              </FloatingCard>

              <FloatingCard 
                title="TypeScript" xPos="20%" yPos="80%" depth={0.5} blur={4} mouseX={mouseX} mouseY={mouseY} isVisible={true} delay={1.0}
                onClick={() => setActiveCard({
                  title: "TypeScript", content: "Expanding JavaScript knowledge into strongly typed application development. Focusing on type safety, interfaces, and TS with React.", link: "https://www.typescriptlang.org/", platform: "TS Docs"
                })}
              >
                Expanding JavaScript knowledge into strongly typed application development. Focusing on type safety, interfaces, and TS with React.
              </FloatingCard>

              <FloatingCard 
                title="Emerging Tech" xPos="80%" yPos="75%" depth={1.1} blur={0} mouseX={mouseX} mouseY={mouseY} isVisible={true} delay={1.2}
                onClick={() => setActiveCard({
                  title: "Emerging Tech", content: "Learning Server-State management with TanStack Query. Building utility-first styling layouts with Tailwind CSS. Learning Python fundamentals.", link: null, platform: null
                })}
              >
                Learning Server-State management with TanStack Query. Building utility-first styling layouts with Tailwind CSS. Learning Python fundamentals.
              </FloatingCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Phase 3: Outro (Scroll Linked) --- */}
        <motion.div 
          style={{ opacity: outroOpacity, y: outroY }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500 mb-6 px-4">Building. Learning. Improving.</h2>
          <p className="text-2xl text-slate-300 font-medium max-w-3xl px-6 text-center">B.Tech CSE student and aspiring Full-Stack Developer focused on React, JavaScript, TypeScript, modern frontend architecture, and building real-world web applications.</p>
        </motion.div>

        {/* --- Modal Overlay --- */}
        <AnimatePresence>
          {activeCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[100] flex items-center justify-center pointer-events-auto"
            >
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
                onClick={() => setActiveCard(null)}
              />
              
              {/* Premium Modal Box */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-[90%] max-w-xl bg-gradient-to-b from-[#151822]/90 to-[#0a0c10]/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden"
              >
                {/* Glow Effects */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-orange-500/20 blur-[100px] pointer-events-none rounded-full" />
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-red-500/20 blur-[100px] pointer-events-none rounded-full" />
                
                {/* CLOSE BUTTON (Fixed pointer & z-index) */}
                <button 
                  onClick={() => setActiveCard(null)}
                  className="absolute top-6 right-6 text-white/40 hover:text-white hover:rotate-90 transition-all duration-300 z-[200] bg-white/5 hover:bg-white/10 p-2 rounded-full border border-white/10"
                >
                  <X size={20} />
                </button>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-400 mb-6 drop-shadow-sm">
                    {activeCard.title}
                  </h3>
                  
                  <p className="text-lg text-slate-200 font-medium leading-relaxed mb-10 w-full">
                    {activeCard.content}
                  </p>
                  
                  <div className="flex flex-col gap-4 w-full">
                    {activeCard.link && (
                      <a 
                        href={activeCard.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full md:w-auto mx-auto px-8 py-4 rounded-full border border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 transition-all flex items-center justify-center gap-4 text-orange-200 text-sm font-bold shadow-lg group backdrop-blur-md relative overflow-hidden"
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                        
                        <span className="tracking-wider uppercase">詳細を学ぶ (Learn More)</span>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center shadow-lg group-hover:translate-x-1 transition-transform">
                          <ArrowRight size={14} className="text-white" />
                        </div>
                      </a>
                    )}
                    {activeCard.platform && (
                      <p className="text-sm text-slate-400 italic text-center">
                        * Learned via {activeCard.platform}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Fallback (Static stacking) */}
      <div className="md:hidden relative z-20 w-full px-6 flex flex-col gap-16 pt-[20vh] pb-[30vh]">
        <h2 className="text-[3rem] text-center font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-200 via-white to-orange-400">
          Shikhar Mishra
        </h2>

        <div className="w-full flex flex-col items-center mt-10 gap-6">
           <img src="/images/one-piece-poster.jpg" alt="One Piece Poster" className="w-[80%] rounded-2xl shadow-2xl" />
           <TypeAnimation
              sequence={[
                '"If you don\'t take risks, you can\'t create a future." - Luffy', 4000,
                '"Power isn\'t determined by your size, but the size of your heart!"', 4000,
              ]}
              wrapper="span"
              speed={50}
              className="text-red-400/90 font-medium tracking-wide text-xs text-center px-4"
              repeat={Infinity}
            />
        </div>

        <div className="bg-white/[0.05] backdrop-blur-xl border border-white/20 rounded-[2rem] p-6">
           <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-400 mb-3">Frontend Dev</h3>
           <p className="text-sm text-slate-300 font-medium">Building responsive and interactive user interfaces using component-based architecture, dynamic interfaces, and infinite scrolling.</p>
        </div>
        
        <div className="w-full flex flex-col items-center mt-16 gap-6">
           <img src="/images/naruto-poster.jpg" alt="Naruto Poster" className="w-[80%] rounded-2xl shadow-2xl" />
           <TypeAnimation
              sequence={[
                '"I\'m not gonna run away, I never go back on my word!" - Naruto', 4000,
                '"If you don\'t like your destiny, have the courage to change it!"', 4000,
              ]}
              wrapper="span"
              speed={50}
              className="text-orange-400/90 font-medium tracking-wide text-xs text-center px-4"
              repeat={Infinity}
            />
        </div>

        <div className="bg-white/[0.05] backdrop-blur-xl border border-white/20 rounded-[2rem] p-6">
           <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-400 mb-3">MERN Vision</h3>
           <p className="text-sm text-slate-300 font-medium">My long-term development goal is to become a Full-Stack MERN Developer. Moving deeper into backend development with Node.js, Express.js, and MongoDB.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
