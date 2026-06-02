'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';

/**
 * Simple, clean 3D element for e-commerce hero.
 * Represents a product box / item in a subtle professional way.
 * Low poly, optimized, no lag.
 */
function TechProduct() {
  return (
    <group>
      {/* Main device body - clean tech product look */}
      <mesh rotation={[0.5, 0.35, 0.1]}>
        <boxGeometry args={[3.2, 2.0, 0.9]} />
        <meshPhongMaterial 
          color="#3B82F6" 
          emissive="#1E40AF"
          emissiveIntensity={0.1}
          shininess={85}
          specular="#ffffff"
        />
      </mesh>

      {/* "Screen" or top detail */}
      <mesh rotation={[0.5, 0.35, 0.1]} position={[0, 0.05, 0.48]}>
        <boxGeometry args={[2.6, 1.5, 0.12]} />
        <meshPhongMaterial 
          color="#0A0A0A" 
          shininess={30}
        />
      </mesh>

      {/* Subtle edge highlight */}
      <mesh rotation={[0.5, 0.35, 0.1]} position={[0, 0.85, 0]}>
        <boxGeometry args={[3.3, 0.06, 0.95]} />
        <meshPhongMaterial 
          color="#60A5FA" 
          transparent 
          opacity={0.25}
        />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="relative w-full h-[380px] md:h-[460px] rounded-3xl overflow-hidden border border-white/10 bg-[#111111]">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 42 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.75} />
          <pointLight position={[-8, 6, -4]} intensity={1.1} color="#3B82F6" />
          <pointLight position={[7, -5, 5]} intensity={0.6} />

          <TechProduct />

          <OrbitControls 
            enablePan={false} 
            enableZoom={false} 
            enableRotate={true}
            autoRotate 
            autoRotateSpeed={0.28}
            minPolarAngle={Math.PI * 0.25}
            maxPolarAngle={Math.PI * 0.75}
          />
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40 pointer-events-none" />
      <div className="absolute bottom-4 right-4 text-[10px] tracking-[2px] text-white/40 font-mono">ARRASTRA PARA ROTAR</div>
    </div>
  );
}
