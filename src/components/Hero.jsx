import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { MainCruiser, ScoutDrone, Satellite, Interceptor, CargoHauler, SpaceProbe } from './ProceduralShips';

const content = [
  { 
    title: "Scalable Architecture", 
    desc: "Designing systems that grow seamlessly with your user base without compromising on performance." 
  },
  { 
    title: "Dynamic Interfaces", 
    desc: "Creating fluid, reactive, and highly engaging user experiences that feel alive." 
  },
  { 
    title: "Robust Codebases", 
    desc: "Ensuring secure, reliable, and lightning-fast data flow behind the scenes." 
  },
  { 
    title: "Interactive 3D", 
    desc: "Bringing the web to the third dimension with immersive WebGL and modern graphics." 
  },
  {
    title: "Pixel Perfect Design",
    desc: "Meticulous attention to detail, ensuring every element is beautifully crafted."
  }
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % content.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex flex-col justify-center bg-black">
      
      {/* 3D Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/space-bg.png" 
          alt="Deep Space Background" 
          className="w-full h-full object-cover object-center opacity-40 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0817]/60 to-[#0a0817]"></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 h-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 lg:gap-32 items-center">
        
        {/* Left Column: Text Content */}
        <div className="w-full flex flex-col justify-center items-start h-full pt-10 md:pt-0">
          <div className="flex flex-col items-start w-full">
            <div className="h-20 md:h-28 flex items-end overflow-hidden py-2 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-200 via-indigo-200 to-purple-300 tracking-tight"
                >
                  {content[index].title}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="h-28 overflow-hidden w-full max-w-lg mt-2">
              <AnimatePresence mode="wait">
                <motion.p
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-lg md:text-xl text-slate-400 font-light leading-relaxed italic"
                >
                  {content[index].desc}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Scene */}
        <div className="w-full h-1/2 md:h-full relative z-20">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            
            <MainCruiser />
            
            {/* Background Ships Scattered Around */}
            <group position={[-4, 3, -8]}>
              <ScoutDrone />
            </group>
            
            <group position={[5, 2, -10]} rotation={[0.5, -0.3, 0]}>
              <Satellite />
            </group>
            
            <group position={[-6, -2, -12]} rotation={[0.2, 0.4, 0.1]}>
              <CargoHauler />
            </group>
            
            <group position={[4, -3, -6]} rotation={[-0.2, 0.8, -0.1]}>
              <Interceptor />
            </group>
            
            <group position={[-2, 4, -15]} rotation={[1, 0, 0]}>
              <SpaceProbe />
            </group>

          </Canvas>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
