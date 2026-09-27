import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 6000);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
          <span className="subheading">GET IN TOUCH</span>
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
            Contact <span style={{ color: 'var(--accent-emerald)', fontStyle: 'italic' }}>SocialVolunteers.in</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem' }}>
            Have questions about volunteering or partnering with us? Reach out to our community team.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Contact Details Card */}
          <div
            className="glass-panel"
            style={{
              padding: '2.5rem',
              borderRadius: 'var(--radius-lg)',
              background: '#FFFFFF',
            }}
          >
            <h3 style={{ fontSize: '1.4rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
              Contact Information
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'var(--accent-emerald-soft)',
                    color: 'var(--accent-emerald)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>OUR ADDRESS</div>
                  <div style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600, marginTop: '0.2rem' }}>
                    123 Volunteer Street, India
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'var(--accent-emerald-soft)',
                    color: 'var(--accent-emerald)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>EMAIL US</div>
                  <a
                    href="mailto:info@socialvolunteers.in"
                    style={{ fontSize: '1rem', color: 'var(--accent-emerald)', fontWeight: 650, textDecoration: 'none', display: 'block', marginTop: '0.2rem' }}
                  >
                    info@socialvolunteers.in
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'var(--accent-emerald-soft)',
                    color: 'var(--accent-emerald)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Phone size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>CALL US</div>
                  <div style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600, marginTop: '0.2rem' }}>
                    +91 98765 43210
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enquiry Form */}
          <div
            className="glass-panel"
            style={{
              padding: '2.5rem',
              borderRadius: 'var(--radius-lg)',
              background: '#FFFFFF',
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle2 size={48} style={{ color: 'var(--accent-emerald)', margin: '0 auto 1rem' }} />
                <h3 className="heading-md" style={{ marginBottom: '0.5rem' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
                  Thank you for contacting SocialVolunteers.in. Our team will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Send an Enquiry
                </h3>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(24, 24, 22, 0.15)',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="info@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(24, 24, 22, 0.15)',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(24, 24, 22, 0.15)',
                      fontSize: '0.95rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(24, 24, 22, 0.15)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                  <span>Send Message</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 850px) {
          #contact div[style*="grid-template-columns: 1fr 1.2fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
