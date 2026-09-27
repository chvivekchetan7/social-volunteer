import React from 'react';
import { Search, UserCheck, CalendarCheck, CheckCircle2, ShieldCheck, Award, ArrowRight } from 'lucide-react';

export default function PlatformJourney() {
  const steps = [
    {
      num: '01',
      title: 'Discover an Opportunity',
      desc: 'Browse public listings by cause, location, date, or remote preferences.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Register & Complete Profile',
      desc: 'Create your account and select interests, skills, and availability.',
      icon: UserCheck,
    },
    {
      num: '03',
      title: 'Coordinator Confirms Shift',
      desc: 'Partner organisation reviews reservation and confirms shift details.',
      icon: CalendarCheck,
    },
    {
      num: '04',
      title: 'Attend & Submit Hours',
      desc: 'Complete shift activities and log claimed hours with coordinator.',
      icon: CheckCircle2,
    },
    {
      num: '05',
      title: 'Verified Record & Certificate',
      desc: 'Coordinator approves hours, unlocking official certificates & digital ID.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="how-it-works" className="section-padding" style={{ background: 'var(--bg-primary)', position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <span className="subheading">END-TO-END PRODUCT PROMISE</span>
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
            How SocialVolunteers.in <span style={{ color: 'var(--brand-orange)', fontStyle: 'italic' }}>Works</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem' }}>
            From initial cause discovery to final verified service certificates, experience a seamless platform journey.
          </p>
        </div>

        {/* Steps Journey Container */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            position: 'relative',
          }}
        >
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '2rem 1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  background: '#FFFFFF',
                  borderTop: '4px solid var(--brand-orange)',
                  position: 'relative',
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand-orange)', marginBottom: '0.75rem' }}>
                  STEP {s.num}
                </div>

                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'var(--brand-orange-soft)',
                    color: 'var(--brand-orange)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <Icon size={22} />
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
