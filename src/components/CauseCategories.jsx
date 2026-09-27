import React from 'react';
import { useCMS } from '../context/CMSContext';
import Card3DTilt from './Card3DTilt';
import { ArrowUpRight } from 'lucide-react';

export default function CauseCategories({ onSelectCause }) {
  const { causes: cmsCauses } = useCMS();

  const fallbackCauses = [
    {
      id: 'Education',
      name: 'Education & Literacy',
      desc: 'Weekend teaching hubs, digital kiosks, and book drives for children.',
      count: '42 Open Roles',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'Healthcare',
      name: 'Healthcare & Diagnostics',
      desc: 'Diagnostic checkup camps, emergency blood registries, and hygiene distribution.',
      count: '35 Open Roles',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'Environment',
      name: 'Environmental Action',
      desc: 'Miyawaki native tree plantation, riverbank plastic recovery, and solar lighting.',
      count: '28 Open Roles',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'Livelihoods',
      name: 'Livelihoods & Skills',
      desc: 'Women self-help groups, tailoring trade workshops, and handicraft cataloging.',
      count: '24 Open Roles',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'Inclusion',
      name: 'Social Inclusion',
      desc: 'Senior citizen home companionship, disability assistance, and community care.',
      count: '19 Open Roles',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'Disaster Response',
      name: 'Disaster Response',
      desc: 'Emergency flood relief corps, dry ration distribution, and crisis aid.',
      count: '15 Open Roles',
      image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const causes = cmsCauses && cmsCauses.length > 0 ? cmsCauses.filter(c => c.active !== false) : fallbackCauses;

  return (
    <section id="causes" className="section-padding" style={{ background: 'var(--bg-primary)', position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <span className="subheading">CAUSE SECTORS</span>
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
            Where Do You Want to Make a <span style={{ color: 'var(--brand-orange)', fontStyle: 'italic' }}>Difference</span>?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem' }}>
            Explore verified volunteer roles across authentic grassroots sectors in communities across India.
          </p>
        </div>

        {/* Photography-Based 3D Cause Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {causes.map((cause) => (
            <Card3DTilt
              key={cause.id}
              maxTilt={10}
              scale={1.03}
              className="cause-card"
              style={{
                borderRadius: 'var(--radius-md)',
                height: '320px',
                overflow: 'hidden',
              }}
              onClick={() => onSelectCause && onSelectCause(cause.id)}
            >
              <div className="img-hover-zoom" style={{ width: '100%', height: '100%', position: 'relative' }}>
                <img src={cause.image} alt={cause.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                {/* Photo Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.25) 65%)',
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    color: '#FFFFFF',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span
                      style={{
                        background: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(8px)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                      }}
                    >
                      {cause.count}
                    </span>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--brand-orange)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(232, 90, 42, 0.4)' }}>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.35rem', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>{cause.name}</h3>
                  <p style={{ fontSize: '0.85rem', opacity: 0.9, lineHeight: 1.4, marginBottom: '0.75rem' }}>
                    {cause.desc}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.88rem', fontWeight: 700, color: '#FF8054' }}>
                    <span>Explore</span>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>

      </div>
    </section>
  );
}
