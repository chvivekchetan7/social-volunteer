import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Clock, User, Heart, Sparkles } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function ScrollStorytelling() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const { oneHourSection } = useCMS();

  const steps = [
    {
      step: '01',
      eyebrow: 'TIME COMMITMENT',
      title: 'ONE HOUR',
      desc: 'Just one hour of your weekend can teach a child mathematics, plant native trees, or assist a doctor at a rural diagnostic camp.',
      stat: '1 Hour = Real Change',
      bgImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
      icon: Clock,
    },
    {
      step: '02',
      eyebrow: 'INDIVIDUAL ACTION',
      title: 'ONE VOLUNTEER',
      desc: 'You bring unique skills, empathy, and dedicated effort. When matched with verified grassroots NGOs, your contribution is maximized.',
      stat: '2,847 Active Volunteers',
      bgImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
      icon: User,
    },
    {
      step: '03',
      eyebrow: 'GRASSROOTS REACH',
      title: 'ONE COMMUNITY',
      desc: 'Local villages, urban school kiosks, and riverbank ecosystems experience tangible improvement through structured volunteer shifts.',
      stat: '12,456 Lives Touched',
      bgImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
      icon: Heart,
    },
    {
      step: '04',
      eyebrow: 'VERIFIED OUTCOME',
      title: 'REAL IMPACT',
      desc: 'Every shift is logged and audited into your official Volunteer Passport ID, building an authenticated service record for life.',
      stat: '47,293 Verified Hours',
      bgImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      icon: Sparkles,
    },
  ];

  const currentStep = steps[activeStep];
  const Icon = currentStep.icon;
  const activeBgImage = oneHourSection?.bgImage || currentStep.bgImage;

  return (
    <section
      id="scroll-story"
      ref={containerRef}
      style={{
        position: 'relative',
        padding: '7rem 0',
        backgroundColor: '#111827',
        color: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      {/* Background Photography Transition */}
      <img
        src={activeBgImage}
        alt={currentStep.title}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.22,
          transition: 'all 0.8s ease-in-out',
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
          <span style={{ color: '#FF8054', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            {oneHourSection?.eyebrow || 'SCROLL STORYTELLING JOURNEY'}
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 700, marginTop: '0.5rem', marginBottom: '1rem' }}>
            {oneHourSection?.heading || 'One Hour Can Create Impact'}
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.08rem' }}>
            {oneHourSection?.description || 'Click or scroll through the 4 steps to see how small moments transform communities.'}
          </p>
        </div>


        {/* Storytelling 4-Step Interactive Display */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '3.5rem',
            alignItems: 'center',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
          className="storytelling-grid"
        >
          {/* Left Column: Step Selectors */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {steps.map((st, idx) => (
              <div
                key={st.step}
                onClick={() => setActiveStep(idx)}
                style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  backgroundColor: activeStep === idx ? 'rgba(232, 90, 42, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  border: activeStep === idx ? '2px solid var(--brand-orange)' : '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                }}
              >
                <span
                  style={{
                    fontSize: '1.5rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 800,
                    color: activeStep === idx ? 'var(--brand-orange)' : 'rgba(255, 255, 255, 0.4)',
                  }}
                >
                  {st.step}
                </span>

                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FF8054', letterSpacing: '0.1em' }}>
                    {st.eyebrow}
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginTop: '0.2rem' }}>
                    {st.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Active Story Display Panel */}
          <div
            style={{
              backgroundColor: 'rgba(17, 24, 39, 0.85)',
              backdropFilter: 'blur(16px)',
              borderRadius: '24px',
              padding: '3rem 2.5rem',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(232, 90, 42, 0.2)',
                  color: 'var(--brand-orange)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={24} />
              </div>

              <span
                style={{
                  backgroundColor: 'rgba(232, 90, 42, 0.2)',
                  color: '#FF8054',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  border: '1px solid rgba(232, 90, 42, 0.3)',
                }}
              >
                {currentStep.stat}
              </span>
            </div>

            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.75rem', color: '#FFFFFF' }}>
                {currentStep.title}
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.65 }}>
                {currentStep.desc}
              </p>
            </div>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
              <a
                href="#opportunities"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  color: '#FF8054',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                }}
              >
                <span>Find Your 1-Hour Shift</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .storytelling-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
