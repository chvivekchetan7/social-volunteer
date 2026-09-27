import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Photorealistic Translucent PBR Glass Form
function FocalPBRGlassForm({ position, scale = 1, rotationSpeed = 0.5 }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x += delta * 0.15 * rotationSpeed;
    groupRef.current.rotation.y += delta * 0.25 * rotationSpeed;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Main Translucent Glass Sphere */}
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhysicalMaterial
            color="#E85A2A"
            roughness={0.15}
            metalness={0.08}
            transmission={0.65}
            thickness={1.4}
            ior={1.52}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            reflectivity={0.8}
            emissive="#E85A2A"
            emissiveIntensity={0.12}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Polished Concentric Glass Ring (Embedded inside scene) */}
        <mesh rotation={[Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[1.65, 0.035, 32, 100]} />
          <meshPhysicalMaterial
            color="#FF8054"
            roughness={0.1}
            metalness={0.6}
            transmission={0.4}
            clearcoat={1.0}
            emissive="#FF8054"
            emissiveIntensity={0.25}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Small Depth-Separated Supporting Object
function SupportingGlassOrb({ position, scale = 0.5, speed = 0.8, color = '#FF8054' }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.2 * speed;
    meshRef.current.rotation.y += delta * 0.3 * speed;
  });

  return (
    <Float speed={1.0} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.18}
          metalness={0.1}
          transmission={0.55}
          thickness={1.1}
          ior={1.48}
          clearcoat={1.0}
          emissive="#E85A2A"
          emissiveIntensity={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

// Sophisticated Sparse Particle System (18 soft Z-drift micro-particles)
function SparseParticlesField({ count = 18, mouse }) {
  const groupRef = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
        ],
        scale: Math.random() * 0.05 + 0.02,
        zSpeed: (Math.random() - 0.5) * 0.008,
      });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.015;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mouse.current.x * 0.3, 0.04);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mouse.current.y * 0.3, 0.04);
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, idx) => (
        <mesh key={idx} position={p.position} scale={p.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={idx % 2 === 0 ? '#FF8054' : '#E85A2A'}
            transparent
            opacity={0.45}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Hero3DCanvas() {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        {/* Studio-Grade Physically Based Lighting Setup */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 8, 6]} intensity={1.8} color="#FFFFFF" castShadow />
        <pointLight position={[5, 3, 3]} intensity={2.2} color="#FF9A76" />
        <pointLight position={[-6, -4, -3]} intensity={1.4} color="#E85A2A" />

        {/* 1 Main Hero PBR Glass Form (Off-center Right to avoid text overlap) */}
        <FocalPBRGlassForm position={[3.8, -0.6, -0.8]} scale={0.88} rotationSpeed={0.8} />

        {/* 2 Supporting Off-Center Glass Orbs */}
        <SupportingGlassOrb position={[-4.2, 1.8, -1.8]} scale={0.45} speed={0.6} color="#FF9A76" />
        <SupportingGlassOrb position={[4.6, 2.2, -2.5]} scale={0.35} speed={0.7} color="#E85A2A" />

        {/* Sparse 18 Micro-Particles */}
        <SparseParticlesField count={18} mouse={mouse} />
      </Canvas>
    </div>
  );
}
