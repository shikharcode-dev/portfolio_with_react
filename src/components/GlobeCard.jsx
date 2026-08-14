import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const Earth = () => {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  
  useFrame((state, delta) => {
    // Rotate the earth, spin faster when hovered
    meshRef.current.rotation.y += delta * (hovered ? 0.8 : 0.2);
    // Slight bobbing on the X axis
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <Float speed={hovered ? 4 : 2} rotationIntensity={1} floatIntensity={2}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.1 : 1} // Scale up on hover
      >
        {/* Wireframe outer sphere */}
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial 
          color="#6366f1" 
          wireframe={true}
          transparent
          opacity={0.6}
        />
        {/* Solid inner core */}
        <mesh>
          <sphereGeometry args={[1.75, 32, 32]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </mesh>
    </Float>
  );
};

const GlobeCard = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      setTime(now.toLocaleTimeString('en-US', options));
    };
    updateClock(); 
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col p-6 md:p-8 bg-[#131320]/80 backdrop-blur-md rounded-3xl border border-white/10 transition-transform hover:scale-[1.02] duration-300 min-h-[300px]">
      <div className="relative z-10 pointer-events-none">
        <h3 className="text-sm uppercase tracking-wider text-slate-400 mb-2 font-semibold flex items-center gap-2">
          Time Zone 
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        </h3>
        <p className="text-2xl lg:text-3xl font-bold text-white mb-2 tracking-tight">
          {time}
        </p>
        <p className="text-sm lg:text-base font-medium text-slate-300 leading-tight max-w-[200px]">
          Based in India, open to remote work worldwide.
        </p>
      </div>
      
      {/* 3D Floating Earth Canvas */}
      <div className="absolute -bottom-8 -right-8 w-[250px] h-[250px] z-0 cursor-pointer">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#8b5cf6" />
          <directionalLight position={[-10, -10, -5]} intensity={1} color="#3b82f6" />
          <Earth />
        </Canvas>
      </div>
    </div>
  );
};

export default GlobeCard;
