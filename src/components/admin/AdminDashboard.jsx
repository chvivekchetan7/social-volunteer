import React, { useState, useMemo } from 'react';
import { useCMS } from '../../context/CMSContext';
import ImageManagerControl from './ImageManagerControl';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Briefcase, 
  FolderKanban, 
  Users, 
  FileText, 
  Clock, 
  Layers, 
  Grid, 
  CreditCard, 
  MessageSquare, 
  Activity, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Edit, 
  Eye, 
  LogOut, 
  ShieldCheck, 
  ArrowLeft,
  Sparkles,
  Search,
  Filter,
  X,
  AlertTriangle,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Check,
  Building2
} from 'lucide-react';

export default function AdminDashboard({ onClose }) {
  const {
    setIsAdminLoggedIn,
    heroContent,
    updateHero,
    deleteHeroImage,
    opportunities,
    addOpportunity,
    updateOpportunity,
    deleteOpportunity,
    applications,
    updateApplicationStatus,
    deleteApplication,
    verifiedHoursLedger,
    verifyHoursEntry,
    updateHoursEntry,
    deleteHoursEntry,
    causes,
    addCause,
    updateCause,
    deleteCause,
    projects,
    addProject,
    updateProject,
    deleteProject,
    volunteers,
    addVolunteer,
    updateVolunteer,
    deleteVolunteer,
    gallery,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
    impactStats,
    addImpactStat,
    updateImpactStats,
    deleteImpactStat,
    plans,
    addPlan,
    updatePlan,
    deletePlan,
    messages,
    addMessage,
    updateMessageStatus,
    deleteMessage,
    activityLog,
    impactJourney,
    updateImpactStage,
    oneHourSection,
    updateOneHourSection,
  } = useCMS();

  // Route/Tab Helper
  const getInitialTab = () => {
    const subpath = window.location.pathname.replace(/^\/admin\/?/, '').trim();
    if (subpath === 'homepage' || subpath === 'hero') return 'hero';
    if (subpath === 'opportunities') return 'opportunities';
    if (subpath === 'applications') return 'applications';
    if (subpath === 'verified-hours' || subpath === 'hours') return 'hours';
    if (subpath === 'causes') return 'causes';
    if (subpath === 'projects') return 'projects';
    if (subpath === 'volunteers') return 'volunteers';
    if (subpath === 'gallery' || subpath === 'media' || subpath === 'blog') return 'gallery';
    if (subpath === 'plans') return 'plans';
    if (subpath === 'impact' || subpath === 'stats') return 'impact';
    if (subpath === 'contact-messages' || subpath === 'messages') return 'messages';
    if (subpath === 'logs' || subpath === 'activity' || subpath === 'settings') return 'logs';
    return 'overview';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    window.history.pushState({}, '', `/admin/${tabId}`);
    setSearchQuery('');
    setCategoryFilter('All');
  };

  const handleLogoutAction = () => {
    setIsAdminLoggedIn(false);
    window.history.pushState({}, '', '/admin');
    window.dispatchEvent(new Event('popstate'));
  };

  const handleViewPublicWebsite = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('popstate'));
  };

  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const triggerToast = (msg, type = 'success') => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3500);
  };

  // Common Table Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal Control States
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, title: '', message: '', onConfirm: null });
  const [viewModal, setViewModal] = useState({ isOpen: false, title: '', type: '', data: null });
  const [formModal, setFormModal] = useState({ isOpen: false, mode: 'create', type: '', data: null });

  // Hero Form State
  const [heroForm, setHeroForm] = useState({ ...heroContent });

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    updateHero(heroForm);
    triggerToast('Hero content updated successfully!');
  };

  const handleDeleteHeroImageClick = () => {
    setDeleteModal({
      isOpen: true,
      title: 'Remove Hero Image?',
      message: 'Are you sure you want to remove the current background photo from the hero section? This action cannot be undone.',
      onConfirm: () => {
        deleteHeroImage();
        setHeroForm((prev) => ({ ...prev, bgImage: '' }));
        setDeleteModal({ isOpen: false, title: '', message: '', onConfirm: null });
        triggerToast('Hero background image removed.');
      },
    });
  };

  // Generic Confirmation Delete Handler
  const promptDelete = (title, name, deleteFn) => {
    setDeleteModal({
      isOpen: true,
      title: `Delete ${title}?`,
      message: `Are you sure you want to delete "${name}"? This action cannot be undone.`,
      onConfirm: () => {
        deleteFn();
        setDeleteModal({ isOpen: false, title: '', message: '', onConfirm: null });
        triggerToast(`${title} deleted successfully.`);
      },
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: '#F9FAFB',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-sans)',
        color: '#111827',
      }}
    >
      {/* 1. TOP ADMIN CONTROL BAR */}
      <header
        style={{
          height: '64px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              backgroundColor: 'var(--brand-orange)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '1.1rem',
              padding: '0.4rem 0.8rem',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(232, 90, 42, 0.25)',
            }}
          >
            SV CMS
          </div>
          <div>
            <h1 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', lineHeight: 1.1 }}>
              SocialVolunteers Admin Portal
            </h1>
            <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 600 }}>
              Production Management CMS System
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(232, 90, 42, 0.1)', color: 'var(--brand-orange)', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 750 }}>
            <ShieldCheck size={15} />
            <span>Administrator Session</span>
          </div>

          <button
            onClick={handleViewPublicWebsite}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#FFFFFF',
              border: '1px solid #D1D5DB',
              padding: '0.45rem 0.9rem',
              borderRadius: '20px',
              fontWeight: 650,
              fontSize: '0.85rem',
              color: '#374151',
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={15} />
            <span>View Public Website</span>
          </button>

          <button
            onClick={handleLogoutAction}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#FEE2E2',
              color: '#DC2626',
              border: 'none',
              padding: '0.45rem 0.9rem',
              borderRadius: '20px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* 2. BODY LAYOUT (SIDEBAR + MAIN CONTENT AREA) */}
      <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        
        {/* SIDEBAR NAVIGATION */}
        <aside
          style={{
            width: '240px',
            backgroundColor: '#FFFFFF',
            borderRight: '1px solid #E5E7EB',
            padding: '1.25rem 0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            flexShrink: 0,
            overflowY: 'auto',
          }}
        >
          <div style={{ padding: '0 0.5rem 0.75rem', fontSize: '0.72rem', fontWeight: 800, color: '#9CA3AF', letterSpacing: '0.1em' }}>
            CMS MODULES
          </div>

          {[
            { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'hero', label: 'Homepage & Hero', icon: ImageIcon },
            { id: 'opportunities', label: 'Opportunities', icon: Briefcase },
            { id: 'applications', label: 'Applications Queue', icon: FileText },
            { id: 'hours', label: 'Verified Hours Audit', icon: Clock },
            { id: 'causes', label: 'Causes Manager', icon: Grid },
            { id: 'projects', label: 'Projects Manager', icon: FolderKanban },
            { id: 'volunteers', label: 'Volunteer Directory', icon: Users },
            { id: 'gallery', label: 'Gallery & Media', icon: Layers },
            { id: 'impact', label: 'Impact Statistics', icon: Activity },
            { id: 'plans', label: 'Plans & Pricing', icon: CreditCard },
            { id: 'messages', label: 'Contact Messages', icon: MessageSquare },
            { id: 'logs', label: 'Activity Audit Log', icon: Activity },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: isActive ? 'rgba(232, 90, 42, 0.1)' : 'transparent',
                  color: isActive ? 'var(--brand-orange)' : '#4B5563',
                  fontWeight: isActive ? 750 : 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
              >
                <Icon size={17} style={{ color: isActive ? 'var(--brand-orange)' : '#6B7280' }} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* MAIN DISPLAY AREA */}
        <main
          style={{
            flexGrow: 1,
            padding: '2rem',
            overflowY: 'auto',
            backgroundColor: '#F9FAFB',
            position: 'relative',
          }}
        >
          {/* TOAST NOTIFICATION */}
          {toast.show && (
            <div
              style={{
                position: 'fixed',
                bottom: '1.5rem',
                right: '1.5rem',
                zIndex: 9999,
                backgroundColor: '#111827',
                color: '#FFFFFF',
                padding: '0.85rem 1.4rem',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                fontSize: '0.9rem',
                fontWeight: 650,
                border: '1px solid var(--brand-orange)',
              }}
            >
              <CheckCircle2 size={18} style={{ color: 'var(--brand-orange)' }} />
              <span>{toast.message}</span>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ marginBottom: '1.75rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>Platform Dashboard Overview</h2>
                <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Real-time platform metrics, volunteer records, and management summary.</p>
              </div>

              {/* KPI Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6B7280' }}>ACTIVE VOLUNTEERS</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--brand-orange)', marginTop: '0.2rem' }}>{volunteers.length}</div>
                  <div style={{ fontSize: '0.75rem', color: '#111827', marginTop: '0.2rem', fontWeight: 600 }}>Registered Profiles</div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6B7280' }}>PUBLISHED OPPORTUNITIES</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', marginTop: '0.2rem' }}>{opportunities.length}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.2rem' }}>Across {causes.length} Causes</div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6B7280' }}>ACTIVE PROJECTS</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--brand-orange)', marginTop: '0.2rem' }}>{projects.length}</div>
                  <div style={{ fontSize: '0.75rem', color: '#111827', marginTop: '0.2rem', fontWeight: 600 }}>Community Initiatives</div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6B7280' }}>VERIFIED HOURS</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', marginTop: '0.2rem' }}>47,293</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--brand-orange)', marginTop: '0.2rem', fontWeight: 600 }}>100% Audited Ledger</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HOMEPAGE & HERO */}
          {activeTab === 'hero' && (
            <div style={{ maxWidth: '820px' }}>
              <div style={{ marginBottom: '1.75rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>Homepage & Hero Content Manager</h2>
                <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Edit public hero text, main headline, orange highlight phrase, subtext, and background photo.</p>
              </div>

              <form onSubmit={handleHeroSubmit} style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '12px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <ImageManagerControl
                  label="Hero Background Photo"
                  value={heroForm.bgImage}
                  onChange={(newPhoto) => setHeroForm({ ...heroForm, bgImage: newPhoto })}
                  height="200px"
                />

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 750, color: '#374151', marginBottom: '0.4rem' }}>Eyebrow Subheading</label>
                  <input
                    type="text"
                    value={heroForm.eyebrow}
                    onChange={(e) => setHeroForm({ ...heroForm, eyebrow: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 750, color: '#374151', marginBottom: '0.4rem' }}>Main Headline</label>
                    <input
                      type="text"
                      value={heroForm.heading}
                      onChange={(e) => setHeroForm({ ...heroForm, heading: e.target.value })}
                      style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 750, color: '#374151', marginBottom: '0.4rem' }}>Orange Highlighted Text</label>
                    <input
                      type="text"
                      value={heroForm.highlightText}
                      onChange={(e) => setHeroForm({ ...heroForm, highlightText: e.target.value })}
                      style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem', color: 'var(--brand-orange)', fontWeight: 700 }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 750, color: '#374151', marginBottom: '0.4rem' }}>Description Paragraph</label>
                  <textarea
                    rows={3}
                    value={heroForm.description}
                    onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem', fontFamily: 'inherit' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 750, color: '#374151', marginBottom: '0.4rem' }}>Primary CTA Button Label</label>
                    <input
                      type="text"
                      value={heroForm.primaryCtaText}
                      onChange={(e) => setHeroForm({ ...heroForm, primaryCtaText: e.target.value })}
                      style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 750, color: '#374151', marginBottom: '0.4rem' }}>Secondary CTA Button Label</label>
                    <input
                      type="text"
                      value={heroForm.secondaryCtaText}
                      onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaText: e.target.value })}
                      style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-orange" style={{ marginTop: '0.5rem', padding: '0.85rem', fontSize: '0.95rem' }}>
                  <span>Save & Publish Hero Changes</span>
                </button>
              </form>

              {/* 2. ONE HOUR CAN CREATE IMPACT SECTION */}
              <div style={{ marginTop: '2.5rem' }}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111827' }}>"One Hour Can Create Impact" Section</h3>
                  <p style={{ color: '#6B7280', fontSize: '0.88rem' }}>Manage the background photo and text for the homepage scroll storytelling section.</p>
                </div>

                <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '12px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <ImageManagerControl
                    label="Section Background Photo"
                    value={oneHourSection?.bgImage || ''}
                    onChange={(newPhoto) => {
                      updateOneHourSection({ bgImage: newPhoto });
                      triggerToast('One Hour section background photo updated!');
                    }}
                    showToast={triggerToast}
                    height="180px"
                  />

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 750, color: '#374151', marginBottom: '0.4rem' }}>Eyebrow Label</label>
                    <input
                      type="text"
                      value={oneHourSection?.eyebrow || ''}
                      onChange={(e) => updateOneHourSection({ eyebrow: e.target.value })}
                      style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 750, color: '#374151', marginBottom: '0.4rem' }}>Section Heading</label>
                    <input
                      type="text"
                      value={oneHourSection?.heading || ''}
                      onChange={(e) => updateOneHourSection({ heading: e.target.value })}
                      style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 750, color: '#374151', marginBottom: '0.4rem' }}>Description Paragraph</label>
                    <textarea
                      rows={2}
                      value={oneHourSection?.description || ''}
                      onChange={(e) => updateOneHourSection({ description: e.target.value })}
                      style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem', fontFamily: 'inherit' }}
                    />
                  </div>
                </div>
              </div>

              {/* 3. VERIFIED COMMUNITY IMPACT STAGES (6 STAGES) */}
              <div style={{ marginTop: '2.5rem', marginBottom: '3rem' }}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111827' }}>Verified Community Impact Stages</h3>
                  <p style={{ color: '#6B7280', fontSize: '0.88rem' }}>Manage individual photos and content for all 6 impact journey stages (YOU, VOLUNTEER, OPPORTUNITY, PROJECT, COMMUNITY, IMPACT).</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {(impactJourney || []).map((stg, idx) => (
                    <div key={stg.id} style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '14px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6', paddingBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <span style={{ background: 'var(--brand-orange)', color: '#FFF', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem' }}>
                            STAGE 0{idx + 1}
                          </span>
                          <span style={{ fontWeight: 800, fontSize: '1rem', color: '#111827' }}>
                            {stg.stage} — {stg.subtitle}
                          </span>
                        </div>
                      </div>

                      <ImageManagerControl
                        label={`Stage ${stg.stage} Photo`}
                        value={stg.image}
                        onChange={(newPhoto) => {
                          updateImpactStage(stg.id, { image: newPhoto });
                          triggerToast(`Updated photo for Stage ${stg.stage}`);
                        }}
                        showToast={triggerToast}
                        height="160px"
                      />

                      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 750, color: '#374151', marginBottom: '0.3rem' }}>Stage Title</label>
                          <input
                            type="text"
                            value={stg.title}
                            onChange={(e) => updateImpactStage(stg.id, { title: e.target.value })}
                            style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 750, color: '#374151', marginBottom: '0.3rem' }}>Badge / Statistic</label>
                          <input
                            type="text"
                            value={stg.stat}
                            onChange={(e) => updateImpactStage(stg.id, { stat: e.target.value })}
                            style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 750, color: '#374151', marginBottom: '0.3rem' }}>Description</label>
                        <textarea
                          rows={2}
                          value={stg.text}
                          onChange={(e) => updateImpactStage(stg.id, { text: e.target.value })}
                          style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem', fontFamily: 'inherit' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: OPPORTUNITIES MANAGER */}
          {activeTab === 'opportunities' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>Opportunity Management</h2>
                  <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Publish, edit, or delete volunteer shifts.</p>
                </div>
                <button
                  onClick={() => setFormModal({ isOpen: true, mode: 'create', type: 'opportunity', data: null })}
                  className="btn-orange"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}
                >
                  <Plus size={16} /> Add Opportunity
                </button>
              </div>

              {/* Table Filter Controls */}
              <div style={{ background: '#FFFFFF', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid #E5E7EB', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #D1D5DB', borderRadius: '8px', padding: '0.5rem 0.75rem', background: '#FFF' }}>
                  <Search size={16} style={{ color: '#9CA3AF' }} />
                  <input
                    type="text"
                    placeholder="Search by title, organization or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              {/* Opportunities Table */}
              {opportunities.length === 0 ? (
                <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '3.5rem 2rem', textAlign: 'center' }}>
                  <Briefcase size={44} style={{ color: '#9CA3AF', margin: '0 auto 1rem' }} />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 750, color: '#111827' }}>No opportunities found</h3>
                  <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Create your first volunteer opportunity to list it on the public site.</p>
                  <button onClick={() => setFormModal({ isOpen: true, mode: 'create', type: 'opportunity', data: null })} className="btn-orange" style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}>
                    <Plus size={16} /> Add Opportunity
                  </button>
                </div>
              ) : (
                <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', fontSize: '0.78rem', fontWeight: 800, color: '#6B7280' }}>
                        <th style={{ padding: '0.85rem 1rem' }}>PHOTO</th>
                        <th style={{ padding: '0.85rem 1rem' }}>OPPORTUNITY TITLE</th>
                        <th style={{ padding: '0.85rem 1rem' }}>ORGANISATION</th>
                        <th style={{ padding: '0.85rem 1rem' }}>CAUSE</th>
                        <th style={{ padding: '0.85rem 1rem' }}>LOCATION</th>
                        <th style={{ padding: '0.85rem 1rem' }}>HOURS</th>
                        <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {opportunities
                        .filter(o => o.title.toLowerCase().includes(searchQuery.toLowerCase()) || o.organisation.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((opp) => (
                          <tr key={opp.id} style={{ borderBottom: '1px solid #F3F4F6', fontSize: '0.88rem' }}>
                            <td style={{ padding: '0.85rem 1rem' }}>
                              <img src={opp.image} alt={opp.title} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                            </td>
                            <td style={{ padding: '0.85rem 1rem', fontWeight: 750, color: '#111827' }}>{opp.title}</td>
                            <td style={{ padding: '0.85rem 1rem', color: '#4B5563' }}>{opp.organisation}</td>
                            <td style={{ padding: '0.85rem 1rem' }}>
                              <span style={{ background: '#FFF2EC', color: 'var(--brand-orange)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                                {opp.cause}
                              </span>
                            </td>
                            <td style={{ padding: '0.85rem 1rem', color: '#6B7280' }}>{opp.location}</td>
                            <td style={{ padding: '0.85rem 1rem', fontWeight: 750 }}>{opp.hours} hrs</td>
                            <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                <button
                                  onClick={() => setFormModal({ isOpen: true, mode: 'edit', type: 'opportunity', data: opp })}
                                  style={{ background: 'none', border: 'none', color: '#4B5563', cursor: 'pointer', padding: '0.25rem' }}
                                  title="Edit Opportunity"
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  onClick={() => promptDelete('Opportunity', opp.title, () => deleteOpportunity(opp.id))}
                                  style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '0.25rem' }}
                                  title="Delete Opportunity"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CAUSES MANAGER */}
          {activeTab === 'causes' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>Causes Manager</h2>
                  <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Manage cause sectors, thematic photography, and role counts.</p>
                </div>
                <button
                  onClick={() => setFormModal({ isOpen: true, mode: 'create', type: 'cause', data: null })}
                  className="btn-orange"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}
                >
                  <Plus size={16} /> Add Cause
                </button>
              </div>

              <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', fontSize: '0.78rem', fontWeight: 800, color: '#6B7280' }}>
                      <th style={{ padding: '0.85rem 1rem' }}>CAUSE PHOTO</th>
                      <th style={{ padding: '0.85rem 1rem' }}>CAUSE NAME</th>
                      <th style={{ padding: '0.85rem 1rem' }}>DESCRIPTION</th>
                      <th style={{ padding: '0.85rem 1rem' }}>STATUS</th>
                      <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {causes.map((c) => (
                      <tr key={c.id} style={{ borderBottom: '1px solid #F3F4F6', fontSize: '0.88rem' }}>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <img src={c.image} alt={c.name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                        </td>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 750, color: '#111827' }}>{c.name}</td>
                        <td style={{ padding: '0.85rem 1rem', color: '#4B5563', maxWidth: '300px' }}>{c.desc}</td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <span style={{ background: '#FFF2EC', color: 'var(--brand-orange)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                            {c.active !== false ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => setFormModal({ isOpen: true, mode: 'edit', type: 'cause', data: c })}
                              style={{ background: 'none', border: 'none', color: '#4B5563', cursor: 'pointer', padding: '0.25rem' }}
                              title="Edit Cause"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => promptDelete('Cause', c.name, () => deleteCause(c.id))}
                              style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '0.25rem' }}
                              title="Delete Cause"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: PROJECTS MANAGER */}
          {activeTab === 'projects' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>Projects Manager</h2>
                  <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Create, update, or remove community impact initiatives.</p>
                </div>
                <button
                  onClick={() => setFormModal({ isOpen: true, mode: 'create', type: 'project', data: null })}
                  className="btn-orange"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}
                >
                  <Plus size={16} /> Add Project
                </button>
              </div>

              {projects.length === 0 ? (
                <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '3.5rem 2rem', textAlign: 'center' }}>
                  <FolderKanban size={44} style={{ color: '#9CA3AF', margin: '0 auto 1rem' }} />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 750, color: '#111827' }}>No projects yet</h3>
                  <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Create your first project to start managing community impact.</p>
                  <button onClick={() => setFormModal({ isOpen: true, mode: 'create', type: 'project', data: null })} className="btn-orange" style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}>
                    <Plus size={16} /> Add Project
                  </button>
                </div>
              ) : (
                <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', fontSize: '0.78rem', fontWeight: 800, color: '#6B7280' }}>
                        <th style={{ padding: '0.85rem 1rem' }}>PROJECT PHOTO</th>
                        <th style={{ padding: '0.85rem 1rem' }}>PROJECT TITLE</th>
                        <th style={{ padding: '0.85rem 1rem' }}>ORGANISATION</th>
                        <th style={{ padding: '0.85rem 1rem' }}>CATEGORY</th>
                        <th style={{ padding: '0.85rem 1rem' }}>STATUS</th>
                        <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((proj) => (
                        <tr key={proj.id} style={{ borderBottom: '1px solid #F3F4F6', fontSize: '0.88rem' }}>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <img src={proj.image} alt={proj.title} style={{ width: '48px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                          </td>
                          <td style={{ padding: '0.85rem 1rem', fontWeight: 750, color: '#111827' }}>{proj.title}</td>
                          <td style={{ padding: '0.85rem 1rem', color: '#4B5563' }}>{proj.organisation}</td>
                          <td style={{ padding: '0.85rem 1rem', color: '#6B7280' }}>{proj.category}</td>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <span style={{ background: '#FFF2EC', color: 'var(--brand-orange)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                              {proj.status || 'Active'}
                            </span>
                          </td>
                          <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                              <button
                                onClick={() => setFormModal({ isOpen: true, mode: 'edit', type: 'project', data: proj })}
                                style={{ background: 'none', border: 'none', color: '#4B5563', cursor: 'pointer', padding: '0.25rem' }}
                                title="Edit Project"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => promptDelete('Project', proj.title, () => deleteProject(proj.id))}
                                style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '0.25rem' }}
                                title="Delete Project"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: VOLUNTEER DIRECTORY */}
          {activeTab === 'volunteers' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>Volunteer Directory</h2>
                  <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Manage registered volunteer accounts, hours, and credentials.</p>
                </div>
                <button
                  onClick={() => setFormModal({ isOpen: true, mode: 'create', type: 'volunteer', data: null })}
                  className="btn-orange"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}
                >
                  <Plus size={16} /> Add Volunteer
                </button>
              </div>

              <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', fontSize: '0.78rem', fontWeight: 800, color: '#6B7280' }}>
                      <th style={{ padding: '0.85rem 1rem' }}>AVATAR</th>
                      <th style={{ padding: '0.85rem 1rem' }}>NAME</th>
                      <th style={{ padding: '0.85rem 1rem' }}>EMAIL</th>
                      <th style={{ padding: '0.85rem 1rem' }}>LOCATION</th>
                      <th style={{ padding: '0.85rem 1rem' }}>HOURS</th>
                      <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {volunteers.map((vol) => (
                      <tr key={vol.id} style={{ borderBottom: '1px solid #F3F4F6', fontSize: '0.88rem' }}>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <img src={vol.photo} alt={vol.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                        </td>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 750, color: '#111827' }}>{vol.name}</td>
                        <td style={{ padding: '0.85rem 1rem', color: '#4B5563' }}>{vol.email}</td>
                        <td style={{ padding: '0.85rem 1rem', color: '#6B7280' }}>{vol.location}</td>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 750, color: 'var(--brand-orange)' }}>{vol.hours} hrs</td>
                        <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => setFormModal({ isOpen: true, mode: 'edit', type: 'volunteer', data: vol })}
                              style={{ background: 'none', border: 'none', color: '#4B5563', cursor: 'pointer', padding: '0.25rem' }}
                              title="Edit Volunteer"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => promptDelete('Volunteer', vol.name, () => deleteVolunteer(vol.id))}
                              style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '0.25rem' }}
                              title="Delete Volunteer"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: GALLERY & MEDIA MANAGER */}
          {activeTab === 'gallery' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>Gallery & Media Manager</h2>
                  <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Upload, view, and manage field photography.</p>
                </div>
                <button
                  onClick={() => setFormModal({ isOpen: true, mode: 'create', type: 'gallery', data: null })}
                  className="btn-orange"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}
                >
                  <Plus size={16} /> Add Gallery Photo
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
                {gallery.map((g) => (
                  <div key={g.id} style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '140px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                      <img src={g.image} alt={g.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '1rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--brand-orange)', textTransform: 'uppercase' }}>{g.category}</span>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 750, color: '#111827', marginTop: '0.2rem' }}>{g.title}</h4>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem', paddingTop: '0.5rem', borderTop: '1px solid #F3F4F6' }}>
                        <button onClick={() => setFormModal({ isOpen: true, mode: 'edit', type: 'gallery', data: g })} style={{ background: 'none', border: 'none', color: '#4B5563', cursor: 'pointer' }}>
                          <Edit size={16} />
                        </button>
                        <button onClick={() => promptDelete('Gallery Image', g.title, () => deleteGalleryImage(g.id))} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: IMPACT STATS */}
          {activeTab === 'impact' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>Impact Statistics Manager</h2>
                  <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Edit the verified impact metrics shown on the public site.</p>
                </div>
                <button onClick={() => setFormModal({ isOpen: true, mode: 'create', type: 'stat', data: null })} className="btn-orange" style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}>
                  <Plus size={16} /> Add Metric
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                {impactStats.map((s) => (
                  <div key={s.id} style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--brand-orange)' }}>{s.number || s.value}</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 750, color: '#111827', marginTop: '0.2rem' }}>{s.label}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '0.3rem' }}>{s.desc}</div>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                      <button onClick={() => setFormModal({ isOpen: true, mode: 'edit', type: 'stat', data: s })} style={{ background: 'none', border: 'none', color: '#4B5563', cursor: 'pointer' }}><Edit size={16} /></button>
                      <button onClick={() => promptDelete('Impact Metric', s.label, () => deleteImpactStat(s.id))} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: PLANS & PRICING */}
          {activeTab === 'plans' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>Plans & Pricing Manager</h2>
                  <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Manage Basic (Free), Professional (₹499), and Premium (₹999) memberships.</p>
                </div>
                <button onClick={() => setFormModal({ isOpen: true, mode: 'create', type: 'plan', data: null })} className="btn-orange" style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}>
                  <Plus size={16} /> Add Plan
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                {plans.map((p) => (
                  <div key={p.id} style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: p.highlight ? '2px solid var(--brand-orange)' : '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--brand-orange)' }}>{p.name.toUpperCase()} PLAN</div>
                      <div style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', margin: '0.4rem 0' }}>{p.price} <span style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 600 }}>{p.period}</span></div>
                      <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '1rem' }}>{p.desc}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid #F3F4F6' }}>
                      <button onClick={() => setFormModal({ isOpen: true, mode: 'edit', type: 'plan', data: p })} style={{ background: 'none', border: 'none', color: '#4B5563', cursor: 'pointer' }}><Edit size={16} /></button>
                      <button onClick={() => promptDelete('Plan', p.name, () => deletePlan(p.id))} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: CONTACT MESSAGES */}
          {activeTab === 'messages' && (
            <div>
              <div style={{ marginBottom: '1.75rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>Contact Messages Inbox</h2>
                <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Read and respond to inquiries sent through the public contact form.</p>
              </div>

              <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', fontSize: '0.78rem', fontWeight: 800, color: '#6B7280' }}>
                      <th style={{ padding: '0.85rem 1rem' }}>SENDER</th>
                      <th style={{ padding: '0.85rem 1rem' }}>SUBJECT</th>
                      <th style={{ padding: '0.85rem 1rem' }}>MESSAGE PREVIEW</th>
                      <th style={{ padding: '0.85rem 1rem' }}>DATE</th>
                      <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((m) => (
                      <tr key={m.id} style={{ borderBottom: '1px solid #F3F4F6', fontSize: '0.88rem' }}>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 750, color: '#111827' }}>
                          {m.name} <br /><span style={{ fontSize: '0.78rem', color: '#6B7280', fontWeight: 400 }}>{m.email}</span>
                        </td>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 650 }}>{m.subject}</td>
                        <td style={{ padding: '0.85rem 1rem', color: '#4B5563', maxWidth: '300px' }}>{m.message}</td>
                        <td style={{ padding: '0.85rem 1rem', color: '#9CA3AF', fontSize: '0.8rem' }}>{m.date}</td>
                        <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                          <button onClick={() => promptDelete('Message', m.subject, () => deleteMessage(m.id))} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 11: AUDIT LOGS */}
          {activeTab === 'logs' && (
            <div>
              <div style={{ marginBottom: '1.75rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>Activity Audit Log</h2>
                <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Permanent record of all CMS administrative edits, approvals, and deletions.</p>
              </div>

              <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {activityLog.map((log) => (
                    <div key={log.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #F3F4F6', fontSize: '0.88rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--brand-orange)' }} />
                        <span style={{ fontWeight: 750, color: '#111827' }}>{log.action}</span>
                      </div>
                      <span style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>{log.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModal.isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', maxWidth: '440px', width: '100%', padding: '2rem', border: '1px solid #E5E7EB', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <AlertTriangle size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>{deleteModal.title}</h3>
            <p style={{ color: '#4B5563', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '1.75rem' }}>{deleteModal.message}</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setDeleteModal({ isOpen: false, title: '', message: '', onConfirm: null })}
                style={{ padding: '0.65rem 1.25rem', borderRadius: '24px', border: '1px solid #D1D5DB', background: '#FFFFFF', color: '#374151', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={deleteModal.onConfirm}
                style={{ padding: '0.65rem 1.25rem', borderRadius: '24px', border: 'none', background: '#DC2626', color: '#FFFFFF', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FORM MODAL ENGINE FOR CREATE / EDIT */}
      {formModal.isOpen && (
        <FormModalEngine
          formModal={formModal}
          setFormModal={setFormModal}
          addProject={addProject}
          updateProject={updateProject}
          addVolunteer={addVolunteer}
          updateVolunteer={updateVolunteer}
          addOpportunity={addOpportunity}
          updateOpportunity={updateOpportunity}
          addImpactStat={addImpactStat}
          updateImpactStats={updateImpactStats}
          addPlan={addPlan}
          updatePlan={updatePlan}
          addCause={addCause}
          updateCause={updateCause}
          addGalleryImage={addGalleryImage}
          updateGalleryImage={updateGalleryImage}
          triggerToast={triggerToast}
        />
      )}
    </div>
  );
}

// FORM ENGINE COMPONENT FOR CREATE & EDIT FORMS
function FormModalEngine({
  formModal,
  setFormModal,
  addProject,
  updateProject,
  addVolunteer,
  updateVolunteer,
  addOpportunity,
  updateOpportunity,
  addImpactStat,
  updateImpactStats,
  addPlan,
  updatePlan,
  addCause,
  updateCause,
  addGalleryImage,
  updateGalleryImage,
  triggerToast
}) {
  const { mode, type, data } = formModal;

  // Local Form State
  const [formData, setFormData] = useState(data || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'project') {
      if (mode === 'create') addProject(formData);
      else updateProject(data.id, formData);
      triggerToast(mode === 'create' ? 'Project created!' : 'Project updated!');
    } else if (type === 'volunteer') {
      if (mode === 'create') addVolunteer(formData);
      else updateVolunteer(data.id, formData);
      triggerToast(mode === 'create' ? 'Volunteer registered!' : 'Volunteer updated!');
    } else if (type === 'opportunity') {
      if (mode === 'create') addOpportunity(formData);
      else updateOpportunity(data.id, formData);
      triggerToast(mode === 'create' ? 'Opportunity published!' : 'Opportunity updated!');
    } else if (type === 'stat') {
      if (mode === 'create') addImpactStat(formData);
      else updateImpactStats(data.id, formData);
      triggerToast(mode === 'create' ? 'Statistic created!' : 'Statistic updated!');
    } else if (type === 'plan') {
      if (mode === 'create') addPlan(formData);
      else updatePlan(data.id, formData);
      triggerToast(mode === 'create' ? 'Plan created!' : 'Plan updated!');
    } else if (type === 'cause') {
      if (mode === 'create') addCause(formData);
      else updateCause(data.id, formData);
      triggerToast(mode === 'create' ? 'Cause created!' : 'Cause updated!');
    } else if (type === 'gallery') {
      if (mode === 'create') addGalleryImage(formData);
      else updateGalleryImage(data.id, formData);
      triggerToast(mode === 'create' ? 'Gallery image added!' : 'Gallery image updated!');
    }
    setFormModal({ isOpen: false, mode: 'create', type: '', data: null });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.6)',
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
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          border: '1px solid #E5E7EB',
          position: 'relative',
        }}
      >
        <button
          onClick={() => setFormModal({ isOpen: false, mode: 'create', type: '', data: null })}
          style={{ position: 'absolute', top: '1rem', right: '1rem', border: 'none', background: 'none', cursor: 'pointer', color: '#6B7280' }}
        >
          <X size={20} />
        </button>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111827', marginBottom: '1.5rem', textTransform: 'capitalize' }}>
          {mode} {type}
        </h3>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* PROJECT FORM */}
          {type === 'project' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solar Education Kiosks"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Organisation *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shiksha Foundation"
                    value={formData.organisation || ''}
                    onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Category *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Climate & Ecology"
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  />
                </div>
              </div>
              
              <ImageManagerControl
                label="Project Photo"
                value={formData.image || ''}
                onChange={(newPhoto) => setFormData({ ...formData, image: newPhoto })}
                height="160px"
              />

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Project Goal & Description</label>
                <textarea
                  rows={3}
                  value={formData.goal || ''}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>
            </>
          )}

          {/* VOLUNTEER FORM */}
          {type === 'volunteer' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Volunteer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="aarav@domain.com"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bengaluru, KA"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  />
                </div>
              </div>

              <ImageManagerControl
                label="Profile Photo"
                value={formData.photo || ''}
                onChange={(newPhoto) => setFormData({ ...formData, photo: newPhoto })}
                height="140px"
              />

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Cause Interest</label>
                <input
                  type="text"
                  placeholder="Education / Healthcare"
                  value={formData.cause || ''}
                  onChange={(e) => setFormData({ ...formData, cause: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>
            </>
          )}

          {/* OPPORTUNITY FORM */}
          {type === 'opportunity' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Weekend Math Tutor"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Organisation *</label>
                  <input
                    type="text"
                    required
                    placeholder="Partner NGO"
                    value={formData.organisation || ''}
                    onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Cause *</label>
                  <input
                    type="text"
                    required
                    placeholder="Education"
                    value={formData.cause || ''}
                    onChange={(e) => setFormData({ ...formData, cause: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Location</label>
                  <input
                    type="text"
                    placeholder="Bengaluru, KA"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Hours per shift</label>
                  <input
                    type="number"
                    placeholder="4"
                    value={formData.hours || 4}
                    onChange={(e) => setFormData({ ...formData, hours: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  />
                </div>
              </div>

              <ImageManagerControl
                label="Opportunity Photo"
                value={formData.image || ''}
                onChange={(newPhoto) => setFormData({ ...formData, image: newPhoto })}
                height="160px"
              />
            </>
          )}

          {/* STAT FORM */}
          {type === 'stat' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Metric Label *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Active Volunteers"
                  value={formData.label || ''}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Value (Number) *</label>
                <input
                  type="text"
                  required
                  placeholder="2,847+"
                  value={formData.number || formData.value || ''}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value, value: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Description</label>
                <input
                  type="text"
                  placeholder="Active volunteers registered across India."
                  value={formData.desc || ''}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>
            </>
          )}

          {/* PLAN FORM */}
          {type === 'plan' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Plan Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Professional"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Price *</label>
                  <input
                    type="text"
                    required
                    placeholder="₹499"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Billing Period</label>
                  <input
                    type="text"
                    placeholder="/month"
                    value={formData.period || ''}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Description</label>
                <input
                  type="text"
                  placeholder="For dedicated volunteers..."
                  value={formData.desc || ''}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>
            </>
          )}

          {/* CAUSE FORM (FULL PHOTO MANAGER ENHANCEMENT) */}
          {type === 'cause' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Cause Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Environmental Action"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Description</label>
                <textarea
                  rows={2}
                  value={formData.desc || ''}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>

              <ImageManagerControl
                label="Cause Photo"
                value={formData.image || ''}
                onChange={(newPhoto) => setFormData({ ...formData, image: newPhoto })}
                height="160px"
              />
            </>
          )}

          {/* GALLERY FORM */}
          {type === 'gallery' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Photo Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Health Camp Field Team"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>
              
              <ImageManagerControl
                label="Gallery Photo"
                value={formData.image || ''}
                onChange={(newPhoto) => setFormData({ ...formData, image: newPhoto })}
                height="160px"
              />

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 750, marginBottom: '0.3rem' }}>Category</label>
                <input
                  type="text"
                  placeholder="Education / Healthcare / Environment"
                  value={formData.category || 'General'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>
            </>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={() => setFormModal({ isOpen: false, mode: 'create', type: '', data: null })}
              style={{ flex: 1, padding: '0.75rem', borderRadius: '24px', border: '1px solid #D1D5DB', background: '#FFF', fontWeight: 700 }}
            >
              Cancel
            </button>

            <button type="submit" className="btn-orange" style={{ flex: 1, padding: '0.75rem', borderRadius: '24px' }}>
              <span>Save Record</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
