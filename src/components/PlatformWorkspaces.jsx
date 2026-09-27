import React, { useState } from 'react';
import { User, Building2, Smartphone, ShieldCheck, Calendar, Clock, MapPin, Check, X, ArrowRight, Award, QrCode, Search, AlertCircle, FileText } from 'lucide-react';

export default function PlatformWorkspaces() {
  const [activeTab, setActiveTab] = useState('volunteer');

  return (
    <section id="workspaces" className="section-padding" style={{ background: 'var(--bg-primary)', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
          <span className="subheading">PLATFORM ROLE WORKSPACES</span>
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
            Tailored Experiences for <span style={{ color: 'var(--brand-orange)', fontStyle: 'italic' }}>Every Participant</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem' }}>
            SocialVolunteers.in provides dedicated dashboards for Volunteers, Partner Organisations, On-Field Coordinators, and Platform Administrators.
          </p>
        </div>

        {/* Workspace Persona Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.85rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
          }}
        >
          {[
            { id: 'volunteer', label: 'Volunteer Dashboard', icon: User },
            { id: 'organisation', label: 'Organisation Workspace', icon: Building2 },
            { id: 'coordinator', label: 'Field Coordinator Workspace', icon: Smartphone },
            { id: 'admin', label: 'Platform Admin Workspace', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.85rem 1.4rem',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 650,
                  fontSize: '0.92rem',
                  border: '1px solid',
                  borderColor: isActive ? 'var(--brand-orange)' : 'rgba(24, 24, 22, 0.12)',
                  backgroundColor: isActive ? 'var(--brand-orange)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? 'var(--shadow-orange)' : 'var(--shadow-sm)',
                }}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* WORKSPACE PREVIEW 1: VOLUNTEER DASHBOARD */}
        {activeTab === 'volunteer' && (
          <div
            className="glass-panel"
            style={{
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              background: '#FFFFFF',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="badge-tag">VOLUNTEER PERSONA</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 750, color: 'var(--text-primary)', marginTop: '0.3rem' }}>
                  Welcome back, Priya Sharma!
                </h3>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#opportunities" className="btn-orange" style={{ padding: '0.7rem 1.3rem', fontSize: '0.85rem' }}>
                  Find My Next Opportunity
                </a>
              </div>
            </div>

            {/* Next Shift Callout Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, var(--brand-orange-soft) 0%, #FFFFFF 100%)',
                border: '1.5px solid var(--brand-orange)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <span className="status-pill status-approved" style={{ marginBottom: '0.4rem' }}>
                  <Calendar size={13} /> NEXT UPCOMING SHIFT
                </span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  Weekend Mathematics Tutor — Shiksha Learning Kiosk
                </h4>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <span><MapPin size={14} style={{ inlineSize: 'auto' }} /> Indiranagar Community Kiosk</span>
                  <span><Clock size={14} /> Sat, Oct 4 • 10:00 AM (4 hrs)</span>
                </div>
              </div>

              <button className="btn-emerald" style={{ padding: '0.65rem 1.2rem', fontSize: '0.85rem' }}>
                Get Directions & Check-in QR
              </button>
            </div>

            {/* Stats Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>TOTAL VERIFIED HOURS</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>142.0 hrs</div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>PENDING REVIEW</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--brand-orange)', marginTop: '0.2rem' }}>4.0 hrs</div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>COMPLETED SHIFTS</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>28 Shifts</div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>DIGITAL BADGES</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-gold)', marginTop: '0.2rem' }}>5 Badges</div>
              </div>
            </div>
          </div>
        )}

        {/* WORKSPACE PREVIEW 2: ORGANISATION WORKSPACE */}
        {activeTab === 'organisation' && (
          <div
            className="glass-panel"
            style={{
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              background: '#FFFFFF',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="badge-tag">PARTNER ORGANISATION</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 750, color: 'var(--text-primary)', marginTop: '0.3rem' }}>
                  Shiksha Learning Hubs Admin Workspace
                </h3>
              </div>
              <button onClick={() => alert('Publishing Opportunity Form Modal')} className="btn-orange" style={{ padding: '0.7rem 1.3rem', fontSize: '0.85rem' }}>
                + Publish New Opportunity
              </button>
            </div>

            {/* Pending Applications Review Queue */}
            <h4 style={{ fontSize: '1.1rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Pending Volunteer Applications Queue (3 Pending)
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { name: 'Kavya Nair', role: 'Weekend Tutor', date: 'Applied Oct 1', skills: 'Math & Science', status: 'Pending' },
                { name: 'Aarav Patel', role: 'Digital Kiosk Maintainer', date: 'Applied Oct 1', skills: 'Hardware & IT', status: 'Pending' },
                { name: 'Rohan Sen', role: 'Content Designer', date: 'Applied Sep 30', skills: 'Graphic Design', status: 'Pending' },
              ].map((app, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.25rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 750, fontSize: '0.98rem', color: 'var(--text-primary)' }}>{app.name}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Applying for <strong>{app.role}</strong> • Skills: {app.skills}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <button onClick={() => alert(`Accepted ${app.name}`)} className="btn-emerald" style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}>
                      <Check size={14} /> Accept
                    </button>
                    <button onClick={() => alert(`Decline modal for ${app.name}`)} className="btn-secondary" style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}>
                      <X size={14} /> Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WORKSPACE PREVIEW 3: FIELD COORDINATOR WORKSPACE */}
        {activeTab === 'coordinator' && (
          <div
            className="glass-panel"
            style={{
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              background: '#FFFFFF',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="badge-tag">MOBILE FIELD COORDINATOR</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 750, color: 'var(--text-primary)', marginTop: '0.3rem' }}>
                  On-Ground Roster & 1-Tap Hour Approvals
                </h3>
              </div>
              <span className="status-pill status-approved">
                <Smartphone size={14} /> Field Mobile Mode Active
              </span>
            </div>

            {/* Field Roster */}
            <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 750, color: 'var(--brand-orange)', marginBottom: '1rem' }}>
                CURRENT SHIFT ROSTER: Indiranagar Community Kiosk (Oct 4 Shift)
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { name: 'Priya Sharma', checkIn: 'Checked-in 09:58 AM', hours: '4.0 hrs claimed' },
                  { name: 'Ananya Verma', checkIn: 'Checked-in 10:02 AM', hours: '4.0 hrs claimed' },
                ].map((row, idx) => (
                  <div key={idx} style={{ background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <div style={{ fontWeight: 750, color: 'var(--text-primary)' }}>{row.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)' }}>{row.checkIn} • {row.hours}</div>
                    </div>
                    <button onClick={() => alert(`1-Tap Approved hours for ${row.name}`)} className="btn-emerald" style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}>
                      <Check size={14} /> Approve 4.0 Hrs
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* WORKSPACE PREVIEW 4: PLATFORM ADMIN WORKSPACE */}
        {activeTab === 'admin' && (
          <div
            className="glass-panel"
            style={{
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              background: '#FFFFFF',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="badge-tag">PLATFORM GOVERNANCE</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 750, color: 'var(--text-primary)', marginTop: '0.3rem' }}>
                  Moderation & Audit Search Console
                </h3>
              </div>
              <span className="status-pill status-approved">
                <ShieldCheck size={14} /> Admin Privileges Active
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>PENDING NGO VERIFICATIONS</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--brand-orange)', marginTop: '0.2rem' }}>2 Pending</div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>OPPORTUNITY MODERATION</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>0 Flagged</div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>AUDIT TRAIL LOGS</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>47,293 Entries</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
