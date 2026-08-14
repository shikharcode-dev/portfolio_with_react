import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

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

import { MainCruiser, ScoutDrone, Satellite, Interceptor, CargoHauler, SpaceProbe } from './ProceduralShips';


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
