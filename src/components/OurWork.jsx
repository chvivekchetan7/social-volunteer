import React, { useState } from 'react';
import { BookOpen, HeartPulse, Leaf, Users, ArrowUpRight, CheckCircle2, Sparkles, X, MapPin, Clock } from 'lucide-react';

export default function OurWork({ onOpenVolunteerModal }) {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedModalInitiative, setSelectedModalInitiative] = useState(null);

  const initiatives = [
    {
      id: 'education',
      title: 'Education & Digital Literacy',
      hindiTag: 'Shiksha Mission',
      icon: BookOpen,
      badge: '5,000+ Students Empowered',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
      shortDesc: 'Bridging the educational divide for underprivileged children through weekend learning hubs, digital literacy centers, and book distribution drives.',
      fullStory: 'Our Shiksha initiative operates community-driven weekend learning hubs in semi-urban and rural clusters. Volunteers provide mentorship in foundational mathematics, science, English communication, and basic computer skills. We also setup digital learning kiosks equipped with tablets and curated offline educational software.',
      outcomes: [
        '35+ Digital Learning Kiosks established in rural schools',
        'Over 12,000 text books and learning kits distributed',
        '88% improvement in foundational literacy metrics among regular attendees',
        'Special mentorship program preparing high-school students for competitive exams',
      ],
      location: 'Delhi NCR, Karnataka, & Bihar',
      volunteerRole: 'Teaching Mentor, Curriculum Designer, Digital Lab Coordinator',
    },
    {
      id: 'health',
      title: 'Healthcare & Preventive Well-being',
      hindiTag: 'Swasthya Seva',
      icon: HeartPulse,
      badge: '18,000+ Medical Checkups',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      shortDesc: 'Organizing mobile health checkup camps, emergency blood donor registries, hygiene kit distribution, and mental health awareness workshops.',
      fullStory: 'Health equity remains a critical challenge in remote habitats. Social Volunteers partners with certified doctors and medical student volunteers to conduct monthly health screening drives, eye checkup camps, and maternal hygiene awareness workshops.',
      outcomes: [
        '180+ Free Health & Diagnostic Camps organized',
        '24/7 Emergency Blood Donor Network with 3,000+ registered donors',
        '15,000+ Hygiene & Menstrual Health Kits distributed',
        'Tele-consultation guidance connecting villagers with specialist doctors',
      ],
      location: 'Pan-India Remote Regions',
      volunteerRole: 'Medical Camp Organizer, Blood Drive Coordinator, Health Counselor',
    },
    {
      id: 'environment',
      title: 'Environmental Sustainability & Climate Action',
      hindiTag: 'Prakriti Conservation',
      icon: Leaf,
      badge: '10,000+ Trees Planted',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
      shortDesc: 'Restoring green cover, conducting urban plastic cleanup drives, installing rainwater harvesting units, and promoting zero-waste lifestyle models.',
      fullStory: 'Prakriti mobilizes youth to fight climate change at ground level. Through Miyawaki urban forest creation, lake and riverbank cleanup drives, and community composting projects, we build resilient micro-ecosystems in cities and villages alike.',
      outcomes: [
        '10,000+ Native saplings planted with 92% survival rate',
        '25 Tons of plastic waste collected and recycled from riverbanks',
        '12 Solar-powered water filtration units installed in rural schools',
        'Youth Climate Action Workshops across 40+ colleges',
      ],
      location: 'Bengaluru, Mumbai, Chennai & Rishikesh',
      volunteerRole: 'Tree Plantation Lead, Cleanup Campaigner, Sustainability Advocate',
    },
    {
      id: 'community',
      title: 'Community Empowerment & Disaster Relief',
      hindiTag: 'Samajik Utthan',
      icon: Users,
      badge: '150+ Villages Supported',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
      shortDesc: 'Empowering women through vocational skill training, supporting senior citizen centers, and deploying immediate disaster relief teams during floods and crises.',
      fullStory: 'Building self-reliant communities requires sustained, multi-dimensional support. We facilitate Women Self-Help Groups (SHGs) for tailoring and handicraft creation, while maintaining an active Emergency Response Corps for flood and disaster relief.',
      outcomes: [
        '450+ Women trained in self-sustaining vocational trades',
        'Over 50,000 emergency meal packs distributed during crisis situations',
        'Support & companionship programs for 15+ senior citizen homes',
        'Clean drinking water projects in drought-affected districts',
      ],
      location: 'Odisha, Assam, Maharashtra & Uttar Pradesh',
      volunteerRole: 'Skill Trainer, Relief Operations Specialist, Community Liaison',
    },
  ];

  const current = initiatives[activeTab];

  return (
    <section id="our-work" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
          <span className="subheading">OUR PILLARS OF IMPACT</span>
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
            Transforming Communities Through <span style={{ color: 'var(--accent-emerald)', fontStyle: 'italic' }}>Purposeful</span> Action
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            We focus our volunteer network on four key interconnected pillars to drive long-term structural change.
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
          }}
        >
          {initiatives.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(idx)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.85rem 1.4rem',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 650,
                  fontSize: '0.92rem',
                  border: '1px solid',
                  borderColor: isActive ? 'var(--accent-emerald)' : 'rgba(28, 26, 23, 0.12)',
                  backgroundColor: isActive ? 'var(--accent-emerald)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive ? '0 8px 20px rgba(12, 84, 64, 0.2)' : 'var(--shadow-sm)',
                }}
              >
                <Icon size={18} />
                <span>{item.title.split('&')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Editorial Showcase Layout */}
        <div
          className="glass-panel"
          style={{
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1.1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Left Visual Card */}
          <div style={{ position: 'relative' }}>
            <div
              className="img-hover-zoom"
              style={{
                borderRadius: 'var(--radius-md)',
                height: '420px',
                boxShadow: 'var(--shadow-md)',
                position: 'relative',
              }}
            >
              <img src={current.image} alt={current.title} />
              <div
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  left: '1.25rem',
                  background: 'rgba(25, 27, 26, 0.85)',
                  backdropFilter: 'blur(12px)',
                  color: '#FFFFFF',
                  padding: '0.4rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Sparkles size={14} style={{ color: 'var(--accent-warm-gold)' }} />
                <span>{current.hindiTag}</span>
              </div>
            </div>

            {/* Floating Metric Pill */}
            <div
              style={{
                position: 'absolute',
                bottom: '-1.25rem',
                right: '-1rem',
                background: '#FFFFFF',
                padding: '1rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid rgba(28, 26, 23, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'var(--accent-emerald-soft)',
                  color: 'var(--accent-emerald)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <current.icon size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>KEY OUTCOME</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>{current.badge}</div>
              </div>
            </div>
          </div>

          {/* Right Text Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="badge-tag">{current.hindiTag}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <MapPin size={14} /> {current.location}
              </span>
            </div>

            <h3 className="heading-md" style={{ color: 'var(--text-primary)' }}>
              {current.title}
            </h3>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              {current.shortDesc}
            </p>

            {/* Bullet Outcomes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: '0.5rem 0' }}>
              {current.outcomes.slice(0, 3).map((out, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 500 }}>{out}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedModalInitiative(current)}
                className="btn-primary"
                style={{ padding: '0.8rem 1.6rem', fontSize: '0.92rem' }}
              >
                <span>Read Full Story & Specs</span>
                <ArrowUpRight size={16} />
              </button>

              <button
                onClick={onOpenVolunteerModal}
                className="btn-secondary"
                style={{ padding: '0.8rem 1.6rem', fontSize: '0.92rem' }}
              >
                <span>Volunteer for this Initiative</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Detailed Modal Popup for Initiative */}
      {selectedModalInitiative && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(25, 27, 26, 0.75)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setSelectedModalInitiative(null)}
        >
          <div
            className="glass-panel"
            style={{
              maxWidth: '720px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              position: 'relative',
              background: '#FFFFFF',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedModalInitiative(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'var(--bg-secondary)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>

            <span className="badge-tag" style={{ marginBottom: '0.75rem' }}>{selectedModalInitiative.hindiTag}</span>
            <h3 className="heading-md" style={{ marginBottom: '1rem' }}>{selectedModalInitiative.title}</h3>
            
            <img
              src={selectedModalInitiative.image}
              alt={selectedModalInitiative.title}
              style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}
            />

            <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Overview & Strategy</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
              {selectedModalInitiative.fullStory}
            </p>

            <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Key Verified Achievements</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {selectedModalInitiative.outcomes.map((out, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)' }} />
                  <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>{out}</span>
                </div>
              ))}
            </div>

            <div
              style={{
                background: 'var(--bg-secondary)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.3rem' }}>
                VOLUNTEER ROLES IN THIS INITIATIVE:
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                {selectedModalInitiative.volunteerRole}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => {
                  setSelectedModalInitiative(null);
                  onOpenVolunteerModal();
                }}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                Apply to Volunteer for this Program
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          #our-work .glass-panel {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
