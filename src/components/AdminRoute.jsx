import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useCMS } from '../context/CMSContext';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';

export default function AdminRoute({ children }) {
  const { user, isAuthenticated } = useAuth();
  const { isAdminLoggedIn } = useCMS();

  // Permitted if CMS passcode 3155 is active OR user has ADMIN role
  const isAuthorized = isAdminLoggedIn || (isAuthenticated && user?.role === 'ADMIN');

  if (!isAuthorized) {
    return (
      <div
        style={{
          minHeight: '100vh',
          width: '100%',
          backgroundColor: '#F9FAFB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          fontFamily: 'var(--font-sans)',
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            maxWidth: '460px',
            width: '100%',
            padding: '3rem 2.25rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
            border: '1px solid #E5E7EB',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              backgroundColor: '#FEE2E2',
              color: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.15)',
            }}
          >
            <ShieldAlert size={30} />
          </div>

          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>
            Access Denied
          </h1>

          <p style={{ fontSize: '0.92rem', color: '#6B7280', lineHeight: 1.5, marginBottom: '2rem' }}>
            The <strong>/admin</strong> CMS section is restricted strictly to platform administrators. Your current account does not have administrator authorization.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a
              href="/profile"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/profile');
                window.dispatchEvent(new Event('popstate'));
              }}
              className="btn-orange"
              style={{ padding: '0.8rem', borderRadius: '24px', fontSize: '0.92rem', textDecoration: 'none' }}
            >
              <span>Go to Volunteer Profile</span>
            </a>

            <a
              href="/admin"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/admin');
                window.dispatchEvent(new Event('popstate'));
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                color: '#6B7280',
                fontWeight: 700,
                fontSize: '0.85rem',
                textDecoration: 'none',
                marginTop: '0.5rem',
              }}
            >
              <Lock size={14} />
              <span>Admin Passcode Login</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
