import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowRight, Sparkles } from 'lucide-react';

import { useCMS } from '../context/CMSContext';

// Photorealistic PBR 3D Pathway Nodes & Traveling Energy Particles
function Pathway3DScene({ activeStep, onSelectStep }) {
  const groupRef = useRef();

  // Define 6 node positions in 3D space along a curve
  const nodePositions = useMemo(() => [
    new THREE.Vector3(-4.5, 1.8, 1.5),
    new THREE.Vector3(-2.8, -1.2, 0.8),
    new THREE.Vector3(-1.0, 1.5, -0.2),
    new THREE.Vector3(0.8, -1.0, -1.0),
    new THREE.Vector3(2.6, 1.6, -1.8),
    new THREE.Vector3(4.4, -0.8, -2.5),
  ], []);

  // Calculate curve points for the pathway
  const curvePoints = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(nodePositions);
    return curve.getPoints(100);
  }, [nodePositions]);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth 3D camera flight interpolation based on activeStep
      const targetPos = nodePositions[activeStep] || nodePositions[0];
      const targetCamX = targetPos.x * 0.45;
      const targetCamY = targetPos.y * 0.3;
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetCamX, 0.05);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY + 0.4, 0.05);
      state.camera.lookAt(targetPos.x * 0.3, targetPos.y * 0.2, 0);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Photorealistic 3D Pathway Line */}
      <Line
        points={curvePoints}
        color="#FF8054"
        lineWidth={3.5}
        transparent
        opacity={0.75}
      />

      {/* Photorealistic 3D PBR Glass Nodes */}
      {nodePositions.map((pos, idx) => {
        const isActive = activeStep === idx;
        return (
          <group key={idx} position={pos} onClick={() => onSelectStep(idx)}>
            <Float speed={isActive ? 1.8 : 0.8} rotationIntensity={0.2} floatIntensity={isActive ? 0.6 : 0.3}>
              {/* Outer PBR Translucent Glass Sphere */}
              <mesh>
                <sphereGeometry args={[isActive ? 0.48 : 0.32, 32, 32]} />
                <meshPhysicalMaterial
                  color={isActive ? '#FF8054' : '#E85A2A'}
                  roughness={0.12}
                  metalness={0.1}
                  transmission={0.65}
                  thickness={1.3}
                  ior={1.5}
                  clearcoat={1.0}
                  emissive={isActive ? '#FF8054' : '#E85A2A'}
                  emissiveIntensity={isActive ? 1.4 : 0.3}
                  transparent
                  opacity={isActive ? 0.95 : 0.75}
                />
              </mesh>
              {/* Inner Solid Specular Core */}
              <mesh>
                <sphereGeometry args={[0.16, 16, 16]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
            </Float>
          </group>
        );
      })}
    </group>
  );
}

