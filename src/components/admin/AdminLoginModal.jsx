import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Lock, Mail, ShieldCheck, X, ArrowRight } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose }) {
  const { setIsAdminLoggedIn, setAdminRole } = useCMS();
  const [email, setEmail] = useState('admin@socialvolunteers.in');
  const [password, setPassword] = useState('••••••••');
  const [selectedRole, setSelectedRole] = useState('Super Admin');
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return alert('Please fill email and password');
    
    setAdminRole(selectedRole);
    setIsAdminLoggedIn(true);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 250,
        backgroundColor: 'rgba(17, 24, 39, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          maxWidth: '440px',
          width: '100%',
          padding: '2.5rem 2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          border: '1px solid #E5E7EB',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#6B7280',
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'var(--brand-orange-soft)',
              color: 'var(--brand-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
            }}
          >
            <ShieldCheck size={26} />
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827' }}>
            SocialVolunteers CMS Login
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#6B7280', marginTop: '0.25rem' }}>
            Secure Portal Authentication & Content Control
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>
              Administrator Email
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '10px', padding: '0.65rem 0.85rem' }}>
              <Mail size={16} style={{ color: '#9CA3AF' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', color: '#111827' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>
              Password
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '10px', padding: '0.65rem 0.85rem' }}>
              <Lock size={16} style={{ color: '#9CA3AF' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', color: '#111827' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>
              Select Role Context
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '0.88rem', fontWeight: 650, color: '#111827', outline: 'none' }}
            >
              <option value="Super Admin">Super Admin (Full Access)</option>
              <option value="Content Manager">Content Manager (Hero & Causes)</option>
              <option value="Volunteer Manager">Volunteer Manager (Hours & Shifts)</option>
              <option value="Organization Manager">Organization Manager (NGOs & Partners)</option>
              <option value="Analyst">Analyst (Read-Only Metrics)</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', color: '#4B5563', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--brand-orange)' }}
              />
              <span>Remember session</span>
            </label>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to admin registered email.'); }} style={{ color: 'var(--brand-orange)', textDecoration: 'none', fontWeight: 700 }}>
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="btn-orange"
            style={{
              width: '100%',
              padding: '0.85rem',
              fontSize: '0.95rem',
              borderRadius: '24px',
              marginTop: '0.5rem',
            }}
          >
            <span>Authenticate Admin Portal</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #F3F4F6', textAlign: 'center', fontSize: '0.78rem', color: '#9CA3AF' }}>
          Protected CMS Environment • 256-bit Encrypted Session
        </div>
      </div>
    </div>
  );
}
