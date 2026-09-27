import React from 'react';
import { Target, Eye, Compass, Heart, Users, Award, Shield, Sparkles } from 'lucide-react';

export default function AboutSection({ onOpenVolunteerModal }) {
  // Real core values from reference site
  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      desc: 'We believe in the power of empathy and kindness to transform communities.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      desc: 'Working together with volunteers and organizations to maximize impact.',
    },
    {
      icon: Award,
      title: 'Excellence',
      desc: 'Committed to delivering high-quality volunteer experiences and outcomes.',
    },
    {
      icon: Compass,
      title: 'Inclusivity',
      desc: 'Creating opportunities accessible to everyone, regardless of background.',
    },
  ];

  // Real team members from reference site
  const team = [
    { name: 'Sridhar G', role: 'Founder and CEO', initials: 'SG' },
    { name: 'Sridhar V', role: 'Director', initials: 'SV' },
    { name: 'Naveen G', role: 'Director', initials: 'NG' },
    { name: 'Srinath', role: 'Project Leader', initials: 'S' },
  ];

  return (
    <section id="about" className="section-padding" style={{ background: 'var(--bg-primary)', position: 'relative' }}>
      <div className="container">
        
        {/* Editorial Top Section */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 4rem' }}>
          <span className="subheading">ABOUT SOCIALVOLUNTEERS.IN</span>
          <h2 className="heading-lg" style={{ marginBottom: '1.25rem' }}>
            Empowering Individuals to Create <span style={{ color: 'var(--brand-orange)', fontStyle: 'italic' }}>Sustainable</span> Social Change
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.65 }}>
            We are a platform dedicated to connecting passionate individuals with meaningful volunteer opportunities, creating lasting positive impact in communities across India.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '5rem',
          }}
        >
          <div
            className="glass-panel"
            style={{
              padding: '2.5rem',
              borderRadius: 'var(--radius-lg)',
              borderTop: '4px solid var(--brand-orange)',
              background: '#FFFFFF',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'var(--brand-orange-soft)',
                  color: 'var(--brand-orange)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Target size={22} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>Our Mission</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.65 }}>
              To empower individuals to make a difference by providing accessible, meaningful volunteer opportunities that address critical social needs and foster community development.
            </p>
          </div>

          <div
            className="glass-panel"
            style={{
              padding: '2.5rem',
              borderRadius: 'var(--radius-lg)',
              borderTop: '4px solid var(--brand-orange-light)',
              background: '#FFFFFF',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'var(--brand-orange-soft)',
                  color: 'var(--brand-orange)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Eye size={22} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>Our Vision</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.65 }}>
              A society where every individual actively contributes to social welfare, creating sustainable positive change through organized volunteer efforts and community engagement.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="subheading">OUR GUIDING VALUES</span>
            <h3 className="heading-md">Committed to Quality & Integrity</h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    padding: '2rem 1.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(24, 24, 22, 0.08)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: 'var(--brand-orange-soft)',
                      color: 'var(--brand-orange)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                    {v.title}
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leadership & Team Section */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="subheading">LEADERSHIP TEAM</span>
            <h3 className="heading-md">Dedicated Professionals Driving Impact</h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {team.map((m, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '2rem 1.5rem',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  background: '#FFFFFF',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #E85A2A 0%, #FF8054 100%)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    margin: '0 auto 1.25rem',
                  }}
                >
                  {m.initials}
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 750, color: 'var(--text-primary)' }}>{m.name}</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--brand-orange)', fontWeight: 600, marginTop: '0.2rem' }}>
                  {m.role}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