export default function SignatureImpactJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const { impactJourney } = useCMS();

  const journeySteps = impactJourney && impactJourney.length > 0 ? impactJourney : [
    {
      id: 'stage-you',
      stage: 'YOU',
      title: 'Every Journey Begins With You',
      subtitle: 'Passionate Individual',
      text: 'You bring unique time, skills, and energy. Choosing to give back is the spark that starts real community transformation.',
      stat: '2,847+ Active Volunteers',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'stage-volunteer',
      stage: 'VOLUNTEER',
      title: 'Digital Volunteer Passport ID',
      subtitle: 'Verified Profile',
      text: 'Receive an official verified identity card. Your preferences match with genuine grassroots non-profits operating nearby.',
      stat: '100% Identity Verified',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'stage-opportunity',
      stage: 'OPPORTUNITY',
      title: 'Structured Field & Remote Shifts',
      subtitle: '4-6 Hour Commitment',
      text: 'Reserve specific, structured shifts with clear objectives, location details, coordinator contacts, and required roles.',
      stat: '183+ Published Shifts',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'stage-project',
      stage: 'PROJECT',
      title: 'Long-Term Community Initiatives',
      subtitle: 'Sustainable Action',
      text: 'Individual shifts build into massive initiatives like Pan-India Solar Digital Hubs, Miyawaki Urban Forests, and Rural Diagnostic Camps.',
      stat: '186+ Active Projects',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'stage-community',
      stage: 'COMMUNITY',
      title: 'Direct Grassroots Transformation',
      subtitle: 'Real People Touched',
      text: 'Underprivileged students learn mathematics, rural mothers receive healthcare checkups, and riverbanks are cleared of plastic.',
      stat: '12,456+ Beneficiaries',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'stage-impact',
      stage: 'IMPACT',
      title: 'Audited Certified Hours Record',
      subtitle: 'Verifiable Proof',
      text: 'Coordinators audit shift attendance, logging permanent verified hours into your shareable digital certificate profile.',
      stat: '47,293+ Verified Hours',
      image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1200&q=80',
    },
  ];


  const current = journeySteps[activeStep];

  return (
    <section
      id="impact-journey"
      className="section-padding"
      style={{
        backgroundColor: '#0B0F17',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '780px',
      }}
    >
      {/* Background Ambient Image Overlay */}
      <img
        src={current.image}
        alt={current.title}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.18,
          transition: 'opacity 0.7s ease',
          zIndex: 1,
          filter: 'contrast(120%) brightness(80%)',
        }}
      />

      {/* 3D WebGL Canvas Layer */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'auto' }}>
        <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.9} />
          <pointLight position={[4, 4, 4]} intensity={2} color="#FF9A76" />
          <pointLight position={[-4, -3, -2]} intensity={1.5} color="#E85A2A" />
          <Pathway3DScene activeStep={activeStep} onSelectStep={(stepIdx) => setActiveStep(stepIdx)} />
        </Canvas>
      </div>

      {/* Content Container */}
      <div className="container" style={{ position: 'relative', zIndex: 3, pointerEvents: 'none' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3.5rem', pointerEvents: 'auto' }}>
          <span style={{ color: '#FF8054', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            SIGNATURE 3D IMPACT JOURNEY
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.3rem, 4.5vw, 3.5rem)', fontWeight: 700, marginTop: '0.5rem', marginBottom: '1rem' }}>
            From Individual Intent to <span style={{ color: 'var(--brand-orange)', fontStyle: 'italic' }}>Verified Community Impact</span>
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.1rem' }}>
            Interactive 3D pathway tracing how one volunteer step connects across six stages in India.
          </p>
        </div>

        {/* 3D Step Progression Controls */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            pointerEvents: 'auto',
          }}
        >
          {journeySteps.map((s, idx) => (
            <React.Fragment key={s.id}>
              <button
                onClick={() => setActiveStep(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '30px',
                  border: activeStep === idx ? '2px solid #FF8054' : '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: activeStep === idx ? 'var(--brand-orange)' : 'rgba(17, 24, 39, 0.75)',
                  color: activeStep === idx ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
                  fontWeight: 750,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  boxShadow: activeStep === idx ? '0 10px 25px rgba(232, 90, 42, 0.5)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <span>{s.stage}</span>
              </button>
              {idx < journeySteps.length - 1 && (
                <span style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: '0.9rem' }}>→</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* 3D Glass Stage Info Panel */}
        <div
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(24px)',
            borderRadius: '24px',
            padding: '3.5rem 3rem',
            maxWidth: '920px',
            margin: '0 auto 4rem',
            border: '1px solid rgba(255, 128, 84, 0.3)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 20px rgba(232, 90, 42, 0.15)',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '3rem',
            alignItems: 'center',
            pointerEvents: 'auto',
          }}
          className="journey-panel-grid"
        >
          <div>
            <div style={{ color: '#FF8054', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
              STAGE 0{activeStep + 1} • {current.subtitle.toUpperCase()}
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 700, marginBottom: '1rem', color: '#FFFFFF', lineHeight: 1.25 }}>
              {current.title}
            </h3>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.88)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
              {current.text}
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5.rem',
                backgroundColor: 'rgba(232, 90, 42, 0.25)',
                color: '#FF8054',
                padding: '0.5rem 1.1rem',
                borderRadius: '20px',
                fontWeight: 750,
                fontSize: '0.88rem',
                border: '1px solid rgba(255, 128, 84, 0.3)',
              }}
            >
              <Sparkles size={16} />
              <span style={{ marginLeft: '0.3rem' }}>{current.stat}</span>
            </div>
          </div>

          <div
            className="img-hover-zoom"
            style={{
              borderRadius: '16px',
              height: '280px',
              overflow: 'hidden',
              boxShadow: '0 16px 36px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
            }}
          >
            <img src={current.image} alt={current.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Signature Ending Quote Block */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto', pointerEvents: 'auto' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontStyle: 'italic', color: '#FFFFFF', marginBottom: '1.5rem' }}>
            "Your time becomes someone's opportunity."
          </p>
          <a
            href="#opportunities"
            className="btn-orange"
            style={{ padding: '1rem 2.25rem', fontSize: '1.05rem', borderRadius: '30px', boxShadow: '0 10px 28px rgba(232, 90, 42, 0.5)' }}
          >
            <span>Find an Opportunity</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .journey-panel-grid {
            grid-template-columns: 1fr !important;
            padding: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
