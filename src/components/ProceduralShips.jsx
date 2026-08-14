import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const metalMaterial = <meshStandardMaterial color="#9ca3af" roughness={0.3} metalness={0.8} />;
const darkMetalMaterial = <meshStandardMaterial color="#1f2937" roughness={0.6} metalness={0.9} />;
const glassMaterial = <meshStandardMaterial color="#38bdf8" roughness={0.1} metalness={0.9} emissive="#0284c7" emissiveIntensity={0.5} />;
const glowMaterial = <meshStandardMaterial color="#0ea5e9" emissive="#38bdf8" emissiveIntensity={2} toneMapped={false} />;
const orangeGlow = <meshStandardMaterial color="#f97316" emissive="#ea580c" emissiveIntensity={2} toneMapped={false} />;

// 1. Main Realistic Cruiser
export const MainCruiser = () => {
  const groupRef = useRef();

  useFrame((state) => {
    const { pointer, clock } = state;
    const targetX = (pointer.x * Math.PI) / 4;
    const targetY = (pointer.y * Math.PI) / 4;

    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.z = (pointer.x * Math.PI) / 6;
    groupRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.2;
  });

  return (
    <group ref={groupRef} scale={0.4}>
      {/* Central Core */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.7, 4, 32]} />
        {metalMaterial}
      </mesh>
      {/* Front Nose */}
      <mesh position={[0, 0, 2.8]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.5, 1.6, 32]} />
        {darkMetalMaterial}
      </mesh>
      {/* Energy Ring */}
      <mesh position={[0, 0, 0.5]} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.2, 0.1, 16, 64]} />
        {glowMaterial}
      </mesh>
      {/* Cockpit Canopy */}
      <mesh position={[0, 0.6, 1.5]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.7, 0.4, 1.2]} />
        {glassMaterial}
      </mesh>
      {/* Swept Wings */}
      <group position={[0, -0.2, -0.5]}>
        <mesh position={[1.8, 0, 0]} rotation={[0, 0.4, 0.1]}>
          <boxGeometry args={[3, 0.1, 1.5]} />
          {darkMetalMaterial}
        </mesh>
        <mesh position={[-1.8, 0, 0]} rotation={[0, -0.4, -0.1]}>
          <boxGeometry args={[3, 0.1, 1.5]} />
          {darkMetalMaterial}
        </mesh>
        {/* Cannons on wings */}
        <mesh position={[3, 0.2, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
          {metalMaterial}
        </mesh>
        <mesh position={[-3, 0.2, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
          {metalMaterial}
        </mesh>
      </group>
      {/* Quad Engines */}
      <group position={[0, 0, -2.2]}>
        {[[-0.6, 0.3], [0.6, 0.3], [-0.6, -0.3], [0.6, -0.3]].map((pos, i) => (
          <group key={i} position={[pos[0], pos[1], 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.25, 0.2, 0.8, 16]} />
              {darkMetalMaterial}
            </mesh>
            <mesh position={[0, 0, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.2, 1.2, 16]} />
              {glowMaterial}
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

// 2. Scout Drone
export const ScoutDrone = () => (
  <Float speed={3} rotationIntensity={2} floatIntensity={3}>
    <group scale={0.15}>
      <mesh>
        <boxGeometry args={[1, 0.5, 1]} />
        {metalMaterial}
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        {glassMaterial}
      </mesh>
      {[[-0.6, -0.6], [0.6, -0.6], [-0.6, 0.6], [0.6, 0.6]].map((pos, i) => (
        <group key={i} position={[pos[0], 0, pos[1]]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.3, 0.05, 8, 24]} />
            {darkMetalMaterial}
          </mesh>
          <mesh position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.5, 8]} />
            {orangeGlow}
          </mesh>
        </group>
      ))}
    </group>
  </Float>
);

// 3. Orbital Satellite
export const Satellite = () => {
  const ref = useRef();
  useFrame(() => { ref.current.rotation.y += 0.005; });
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={ref} scale={0.2}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 2, 16]} />
          {metalMaterial}
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.8, 0.1, 0.2, 32]} />
          {darkMetalMaterial}
        </mesh>
        <mesh position={[0, 1.3, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          {glowMaterial}
        </mesh>
        <mesh position={[2, 0, 0]}>
          <boxGeometry args={[3, 0.05, 1]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[-2, 0, 0]}>
          <boxGeometry args={[3, 0.05, 1]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>
    </Float>
  );
};

// 4. Interceptor Fighter
export const Interceptor = () => (
  <Float speed={4} rotationIntensity={2} floatIntensity={2}>
    <group scale={0.2}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[1, 3, 3]} />
        {darkMetalMaterial}
      </mesh>
      <mesh position={[0, 0.2, 0.5]}>
        <boxGeometry args={[0.4, 0.3, 1]} />
        {glassMaterial}
      </mesh>
      <mesh position={[0, 0, -1.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.4, 1.5, 16]} />
        {glowMaterial}
      </mesh>
    </group>
  </Float>
);

// 5. Cargo Hauler
export const CargoHauler = () => {
  const ref = useRef();
  useFrame(() => { ref.current.position.x += 0.001; if (ref.current.position.x > 5) ref.current.position.x = -5; });
  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={1}>
      <group ref={ref} scale={0.15}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[1, 1, 4]} />
          {metalMaterial}
        </mesh>
        <mesh position={[0, 0, 2.2]}>
          <boxGeometry args={[0.8, 0.6, 0.6]} />
          {glassMaterial}
        </mesh>
        {[0, -1, 1].map((z, i) => (
          <group key={i} position={[0, -0.6, z]}>
            <mesh position={[0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.4, 0.4, 1.5, 6]} />
              <meshStandardMaterial color="#eab308" roughness={0.7} metalness={0.3} />
            </mesh>
            <mesh position={[-0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.4, 0.4, 1.5, 6]} />
              <meshStandardMaterial color="#eab308" roughness={0.7} metalness={0.3} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0, -2.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.6, 0.5, 16]} />
          {darkMetalMaterial}
        </mesh>
        <mesh position={[0, 0, -2.6]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.3, 1, 16]} />
          {orangeGlow}
        </mesh>
      </group>
    </Float>
  );
};

// 6. Deep Space Probe
export const SpaceProbe = () => (
  <Float speed={2} rotationIntensity={3} floatIntensity={2}>
    <group scale={0.12}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 3, 16]} />
        {darkMetalMaterial}
      </mesh>
      <mesh position={[0, 0, 1.6]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        {glassMaterial}
      </mesh>
      <mesh position={[0, 0, 1.6]}>
        <torusGeometry args={[0.6, 0.05, 16, 32]} />
        {metalMaterial}
      </mesh>
      <mesh position={[0, 0, -1.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.15, 0.8, 16]} />
        {glowMaterial}
      </mesh>
    </group>
  </Float>
);
