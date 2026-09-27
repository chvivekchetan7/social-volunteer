import React from 'react';
import { useCMS } from '../context/CMSContext';
import Card3DTilt from './Card3DTilt';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function ProjectShowcase() {
  const { projects } = useCMS();

  const fallbackFeatured = {
    id: 'proj-1',
    title: 'Pan-India Solar Digital Learning Kiosks',
    organisation: 'Shiksha & SocialVolunteers Tech Initiative',
    category: 'Education & Technology',
    goal: 'Establish 100 solar-powered digital education kiosks in off-grid rural schools, benefiting 15,000+ students.',
    timeline: 'Phase 2 Active',
    aggregateHours: '18,420 Verified Hours',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
  };

  const fallbackSecondary = [
    {
      id: 'proj-2',
      title: 'Miyawaki Urban Forests & Riverbank Restoration',
      organisation: 'Prakriti Conservation Foundation',
      category: 'Climate & Ecology',
      goal: 'Plant 50,000 native trees using high-density Miyawaki techniques and clean 100km of riverbanks.',
      timeline: 'Ongoing Drive',
      aggregateHours: '14,280 Verified Hours',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'proj-3',
      title: 'Mobile Rural Diagnostic Camps & Maternal Care',
      organisation: 'Swasthya Seva Network',
      category: 'Healthcare & Diagnostics',
      goal: 'Deliver monthly mobile diagnostic checkups, tele-consultations, and hygiene kits to 200 remote villages.',
      timeline: 'Pan-India Phase',
      aggregateHours: '14,593 Verified Hours',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const featuredProject = projects && projects.length > 0 ? projects[0] : fallbackFeatured;
  const secondaryProjects = projects && projects.length > 1 ? projects.slice(1) : fallbackSecondary;

  return (
    <section id="projects" className="section-padding" style={{ background: '#FFFFFF', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <span className="subheading">COMMUNITY IMPACT INITIATIVES</span>
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
            Featured Impact <span style={{ color: 'var(--brand-orange)', fontStyle: 'italic' }}>Projects</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem' }}>
            Explore long-term initiatives transforming education, environment, and healthcare across India.
          </p>
        </div>

        {/* Editorial Photography Layout: 1 Large Featured + 2 Smaller Projects */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '2rem',
            alignItems: 'stretch',
          }}
          className="projects-editorial-grid"
        >
          {/* 1. Large Featured Project 3D Card */}
          <Card3DTilt
            maxTilt={6}
            scale={1.01}
            className="img-hover-zoom"
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              minHeight: '480px',
              height: '100%',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                position: 'relative',
              }}
            >
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* Content Gradient Overlay */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.45) 70%, transparent 100%)',
                  padding: '2.5rem 2rem 2rem',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span
                    style={{
                      backgroundColor: 'var(--brand-orange)',
                      color: '#FFFFFF',
                      padding: '0.25rem 0.8rem',
                      borderRadius: '20px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      boxShadow: '0 4px 12px rgba(232, 90, 42, 0.4)',
                    }}
                  >
                    FEATURED PROJECT
                  </span>
                  <span style={{ fontSize: '0.8rem', opacity: 0.85, fontWeight: 600 }}>{featuredProject.aggregateHours}</span>
                </div>

                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.25, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  {featuredProject.title}
                </h3>

                <p style={{ fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.5, marginBottom: '1.25rem', maxWidth: '540px' }}>
                  {featuredProject.goal}
                </p>

                <a
                  href="#opportunities"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#FF8054',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    textDecoration: 'none',
                  }}
                >
                  <span>View Opportunities for this Project</span>
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </Card3DTilt>

          {/* 2. Two Smaller Projects Stacked in 3D Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {secondaryProjects.map((p) => (
              <Card3DTilt
                key={p.id}
                maxTilt={6}
                scale={1.015}
                style={{
                  background: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid #E5E7EB',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '180px 1fr',
                    gap: '1.25rem',
                    padding: '1rem',
                    alignItems: 'center',
                  }}
                >
                  <div
                    className="img-hover-zoom"
                    style={{
                      borderRadius: '12px',
                      height: '140px',
                      width: '100%',
                      overflow: 'hidden',
                    }}
                  >
                    <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-orange)', marginBottom: '0.25rem' }}>
                      {p.category.toUpperCase()}
                    </div>

                    <h4 style={{ fontSize: '1.1rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                      {p.title}
                    </h4>

                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '0.6rem' }}>
                      {p.goal}
                    </p>

                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <CheckCircle2 size={14} />
                      <span>{p.aggregateHours}</span>
                    </div>
                  </div>
                </div>
              </Card3DTilt>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .projects-editorial-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
