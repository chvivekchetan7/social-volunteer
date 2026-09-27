import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, ShieldCheck, Clock, Award, Calendar, Edit2, LogOut, CheckCircle2, Sparkles, FileText, ArrowLeft } from 'lucide-react';

export default function UserProfilePage() {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    skills: user?.skills || '',
    interests: user?.interests || '',
  });
  const [toastMsg, setToastMsg] = useState('');

  if (!user) {
    return (
      <div style={{ minHeight: '80vh', marginTop: '76px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827' }}>Session Expired</h2>
          <p style={{ color: '#6B7280', margin: '0.5rem 0 1.5rem' }}>Please log in to access your profile.</p>
          <a href="/login" className="btn-orange" style={{ textDecoration: 'none', padding: '0.65rem 1.4rem', borderRadius: '20px' }}>
            <span>Go to Login</span>
          </a>
        </div>
      </div>
    );
  }

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(editForm);
    setIsEditing(false);
    setToastMsg('Profile updated successfully!');
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleLogoutClick = () => {
    logout();
    window.history.pushState({}, '', '/login');
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 76px)',
        marginTop: '76px',
        backgroundColor: '#F9FAFB',
        padding: '3rem 1.5rem',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div className="container" style={{ maxWidth: '960px', margin: '0 auto' }}>
        
        {/* Toast Notification */}
        {toastMsg && (
          <div
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              zIndex: 99999,
              backgroundColor: '#111827',
              color: '#FFFFFF',
              padding: '0.85rem 1.4rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 700,
              boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
              border: '1px solid var(--brand-orange)',
            }}
          >
            <CheckCircle2 size={18} style={{ color: 'var(--brand-orange)' }} />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Back Link */}
        <div style={{ marginBottom: '1.5rem' }}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new Event('popstate'));
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#6B7280',
              fontWeight: 700,
              fontSize: '0.88rem',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Main Website</span>
          </a>
        </div>

        {/* Header Profile Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #E5E7EB',
            padding: '2.5rem 2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: 'rgba(232, 90, 42, 0.12)',
                color: 'var(--brand-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 800,
                border: '2px solid var(--brand-orange)',
                boxShadow: '0 6px 18px rgba(232, 90, 42, 0.2)',
              }}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : 'V'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                  {user.name}
                </h1>
                {user.verified && (
                  <span
                    style={{
                      backgroundColor: '#FFF2EC',
                      color: 'var(--brand-orange)',
                      fontSize: '0.75rem',
                      fontWeight: 750,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '20px',
                      border: '1px solid rgba(232, 90, 42, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    <ShieldCheck size={13} /> Verified Email
                  </span>
                )}
              </div>

              <div style={{ fontSize: '0.9rem', color: '#6B7280', fontWeight: 600 }}>
                {user.email}
              </div>

              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    backgroundColor: '#F3F4F6',
                    color: '#374151',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.65rem',
                    borderRadius: '8px',
                    letterSpacing: '0.05em',
                  }}
                >
                  ID: {user.volunteerId || 'SV-VOL-849201'}
                </span>
                <span
                  style={{
                    backgroundColor: '#F3F4F6',
                    color: '#374151',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.65rem',
                    borderRadius: '8px',
                  }}
                >
                  ROLE: {user.role || 'USER'}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setIsEditing(!isEditing)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.65rem 1.25rem',
                borderRadius: '20px',
                border: '1px solid #D1D5DB',
                backgroundColor: '#FFFFFF',
                color: '#374151',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
              }}
            >
              <Edit2 size={15} />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>

            <button
              onClick={handleLogoutClick}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.65rem 1.25rem',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: '#FEE2E2',
                color: '#DC2626',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
              }}
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Impact Overview KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-orange)', fontSize: '0.8rem', fontWeight: 800 }}>
              <Clock size={16} /> VERIFIED HOURS LOGGED
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', marginTop: '0.4rem' }}>
              {user.hours || 0} Hours
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.2rem' }}>100% Audited Ledger</div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-orange)', fontSize: '0.8rem', fontWeight: 800 }}>
              <Award size={16} /> VOLUNTEER BADGES
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', marginTop: '0.4rem' }}>
              Verified Member
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.2rem' }}>Active Passport Record</div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-orange)', fontSize: '0.8rem', fontWeight: 800 }}>
              <Calendar size={16} /> MEMBER SINCE
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', marginTop: '0.4rem' }}>
              {user.createdAt || '2025-04-12'}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.2rem' }}>Official Account Date</div>
          </div>
        </div>

        {/* Profile Details or Edit Form */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', border: '1px solid #E5E7EB', padding: '2.5rem 2rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111827', marginBottom: '1.5rem' }}>
            {isEditing ? 'Edit Profile Details' : 'Volunteer Profile Information'}
          </h2>

          {isEditing ? (
            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 750, color: '#374151', marginBottom: '0.4rem' }}>Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 750, color: '#374151', marginBottom: '0.4rem' }}>Phone Number</label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 750, color: '#374151', marginBottom: '0.4rem' }}>Volunteer Skills</label>
                <input
                  type="text"
                  placeholder="e.g. Teaching, First Aid, Marketing, Forestry"
                  value={editForm.skills}
                  onChange={(e) => setEditForm({ ...editForm, skills: e.target.value })}
                  style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 750, color: '#374151', marginBottom: '0.4rem' }}>Cause Interests</label>
                <input
                  type="text"
                  placeholder="e.g. Education, Healthcare, Miyawaki Forests"
                  value={editForm.interests}
                  onChange={(e) => setEditForm({ ...editForm, interests: e.target.value })}
                  style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn-orange" style={{ padding: '0.7rem 1.6rem', borderRadius: '20px' }}>
                  <span>Save Changes</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  style={{ padding: '0.7rem 1.4rem', borderRadius: '20px', border: '1px solid #D1D5DB', background: '#FFF', fontWeight: 700 }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>FULL NAME</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginTop: '0.25rem' }}>{user.name}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>EMAIL ADDRESS</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginTop: '0.25rem' }}>{user.email}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>PHONE NUMBER</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginTop: '0.25rem' }}>{user.phone || 'Not provided'}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>VOLUNTEER PASSPORT ID</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--brand-orange)', marginTop: '0.25rem' }}>{user.volunteerId}</div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>VOLUNTEER SKILLS</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 650, color: '#374151', marginTop: '0.25rem' }}>{user.skills || 'Mathematics, Teaching, Community Work'}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>CAUSE INTERESTS</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 650, color: '#374151', marginTop: '0.25rem' }}>{user.interests || 'Education & Literacy, Healthcare, Environment'}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
