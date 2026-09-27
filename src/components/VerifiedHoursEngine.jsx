import React, { useState } from 'react';
import CertificateVerificationModal from './CertificateVerificationModal';
import { ShieldCheck, Clock, CheckCircle2, AlertCircle, FileText, QrCode, Lock, ArrowRight } from 'lucide-react';

export default function VerifiedHoursEngine() {
  const [certModalOpen, setCertModalOpen] = useState(false);

  // Sample Audit Entries showing Approved vs Pending vs Claimed distinction
  const auditEntries = [
    {
      date: 'Sep 20, 2026',
      project: 'Pan-India Solar Education Kiosks',
      role: 'Weekend Mathematics Tutor',
      claimed: '4.0 hrs',
      approved: '4.0 hrs',
      coordinator: 'Priya Sharma (Verified)',
      status: 'Approved',
    },
    {
      date: 'Sep 14, 2026',
      project: 'Swasthya Mobile Health Screening',
      role: 'Diagnostic Registration Assistant',
      claimed: '6.0 hrs',
      approved: '6.0 hrs',
      coordinator: 'Rajesh Kumar (Verified)',
      status: 'Approved',
    },
    {
      date: 'Sep 22, 2026',
      project: 'Miyawaki Urban Tree Plantation',
      role: 'Native Sapling Lead',
      claimed: '4.0 hrs',
      approved: 'Pending',
      coordinator: 'Vikram Joshi (Reviewing)',
      status: 'Pending',
    },
  ];

  return (
    <section id="verified-hours" className="section-padding" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <span className="subheading">CENTRAL PRODUCT FEATURE</span>
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
            Verified Service Hours & <span style={{ color: 'var(--brand-orange)', fontStyle: 'italic' }}>Audit Engine</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem' }}>
            Only hours reviewed and approved by verified organisation coordinators count toward official service records. Claimed hours remain pending until verified.
          </p>
        </div>

        {/* 4-Step Verification Process Journey */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            marginBottom: '4rem',
          }}
        >
          {[
            { step: '01', title: 'Shift Check-in', desc: 'Volunteer attends and completes shift with coordinator.' },
            { step: '02', title: 'Hours Submission', desc: 'Claimed hours and activity details logged.' },
            { step: '03', title: 'Coordinator Review', desc: 'Organisation coordinator reviews and approves hours.' },
            { step: '04', title: 'Verified Certificate', desc: 'Approved hours unlock digital ID badges & certificates.' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '1.75rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                background: '#FFFFFF',
                borderTop: '3px solid var(--brand-orange)',
              }}
            >
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand-orange)', marginBottom: '0.4rem' }}>
                STEP {item.step}
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                {item.title}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Live Audit Log Demonstration Card */}
        <div
          className="glass-panel"
          style={{
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem',
            background: '#FFFFFF',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="status-pill status-approved" style={{ marginBottom: '0.4rem' }}>
                <ShieldCheck size={14} /> LIVE AUDIT TRAIL ENGINE
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 750, color: 'var(--text-primary)' }}>
                Sample Service Log & Hour State Breakdown
              </h3>
            </div>

            <button
              onClick={() => setCertModalOpen(true)}
              className="btn-emerald"
              style={{ padding: '0.75rem 1.4rem', fontSize: '0.88rem' }}
            >
              <QrCode size={16} />
              <span>Test Certificate Verification Portal</span>
            </button>
          </div>

          {/* Audit Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(24, 24, 22, 0.08)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.85rem 1rem' }}>SHIFT DATE</th>
                  <th style={{ padding: '0.85rem 1rem' }}>PROJECT / ROLE</th>
                  <th style={{ padding: '0.85rem 1rem' }}>CLAIMED</th>
                  <th style={{ padding: '0.85rem 1rem' }}>APPROVED</th>
                  <th style={{ padding: '0.85rem 1rem' }}>COORDINATOR STAMP</th>
                  <th style={{ padding: '0.85rem 1rem' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {auditEntries.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(24, 24, 22, 0.06)' }}>
                    <td style={{ padding: '1rem', fontWeight: 650, color: 'var(--text-primary)' }}>{row.date}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 750, color: 'var(--text-primary)' }}>{row.role}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{row.project}</div>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{row.claimed}</td>
                    <td style={{ padding: '1rem', fontWeight: 800, color: row.status === 'Approved' ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                      {row.approved}
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {row.coordinator}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span className={`status-pill ${row.status === 'Approved' ? 'status-approved' : 'status-pending'}`}>
                        {row.status === 'Approved' ? <CheckCircle2 size={13} /> : <Clock size={13} />}
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Certificate Portal Modal */}
      <CertificateVerificationModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
      />
    </section>
  );
}
