import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { ArrowRight, Search } from 'lucide-react';
import Hero3DCanvas from './Hero3DCanvas';
import MagneticButton from './MagneticButton';

export default function Hero({ onOpenVolunteerModal }) {
  const { heroContent } = useCMS();
  const [parallaxOffset, setParallaxOffset] = useState({ bgX: 0, bgY: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const xRatio = (e.clientX / window.innerWidth) * 2 - 1;
      const yRatio = (e.clientY / window.innerHeight) * 2 - 1;

      // Subtle camera parallax displacement (4-6px background shift)
      setParallaxOffset({
        bgX: xRatio * -5,
        bgY: yRatio * -5,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToOpportunities = (e) => {
    e.preventDefault();
    const target = document.getElementById('opportunities');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '640px',
        height: '80vh',
        maxHeight: '750px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '76px', // navbar height offset
        overflow: 'hidden',
        color: '#FFFFFF',
      }}
    >
      {/* 1. Full-Width Authentic Social Impact Photography with Camera Parallax */}
      <img
        src={heroContent.bgImage}
        alt="Volunteers helping communities in India"
        style={{
          position: 'absolute',
          top: '-10px',
          left: '-10px',
          width: 'calc(100% + 20px)',
          height: 'calc(100% + 20px)',
          objectFit: 'cover',
          objectPosition: 'center 35%',
          transform: `translate3d(${parallaxOffset.bgX}px, ${parallaxOffset.bgY}px, 0px)`,
          transition: 'transform 0.1s ease-out',
          zIndex: 1,
        }}
      />

      {/* 2. Sophisticated Dark Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(180deg, rgba(17, 24, 39, ${heroContent.overlayDarkness || 0.7}) 0%, rgba(17, 24, 39, ${(heroContent.overlayDarkness || 0.7) + 0.1}) 50%, rgba(17, 24, 39, ${(heroContent.overlayDarkness || 0.7) + 0.18}) 100%)`,
          zIndex: 2,
        }}
      />

      {/* 3. Photorealistic 3D Ambient Canvas */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 3, pointerEvents: 'none' }}>
        <Hero3DCanvas />
      </div>

      {/* 4. Centered Editorial Hero Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 4,
          textAlign: 'center',
          maxWidth: '860px',
          margin: '0 auto',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Eyebrow */}
        <span
          style={{
            fontSize: '0.85rem',
            fontWeight: 800,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#FF8054',
            marginBottom: '1rem',
            display: 'inline-block',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          {heroContent.eyebrow}
        </span>

        {/* Main Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            marginBottom: '1.25rem',
            maxWidth: '820px',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
          }}
        >
          {heroContent.heading} <br />
          <span style={{ color: 'var(--brand-orange)', textShadow: '0 0 25px rgba(232, 90, 42, 0.5)' }}>
            {heroContent.highlightText}
          </span>
        </h1>

        {/* Subtitle / Description */}
        <p
          style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '2.5rem',
            maxWidth: '650px',
            fontWeight: 400,
            textShadow: '0 2px 10px rgba(0,0,0,0.6)',
          }}
        >
          {heroContent.description}
        </p>

        {/* Two Clean Primary Magnetic CTAs */}
        <div
          style={{
            display: 'flex',
            gap: '1.25rem',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {/* Primary CTA */}
          <MagneticButton maxTranslate={8}>
            <button
              onClick={(e) => {
                if (onOpenVolunteerModal) {
                  onOpenVolunteerModal(e);
                } else {
                  window.history.pushState({}, '', '/signup');
                  window.dispatchEvent(new Event('popstate'));
                }
              }}
              className="btn-orange"
              style={{
                padding: '0.95rem 2rem',
                fontSize: '1rem',
                borderRadius: '30px',
                fontWeight: 700,
                boxShadow: '0 12px 30px rgba(232, 90, 42, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <span>{heroContent.primaryCtaText}</span>
              <ArrowRight size={18} />
            </button>
          </MagneticButton>

          {/* Secondary CTA */}
          <MagneticButton maxTranslate={8}>
            <a
              href="#opportunities"
              onClick={scrollToOpportunities}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.95rem 2rem',
                fontSize: '1rem',
                fontWeight: 650,
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                borderRadius: '30px',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              <Search size={18} />
              <span>{heroContent.secondaryCtaText}</span>
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
