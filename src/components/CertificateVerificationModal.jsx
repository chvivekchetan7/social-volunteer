import React, { useState } from 'react';
import { X, ShieldCheck, QrCode, CheckCircle2, AlertTriangle, Download, Copy, Check } from 'lucide-react';

export default function CertificateVerificationModal({ isOpen, onClose }) {
  const [certId, setCertId] = useState('CERT-SV-2026-884920');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyHash = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(22, 23, 22, 0.85)',
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
          maxWidth: '680px',
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

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--status-approved-bg)',
              color: 'var(--accent-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
            }}
          >
            <ShieldCheck size={38} />
          </div>

          <span className="status-pill status-approved" style={{ marginBottom: '0.5rem' }}>
            VERIFIED VALID & ACTIVE RECORD
          </span>

          <h3 className="heading-md" style={{ color: 'var(--text-primary)', marginTop: '0.4rem' }}>
            Official Certificate of Volunteering
          </h3>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Certificate ID: {certId}
          </div>
        </div>

        {/* Certificate Card Preview */}
        <div
          style={{
            border: '2px solid var(--accent-emerald)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem',
            background: 'linear-gradient(180deg, #FFFFFF 0%, var(--bg-primary) 100%)',
            marginBottom: '1.5rem',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-orange)', letterSpacing: '0.1em' }}>
                SOCIALVOLUNTEERS.IN PLATFORM VERIFICATION
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                Service Record Endorsement
              </h4>
            </div>
            <QrCode size={48} style={{ color: 'var(--text-primary)' }} />
          </div>

          <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            This certifies that <strong>Priya Sharma</strong> has successfully completed <strong>142 Approved Verified Service Hours</strong> across Shiksha Education Kiosks and Swasthya Health Camps under verified coordinator supervision.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', background: '#FFFFFF', padding: '0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem' }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>ISSUED TO:</div>
              <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>Priya Sharma</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>VERIFIED HOURS:</div>
              <div style={{ fontWeight: 800, color: 'var(--accent-emerald)' }}>142.0 Hours</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>REVOCATION STATE:</div>
              <div style={{ fontWeight: 800, color: 'var(--accent-emerald)' }}>Active / Valid</div>
            </div>
          </div>
        </div>

        {/* Audit Hash & Download Action */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={copyHash}
            className="btn-secondary"
            style={{ flex: 1, padding: '0.85rem', fontSize: '0.88rem' }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Verification Link Copied' : 'Copy Verification Link'}</span>
          </button>

          <button
            onClick={() => alert('Downloading official PDF Certificate...')}
            className="btn-orange"
            style={{ flex: 1, padding: '0.85rem', fontSize: '0.88rem' }}
          >
            <Download size={16} />
            <span>Download Official PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
}
