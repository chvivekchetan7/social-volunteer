import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ShieldCheck, Award, QrCode, CheckCircle2, Search, Filter } from 'lucide-react';

export default function DirectorySection() {
  const { volunteers } = useCMS();

  const directorySamples = [
    { name: 'Aarav Sharma', id: 'VOL-882910', hours: '142 hrs', badge: 'Gold Educator', category: 'Education' },
    { name: 'Kavya Nair', id: 'VOL-441029', hours: '210 hrs', badge: 'Medical Lead', category: 'Healthcare' },
    { name: 'Rohan Gupta', id: 'VOL-993012', hours: '95 hrs', badge: 'Eco Champion', category: 'Environment' },
    { name: 'Ananya Verma', id: 'VOL-102948', hours: '180 hrs', badge: 'Community Guide', category: 'Community' },
  ];

  const displayList = volunteers && volunteers.length > 0 
    ? volunteers.map((v, i) => ({
        name: v.name,
        id: v.id ? `VOL-${v.id.replace('v-', '')}` : `VOL-${100 + i}`,
        hours: `${v.hours || 0} hrs`,
        badge: v.cause || 'Verified Volunteer',
        category: v.cause || 'General',
      }))
    : directorySamples;

  return (
    <section id="directory" className="section-padding" style={{ background: 'var(--bg-primary)', position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
          <span className="subheading">VOLUNTEER DIRECTORY & DIGITAL ID</span>
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
            Meet Our Community & <span style={{ color: 'var(--accent-emerald)', fontStyle: 'italic' }}>Verified</span> Volunteers
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem' }}>
            Every registered volunteer receives an official Digital Volunteer ID card, verified service log, and downloadable certificates.
          </p>
        </div>

        {/* Feature Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4rem',
          }}
        >
          {displayList.map((v, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '1.75rem',
                borderRadius: 'var(--radius-md)',
                background: '#FFFFFF',
                border: '1px solid rgba(24, 24, 22, 0.08)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="badge-tag" style={{ fontSize: '0.75rem' }}>{v.id}</span>
                <ShieldCheck size={18} style={{ color: 'var(--accent-emerald)' }} />
              </div>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                {v.name}
              </h4>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Category: {v.category}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'var(--bg-secondary)',
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: 650,
                }}
              >
                <span style={{ color: 'var(--accent-emerald)' }}>{v.hours} Verified</span>
                <span style={{ color: 'var(--accent-gold)' }}>{v.badge}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Digital ID Highlight Banner */}
        <div
          className="glass-panel-dark"
          style={{
            borderRadius: 'var(--radius-lg)',
            padding: '3rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-gold)', letterSpacing: '0.15em' }}>
              INSTANT VERIFICATION
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#FFFFFF', marginTop: '0.5rem', marginBottom: '1rem' }}>
              Your Official Digital Volunteer Passport
            </h3>
            <p style={{ color: 'rgba(251, 249, 245, 0.75)', fontSize: '1rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
              Showcase your verified service hours, earned badges, and project contributions seamlessly to academic institutions and future employers.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {['Instant QR verification link', 'Downloadable PDF Certificate of Service', 'Track hours served across partner NGOs'].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#FFFFFF', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--accent-emerald-light)' }} />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--radius-md)',
              padding: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                background: '#FFFFFF',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-emerald)',
                flexShrink: 0,
              }}
            >
              <QrCode size={50} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 700 }}>VERIFIED NON-PROFIT ID</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', margin: '0.2rem 0' }}>Social Volunteers Pass</div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(251, 249, 245, 0.7)' }}>ID: SV-INDIA-2026-ONLINE</div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 850px) {
          #directory .glass-panel-dark {
            grid-template-columns: 1fr !important;
            padding: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
