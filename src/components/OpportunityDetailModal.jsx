import React, { useState } from 'react';
import { X, MapPin, Calendar, Clock, Users, Building2, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OpportunityDetailModal({ opportunity, onClose, onApplySuccess }) {
  const [applied, setApplied] = useState(false);
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerEmail, setVolunteerEmail] = useState('');

  if (!opportunity) return null;

  const handleApply = (e) => {
    e.preventDefault();
    setApplied(true);
    try {
      confetti({
        particleCount: 90,
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
          maxWidth: '720px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          position: 'relative',
          background: '#FFFFFF',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
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

        {!applied ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <span className="badge-tag">{opportunity.cause}</span>
              <span className="status-pill status-approved">
                <ShieldCheck size={14} /> Hours Verified Eligible
              </span>
            </div>

            <h2 className="heading-md" style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              {opportunity.title}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-orange)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              <Building2 size={18} />
              <span>Organised by {opportunity.organisation}</span>
            </div>

            {/* Quick Specs Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                background: 'var(--bg-secondary)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.75rem',
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <MapPin size={14} /> LOCATION
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  {opportunity.location} ({opportunity.type})
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Calendar size={14} /> SHIFT DATE
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  {opportunity.date}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={14} /> COMMITMENT
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  {opportunity.commitment} ({opportunity.hours} hrs)
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Users size={14} /> AVAILABILITY
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--brand-orange)', marginTop: '0.2rem' }}>
                  {opportunity.placesLeft} Places Remaining
                </div>
              </div>
            </div>

            {/* Description & Requirements */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Role Description & Task Details
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                {opportunity.description}
              </p>

              <div style={{ background: 'var(--brand-orange-soft)', padding: '1rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--brand-orange)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-orange)', marginBottom: '0.2rem' }}>
                  COORDINATOR & MEETING INSTRUCTIONS:
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                  Coordinator: {opportunity.coordinator} • Meeting Point: {opportunity.meetingPoint}
                </div>
              </div>
            </div>

            {/* Application Form */}
            <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid rgba(24, 24, 22, 0.1)', paddingTop: '1.5rem' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 750, color: 'var(--text-primary)' }}>
                Reserve Your Volunteer Slot
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem' }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={volunteerName}
                    onChange={(e) => setVolunteerName(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(24, 24, 22, 0.15)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem' }}>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={volunteerEmail}
                    onChange={(e) => setVolunteerEmail(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(24, 24, 22, 0.15)', outline: 'none' }}
                  />
                </div>
              </div>

              <button type="submit" className="btn-orange" style={{ width: '100%', marginTop: '0.5rem' }}>
                <span>Confirm Shift Reservation ({opportunity.hours} Verified Hrs)</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
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
              <CheckCircle2 size={42} />
            </div>

            <span className="status-pill status-approved" style={{ marginBottom: '1rem' }}>
              APPLICATION ACCEPTED & SCHEDULED
            </span>

            <h3 className="heading-md" style={{ color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              You're Scheduled for {opportunity.title}!
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Thank you <strong>{volunteerName || 'Volunteer'}</strong>! Your shift reservation has been recorded. Coordinator <strong>{opportunity.coordinator}</strong> will contact you via WhatsApp & Email with final location details.
            </p>

            <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'left', marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-orange)', marginBottom: '0.4rem' }}>
                YOUR RESERVATION SUMMARY:
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                • <strong>Role:</strong> {opportunity.title}<br />
                • <strong>Date:</strong> {opportunity.date}<br />
                • <strong>Eligible Verified Hours:</strong> {opportunity.hours} hours upon attendance approval<br />
                • <strong>Status:</strong> Scheduled (Pending Coordinator Check-in)
              </div>
            </div>

            <button onClick={onClose} className="btn-orange" style={{ width: '100%' }}>
              Close & View My Opportunities
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
