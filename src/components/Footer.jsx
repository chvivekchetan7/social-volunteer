import React, { useState } from 'react';
import { HeartHandshake, Mail, Phone, MapPin, Send, ArrowUp, Facebook, Twitter, Linkedin, Instagram, Check } from 'lucide-react';

export default function Footer({ onOpenVolunteerModal }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#161716', color: '#FBF9F5', paddingTop: '6rem', paddingBottom: '3rem', position: 'relative' }}>
      <div className="container">
        
        {/* Top Newsletter CTA Box */}
        <div
          className="glass-panel-dark"
          style={{
            padding: '3.5rem 3rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '5rem',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-gold)', letterSpacing: '0.15em' }}>
              COMMUNITY UPDATES
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#FFFFFF', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
              Stay Updated with Latest Opportunities
            </h3>
            <p style={{ color: 'rgba(251, 249, 245, 0.75)', fontSize: '1.02rem', lineHeight: 1.6 }}>
              Receive updates on new volunteer roles, partner initiatives, and impact stories from across India.
            </p>
          </div>

          <div>
            {subscribed ? (
              <div
                style={{
                  background: 'rgba(13, 92, 70, 0.3)',
                  border: '1px solid var(--accent-emerald-light)',
                  padding: '1.25rem 1.5rem',
                  borderRadius: 'var(--radius-md)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <Check size={24} style={{ color: 'var(--accent-emerald-light)' }} />
                <div>
                  <div style={{ fontWeight: 700 }}>Thank you for subscribing!</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>We will keep you posted on new opportunities.</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.9rem 1.25rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#FFFFFF',
                    fontSize: '0.95rem',
                    outline: 'none',
                    minWidth: '220px',
                  }}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '0.9rem 1.75rem', whiteSpace: 'nowrap' }}
                >
                  <span>Subscribe</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links & Contact Info Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1.3fr',
            gap: '3rem',
            paddingBottom: '4rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'var(--brand-orange)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                <HeartHandshake size={22} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  color: '#FFFFFF',
                }}
              >
                Social<span style={{ color: 'var(--brand-orange)' }}>Volunteers.in</span>
              </span>
            </div>

            <p style={{ color: 'rgba(251, 249, 245, 0.7)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.75rem' }}>
              Connecting passionate volunteers with meaningful opportunities to create positive social impact across communities.
            </p>

            {/* Social Links from reference site */}
            <div style={{ display: 'flex', gap: '0.85rem' }}>
              {[
                { icon: Facebook, label: 'Facebook', href: '#' },
                { icon: Twitter, label: 'Twitter', href: '#' },
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                { icon: Instagram, label: 'Instagram', href: '#' },
              ].map((s, idx) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.href}
                    aria-label={s.label}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                      transition: 'background 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--brand-orange)';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.transform = 'translateY(0px)';
                    }}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>
              NAVIGATION
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Home', href: '#hero' },
                { label: 'About Us', href: '#about' },
                { label: 'Opportunities', href: '#our-work' },
                { label: 'Volunteer Directory', href: '#directory' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'Community Blog', href: '#stories' },
                { label: 'Plans & Pricing', href: '#plans' },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    style={{
                      color: 'rgba(251, 249, 245, 0.7)',
                      textDecoration: 'none',
                      fontSize: '0.92rem',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--brand-orange)')}
                    onMouseLeave={(e) => (e.target.style.color = 'rgba(251, 249, 245, 0.7)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>
              SECTORS
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                'Education & Tutoring',
                'Healthcare & Camps',
                'Environmental Drives',
                'Community Service',
                'Digital Literacy Kiosks',
                'Verified ID Verification',
              ].map((c, idx) => (
                <li key={idx} style={{ color: 'rgba(251, 249, 245, 0.7)', fontSize: '0.92rem' }}>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>
              CONTACT DETAILS
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: '0.9rem', color: 'rgba(251, 249, 245, 0.75)', lineHeight: 1.5 }}>
                  123 Volunteer Street, India
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                <a
                  href="mailto:info@socialvolunteers.in"
                  style={{ fontSize: '0.9rem', color: 'rgba(251, 249, 245, 0.75)', textDecoration: 'none' }}
                >
                  info@socialvolunteers.in
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'rgba(251, 249, 245, 0.75)' }}>
                  +91 98765 43210
                </span>
              </div>

              <button
                onClick={() => {
                  if (onOpenVolunteerModal) {
                    onOpenVolunteerModal();
                  } else {
                    window.history.pushState({}, '', '/signup');
                    window.dispatchEvent(new Event('popstate'));
                  }
                }}
                className="btn-primary"
                style={{ marginTop: '1rem', width: '100%' }}
              >
                Become a Volunteer
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '2.5rem',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'rgba(251, 249, 245, 0.5)',
          }}
        >
          <div>
            © {new Date().getFullYear()} SocialVolunteers.in. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              color: '#FFFFFF',
              padding: '0.5rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: 600,
            }}
          >
            <span>Back to Top</span>
            <ArrowUp size={16} />
          </button>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          footer .glass-panel-dark {
            grid-template-columns: 1fr !important;
            padding: 2rem !important;
          }
          footer div[style*="grid-template-columns: 1.5fr"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 550px) {
          footer div[style*="grid-template-columns: 1.5fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
