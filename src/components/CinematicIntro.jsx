import React, { useEffect, useState } from 'react';

export default function CinematicIntro({ onComplete }) {
  const [stage, setStage] = useState(0); // 0: init, 1: light node, 2: logo reveal, 3: fade out
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if reduced motion is requested or intro was already played this session
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasSeenIntro = sessionStorage.getItem('sv_intro_seen');

    if (prefersReducedMotion || hasSeenIntro) {
      setIsVisible(false);
      onComplete && onComplete();
      return;
    }

    // Timeline steps (Total ~1.2s)
    const t1 = setTimeout(() => setStage(1), 100);
    const t2 = setTimeout(() => setStage(2), 450);
    const t3 = setTimeout(() => setStage(3), 1000);
    const t4 = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('sv_intro_seen', 'true');
      onComplete && onComplete();
    }, 1300);
    const safety = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(safety);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: '#0B0F17',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: stage === 3 ? 0 : 1,
        transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: stage === 3 ? 'none' : 'auto',
      }}
    >
      {/* Central Orange Light Node */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: stage >= 1 ? '16px' : '0px',
            height: stage >= 1 ? '16px' : '0px',
            borderRadius: '50%',
            backgroundColor: '#FF8054',
            boxShadow: '0 0 30px #E85A2A, 0 0 60px #FF8054',
            transition: 'width 0.3s ease, height 0.3s ease',
            marginBottom: '1.5rem',
          }}
        />

        {/* SocialVolunteers Logo Light Sweep Reveal */}
        <div
          style={{
            opacity: stage >= 2 ? 1 : 0,
            transform: stage >= 2 ? 'translateY(0px) scale(1)' : 'translateY(10px) scale(0.96)',
            transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '2rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              position: 'relative',
              display: 'inline-block',
            }}
          >
            Social<span style={{ color: '#E85A2A' }}>Volunteers</span>.in
          </span>
          <div
            style={{
              fontSize: '0.75rem',
              color: '#FF8054',
              letterSpacing: '0.25em',
              fontWeight: 700,
              marginTop: '0.4rem',
              textTransform: 'uppercase',
            }}
          >
            COMMUNITY IMPACT PLATFORM
          </div>
        </div>
      </div>
    </div>
  );
}
