import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import { User, HeartHandshake, Briefcase, FolderKanban, Users, Sparkles } from 'lucide-react';

function NetworkNodes({ activeStage, setActiveStage }) {
  const groupRef = useRef();

  // Define 6 sequential nodes representing community connection
  const stages = [
    { id: 0, label: 'YOU', title: 'Passionate Individual', desc: 'Ready to offer skills & time', icon: User, pos: [-4.2, 0.8, 0], color: '#E85A2A' },
    { id: 1, label: 'VOLUNTEER', title: 'Verified Volunteer', desc: 'Matched with real causes', icon: HeartHandshake, pos: [-2.5, -0.6, 0.5], color: '#FF8054' },
    { id: 2, label: 'OPPORTUNITY', title: 'Community Shift', desc: '4-6 hour verified contribution', icon: Briefcase, pos: [-0.8, 0.9, -0.4], color: '#E85A2A' },
    { id: 3, label: 'PROJECT', title: 'Impact Project', desc: 'Solar Kiosk, Forest, Health Camp', icon: FolderKanban, pos: [0.9, -0.7, 0.3], color: '#FF8054' },
    { id: 4, label: 'COMMUNITY', title: 'Grassroots Reach', desc: 'Children, families & villages', icon: Users, pos: [2.6, 0.8, -0.2], color: '#E85A2A' },
    { id: 5, label: 'IMPACT', title: 'Verified Service Record', desc: '47,293+ Certified Hours', icon: Sparkles, pos: [4.3, -0.5, 0], color: '#FF8054' },
  ];

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connected Line Pathways between stages */}
      {stages.map((stg, idx) => {
        if (idx === stages.length - 1) return null;
        const nextStg = stages[idx + 1];
        return (
          <Line
            key={`line-${idx}`}
            points={[stg.pos, nextStg.pos]}
            color={idx <= activeStage ? '#E85A2A' : '#CBD5E1'}
            lineWidth={idx <= activeStage ? 2.5 : 1}
            transparent
            opacity={idx <= activeStage ? 0.8 : 0.3}
          />
        );
      })}

      {/* 3D Interactive Node Orbs */}
      {stages.map((stg, idx) => {
        const isActive = activeStage === idx;
        const Icon = stg.icon;

        return (
          <group key={stg.id} position={stg.pos}>
            {/* Sphere Mesh */}
            <mesh
              onClick={() => setActiveStage(idx)}
              onPointerOver={() => (document.body.style.cursor = 'pointer')}
              onPointerOut={() => (document.body.style.cursor = 'auto')}
            >
              <sphereGeometry args={[isActive ? 0.35 : 0.25, 32, 32]} />
              <meshStandardMaterial
                color={isActive ? stg.color : '#94A3B8'}
                roughness={0.2}
                metalness={0.1}
                emissive={isActive ? stg.color : '#000000'}
                emissiveIntensity={isActive ? 0.4 : 0}
              />
            </mesh>

            {/* Floating HTML Label Tag */}
            <Html position={[0, -0.5, 0]} center style={{ pointerEvents: 'none', userSelect: 'none' }}>
              <div
                style={{
                  background: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.9)',
                  border: isActive ? `2px solid ${stg.color}` : '1px solid #E2E8F0',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '20px',
                  boxShadow: isActive ? '0 8px 20px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ color: isActive ? stg.color : '#64748B', display: 'flex' }}>
                  <Icon size={14} />
                </div>
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    color: isActive ? '#1E293B' : '#64748B',
                    letterSpacing: '0.05em',
                  }}
                >
                  {stg.label}
                </span>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export default function ImpactNetwork3D() {
  const [activeStage, setActiveStage] = useState(2);

  const stageDetails = [
    { label: 'YOU', title: 'Passionate Individual', desc: 'Every volunteer journey starts with an individual deciding to dedicate time and skills to community service.' },
    { label: 'VOLUNTEER', title: 'Verified Volunteer Profile', desc: 'Sign up on SocialVolunteers.in to receive your digital Volunteer Passport ID and cause matching.' },
    { label: 'OPPORTUNITY', title: 'Verified Shift Reservation', desc: 'Reserve structured 4-6 hour weekend or remote shifts verified by partner grassroots NGOs.' },
    { label: 'PROJECT', title: 'Long-Term Initiative', desc: 'Shifts contribute to active long-term projects like rural solar edtech, urban forestry, and diagnostic health.' },
    { label: 'COMMUNITY', title: 'Grassroots Transformation', desc: 'Direct, tangible impact reaching rural school students, riverbank ecosystems, and village healthcare.' },
    { label: 'IMPACT', title: 'Audited Verified Hours', desc: 'Completed hours are audited by coordinators and converted into verifiable digital certificates.' },
  ];

  const currentInfo = stageDetails[activeStage];

  return (
    <section id="impact-network" className="section-padding" style={{ background: '#FAF9F6', position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem' }}>
          <span className="subheading">SIGNATURE INTERACTIVE VISUALIZATION</span>
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
            The SocialVolunteers <span style={{ color: 'var(--brand-orange)', fontStyle: 'italic' }}>Impact Network</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem' }}>
            Explore how an individual volunteer shift connects through projects to create verifiable community change across India.
          </p>
        </div>

        {/* 3D WebGL Network Canvas */}
        <div
          style={{
            height: '380px',
            width: '100%',
            borderRadius: 'var(--radius-lg)',
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '2rem',
          }}
        >
          <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
            <ambientLight intensity={1.2} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <NetworkNodes activeStage={activeStage} setActiveStage={setActiveStage} />
          </Canvas>

          {/* Interactive Hint Pill */}
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              padding: '0.4rem 0.85rem',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: 'var(--brand-orange)',
              border: '1px solid rgba(232, 90, 42, 0.2)',
            }}
          >
            ⚡ Click any node to navigate stage
          </div>
        </div>

        {/* Selected Stage Detail Card */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            padding: '1.75rem 2rem',
            border: '1px solid #E2E8F0',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--brand-orange)', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>
              STAGE 0{activeStage + 1} — {currentInfo.label}
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              {currentInfo.title}
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '650px', lineHeight: 1.5 }}>
              {currentInfo.desc}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {stageDetails.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStage(idx)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid',
                  borderColor: activeStage === idx ? 'var(--brand-orange)' : '#CBD5E1',
                  backgroundColor: activeStage === idx ? 'var(--brand-orange)' : '#FFFFFF',
                  color: activeStage === idx ? '#FFFFFF' : '#64748B',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
