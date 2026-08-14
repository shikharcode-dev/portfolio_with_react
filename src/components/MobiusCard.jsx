import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Environment } from '@react-three/drei';

const MobiusStrip = () => {
  const meshRef = useRef();

  // Gentle idle rotation
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.2;
    meshRef.current.rotation.x += delta * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      {/* TorusKnot geometry args: radius, tube, tubularSegments, radialSegments, p, q */}
      <torusKnotGeometry args={[1, 0.25, 256, 32, 2, 3]} />
      <meshPhysicalMaterial
        color="#f472b6" // pink-400
        emissive="#7e22ce" // purple-700
        emissiveIntensity={0.5}
        roughness={0.1}
        metalness={0.8}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transmission={0.9} // Glass-like translucency
        ior={1.5}
        thickness={0.5}
      />
    </mesh>
  );
};

const MobiusCard = () => {
  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col p-8 bg-[#131320]/80 backdrop-blur-md rounded-3xl border border-white/10 transition-transform hover:scale-[1.02] duration-300">
      <div className="relative z-10 max-w-[220px] pointer-events-none">
        <h3 className="text-sm uppercase tracking-wider text-slate-400 mb-2 font-semibold">Time Zone</h3>
        <p className="text-lg font-medium text-white mb-6 leading-tight drop-shadow-md">
          Based in India, open to remote work worldwide.
        </p>
      </div>
      
      {/* 3D Canvas rendering the Mobius strip */}
      <div className="absolute inset-0 pt-20 w-full h-full flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} />
          
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <MobiusStrip />
          </PresentationControls>
        </Canvas>
      </div>
    </div>
  );
};

export default MobiusCard;
