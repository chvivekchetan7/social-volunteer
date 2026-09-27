import React, { useState, useEffect } from 'react';
import { HeartHandshake, Menu, X, ArrowRight, UserCheck, User, LogOut } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenVolunteerModal, onOpenWorkspaceModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Opportunities', href: '#opportunities' },
    { label: 'Directory', href: '#directory' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Blog', href: '#stories' },
    { label: 'Plans', href: '#plans' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '76px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid rgba(24, 24, 22, 0.08)',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.04)' : 'none',
        transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* LEFT: SocialVolunteers.in logo */}
        <a 
          href="#hero" 
          onClick={() => setActiveTab('Home')} 
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', flexShrink: 0 }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--brand-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: 'var(--shadow-orange)',
            }}
          >
            <HeartHandshake size={22} />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: '1.25rem',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            Social<span style={{ color: 'var(--brand-orange)' }}>Volunteers.in</span>
          </span>
        </a>

        {/* CENTER: Simple Clean Links */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {navLinks.map((link, idx) => {
            const isActive = activeTab === link.label;
            return (
              <a
                key={idx}
                href={link.href}
                className="nav-link"
                onClick={() => setActiveTab(link.label)}
                style={{
                  textDecoration: 'none',
                  color: isActive ? 'var(--brand-orange)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'rgba(232, 90, 42, 0.08)' : 'transparent',
                  padding: '0.5rem 0.9rem',
                  borderRadius: '20px',
                  fontWeight: isActive ? 700 : 600,
                  fontSize: '0.9rem',
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* RIGHT: Dynamic Auth Actions */}
        <div className="desktop-nav-actions" style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexShrink: 0 }}>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={() => navigateTo('/profile')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 1rem',
                  borderRadius: '20px',
                  border: '1px solid var(--brand-orange)',
                  backgroundColor: '#FFF2EC',
                  color: 'var(--brand-orange)',
                  fontWeight: 750,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                }}
              >
                <User size={16} />
                <span>{user.name ? user.name.split(' ')[0] : 'Profile'}</span>
              </button>

              <button
                onClick={() => {
                  logout();
                  navigateTo('/login');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6B7280',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  padding: '0.45rem',
                }}
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <>
              <MagneticButton maxTranslate={6}>
                <button
                  onClick={() => navigateTo('/login')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    padding: '0.5rem 0.75rem',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--brand-orange)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--text-primary)')}
                >
                  Login
                </button>
              </MagneticButton>

              <MagneticButton maxTranslate={8}>
                <button
                  onClick={() => navigateTo('/signup')}
                  className="btn-orange"
                  style={{
                    padding: '0.65rem 1.4rem',
                    fontSize: '0.9rem',
                    borderRadius: '24px',
                    fontWeight: 700,
                    boxShadow: '0 4px 14px rgba(232, 90, 42, 0.25)',
                  }}
                >
                  <span>Sign Up</span>
                  <ArrowRight size={16} />
                </button>
              </MagneticButton>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            padding: '0.5rem',
            display: 'none',
          }}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '76px',
            left: 0,
            right: 0,
            background: '#FFFFFF',
            borderBottom: '1px solid rgba(24, 24, 22, 0.1)',
            padding: '1.75rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => {
                setActiveTab(link.label);
                setMobileMenuOpen(false);
              }}
              style={{
                textDecoration: 'none',
                color: activeTab === link.label ? 'var(--brand-orange)' : 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '1.05rem',
              }}
            >
              {link.label}
            </a>
          ))}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem', pt: '1rem', borderTop: '1px solid #F0F0F0' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenVolunteerModal) {
                  onOpenVolunteerModal();
                } else {
                  navigateTo('/login');
                }
              }}
              style={{
                background: 'none',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                padding: '0.75rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
              }}
            >
              Login
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenVolunteerModal) {
                  onOpenVolunteerModal();
                } else {
                  navigateTo('/signup');
                }
              }}
              className="btn-orange"
              style={{ width: '100%', borderRadius: '12px', padding: '0.75rem' }}
            >
              <span>Sign Up</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .desktop-nav-actions { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
