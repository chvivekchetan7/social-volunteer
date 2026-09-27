import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles, Building2, User, ShieldCheck, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VolunteerModal({ isOpen, onClose }) {
  const [roleType, setRoleType] = useState('Volunteer'); // 'Volunteer' or 'Organisation'
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    occupation: 'Student',
    orgName: '',
    orgType: 'Registered NGO',
    interests: [],
    availability: '4-8 hours/week',
  });

  if (!isOpen) return null;

  const handleInterestToggle = (cause) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(cause);
      if (exists) {
        return { ...prev, interests: prev.interests.filter((i) => i !== cause) };
      } else {
        return { ...prev, interests: [...prev.interests, cause] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(4);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E85A2A', '#FF8054', '#111827', '#FFFFFF'],
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(22, 23, 22, 0.82)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: '640px',
          width: '100%',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          position: 'relative',
          background: '#FFFFFF',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--bg-secondary)',
            border: 'none',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <X size={20} />
        </button>

        {step < 4 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="subheading">PLATFORM ONBOARDING</span>
            <h3 className="heading-md" style={{ color: 'var(--text-primary)' }}>
              Join SocialVolunteers.in
            </h3>

            {/* Role Selection Toggle */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', marginBottom: '1.25rem' }}>
              <button
                type="button"
                onClick={() => setRoleType('Volunteer')}
                style={{
                  flex: 1,
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1.5px solid',
                  borderColor: roleType === 'Volunteer' ? 'var(--brand-orange)' : 'rgba(24, 24, 22, 0.12)',
                  background: roleType === 'Volunteer' ? 'var(--brand-orange-soft)' : '#FFFFFF',
                  color: roleType === 'Volunteer' ? 'var(--brand-orange)' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                }}
              >
                <User size={16} /> Volunteer
              </button>

              <button
                type="button"
                onClick={() => setRoleType('Organisation')}
                style={{
                  flex: 1,
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1.5px solid',
                  borderColor: roleType === 'Organisation' ? 'var(--brand-orange)' : 'rgba(24, 24, 22, 0.12)',
                  background: roleType === 'Organisation' ? 'var(--brand-orange-soft)' : '#FFFFFF',
                  color: roleType === 'Organisation' ? 'var(--brand-orange)' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                }}
              >
                <Building2 size={16} /> Partner NGO
              </button>
            </div>
          </div>
        )}

        {/* STEP 1: Primary Information */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {roleType === 'Volunteer' ? (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.3rem' }}>Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Priya Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(24, 24, 22, 0.15)', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.3rem' }}>Email Address *</label>
                    <input
                      type="email"
                      placeholder="info@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(24, 24, 22, 0.15)', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.3rem' }}>Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(24, 24, 22, 0.15)', outline: 'none' }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.3rem' }}>Organisation Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Shiksha Learning Hubs"
                    value={formData.orgName}
                    onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                    style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(24, 24, 22, 0.15)', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.3rem' }}>Contact Person Email *</label>
                    <input
                      type="email"
                      placeholder="admin@ngo.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(24, 24, 22, 0.15)', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.3rem' }}>City / State *</label>
                    <input
                      type="text"
                      placeholder="e.g. Bengaluru, KA"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(24, 24, 22, 0.15)', outline: 'none' }}
                    />
                  </div>
                </div>
              </>
            )}

            <button
              onClick={() => setStep(2)}
              disabled={!formData.email}
              className="btn-orange"
              style={{ marginTop: '0.5rem', width: '100%' }}
            >
              <span>Continue Onboarding</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* STEP 2: Cause Interests */}
        {step === 2 && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              Select primary cause sectors for your account:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {['Education & Digital Literacy', 'Healthcare & Diagnostics', 'Environmental Conservation', 'Livelihoods & Women SHGs', 'Disaster & Emergency Relief'].map((cause) => {
                const isSelected = formData.interests.includes(cause);
                return (
                  <div
                    key={cause}
                    onClick={() => handleInterestToggle(cause)}
                    style={{
                      padding: '0.8rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid',
                      borderColor: isSelected ? 'var(--brand-orange)' : 'rgba(24, 24, 22, 0.12)',
                      background: isSelected ? 'var(--brand-orange-soft)' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{cause}</span>
                    <CheckCircle2 size={18} style={{ color: isSelected ? 'var(--brand-orange)' : '#C8C3B8' }} />
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button type="button" onClick={() => setStep(1)} className="btn-secondary" style={{ width: '40%' }}>Back</button>
              <button type="submit" className="btn-orange" style={{ width: '60%' }}>
                <span>Complete Registration</span>
                <Sparkles size={18} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Confirmation Screen */}
        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'var(--brand-orange-soft)',
                color: 'var(--brand-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}
            >
              <CheckCircle2 size={40} />
            </div>

            <h3 className="heading-md" style={{ marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              Welcome to SocialVolunteers.in!
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Your {roleType} account registration has been successfully created. You can now browse opportunities, check-in to shifts, and access your verified service hours dashboard.
            </p>

            <button onClick={onClose} className="btn-orange" style={{ width: '100%' }}>
              Go to Workspace Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
