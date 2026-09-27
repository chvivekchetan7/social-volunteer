import React, { useState, useEffect, useRef } from 'react';
import { useCMS } from '../context/CMSContext';
import Card3DTilt from './Card3DTilt';
import { Award, Users, MapPin, Layers, Clock, ShieldCheck, Heart } from 'lucide-react';

function CounterCard({ targetNumber, label, desc, suffix = '+' }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  // Parse raw number from string like '2,847+'
  const numericTarget = parseInt(String(targetNumber).replace(/[^0-9]/g, ''), 10) || 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const stepTime = 25;
          const steps = duration / stepTime;
          const increment = numericTarget / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= numericTarget) {
              setCount(numericTarget);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.25 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [numericTarget, hasAnimated]);

  return (
    <div ref={ref} style={{ width: '100%' }}>
      <Card3DTilt
        maxTilt={8}
        scale={1.02}
        style={{
          background: 'var(--bg-primary)',
          padding: '2.5rem 1.5rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid #E5E7EB',
          textAlign: 'center',
          height: '100%',
        }}
      >
        <div
          style={{
            fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
            fontFamily: 'var(--font-serif)',
            fontWeight: 800,
            color: 'var(--brand-orange)',
            lineHeight: 1,
            marginBottom: '0.75rem',
            textShadow: '0 2px 10px rgba(232, 90, 42, 0.2)',
          }}
        >
          {hasAnimated ? `${count.toLocaleString()}` : targetNumber}
        </div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
          {label}
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
          {desc}
        </p>
      </Card3DTilt>
    </div>
  );
}

export default function ImpactStats() {
  const { impactStats: cmsImpactStats } = useCMS();

  const fallbackStats = [
    {
      number: '2,847+',
      label: 'Volunteers',
      desc: 'Active volunteers registered across India.',
    },
    {
      number: '47,293+',
      label: 'Verified Hours',
      desc: 'Certified hours logged and audited.',
    },
    {
      number: '12,456+',
      label: 'Lives Impacted',
      desc: 'Community beneficiaries reached directly.',
    },
    {
      number: '183+',
      label: 'Opportunities',
      desc: 'Published field and remote shifts.',
    },
  ];

  const stats = cmsImpactStats && cmsImpactStats.length > 0
    ? cmsImpactStats.filter(s => s.active !== false)
    : fallbackStats;

  return (
    <section id="impact" className="section-padding" style={{ background: '#FFFFFF', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
          <span className="subheading">OUR VERIFIED IMPACT</span>
          <h2 className="heading-lg" style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Real People. <span style={{ color: 'var(--brand-orange)', fontStyle: 'italic' }}>Measurable</span> Outcomes.
          </h2>
          <p style={{ fontSize: '1.08rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Quantifiable community service metrics logged across verified projects in India.
          </p>
        </div>

        {/* 3D Stats Grid with Count-up & Specular Light Sweep */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {stats.map((item, index) => (
            <CounterCard
              key={index}
              targetNumber={item.number}
              label={item.label}
              desc={item.desc}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
