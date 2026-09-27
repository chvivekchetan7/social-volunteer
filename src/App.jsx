import React, { useState, useEffect } from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import CustomCursor from './components/CustomCursor';
import CinematicIntro from './components/CinematicIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CauseCategories from './components/CauseCategories';
import OpportunityExplorer from './components/OpportunityExplorer';
import ProjectShowcase from './components/ProjectShowcase';
import VerifiedHoursEngine from './components/VerifiedHoursEngine';
import PlatformJourney from './components/PlatformJourney';
import PlatformWorkspaces from './components/PlatformWorkspaces';
import ImpactStats from './components/ImpactStats';
import ImpactNetwork3D from './components/ImpactNetwork3D';
import ScrollStorytelling from './components/ScrollStorytelling';
import SignatureImpactJourney from './components/SignatureImpactJourney';
import AboutSection from './components/AboutSection';
import DirectorySection from './components/DirectorySection';
import GallerySection from './components/GallerySection';
import StoriesSection from './components/StoriesSection';
import PlansSection from './components/PlansSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import VolunteerModal from './components/VolunteerModal';
import AdminDashboard from './components/admin/AdminDashboard';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import UserProfilePage from './pages/UserProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

// Standalone Protected Admin Login Page for /admin
function StandaloneAdminLoginPage() {
  const { setIsAdminLoggedIn } = useCMS();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setErrorMsg('Please enter password');
      return;
    }

    if (password.trim() === '3155') {
      setErrorMsg('');
      setIsLoading(true);
      setTimeout(() => {
        setIsAdminLoggedIn(true);
        setIsLoading(false);
        const targetPath = window.location.pathname.startsWith('/admin/') && window.location.pathname !== '/admin/'
          ? window.location.pathname 
          : '/admin/dashboard';
        window.history.pushState({}, '', targetPath);
        window.dispatchEvent(new Event('popstate'));
      }, 250);
    } else {
      setErrorMsg('Incorrect password');
      setIsLoading(false);
    }
  };

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
          maxWidth: '420px',
          width: '100%',
          padding: '3rem 2.25rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.06)',
          border: '1px solid #E5E7EB',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: 'rgba(232, 90, 42, 0.1)',
              color: 'var(--brand-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              boxShadow: '0 4px 12px rgba(232, 90, 42, 0.12)',
            }}
          >
            <Lock size={26} />
          </div>

          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>
            SocialVolunteers CMS
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#6B7280', marginTop: '0.35rem', fontWeight: 600 }}>
            Administrator Access
          </p>
        </div>

        {errorMsg && (
          <div
            style={{
              backgroundColor: '#FEE2E2',
              color: '#DC2626',
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              fontSize: '0.85rem',
              fontWeight: 650,
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '1px solid #FCA5A5',
            }}
          >
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 750, color: '#374151', marginBottom: '0.45rem' }}>
              Password
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                border: '1px solid #D1D5DB',
                borderRadius: '14px',
                padding: '0.8rem 1rem',
                backgroundColor: '#FFFFFF',
              }}
            >
              <Lock size={18} style={{ color: '#9CA3AF', flexShrink: 0 }} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '0.95rem',
                  color: '#111827',
                  fontWeight: 600,
                  background: 'transparent',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9CA3AF',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-orange"
            style={{
              width: '100%',
              padding: '0.95rem',
              fontSize: '0.98rem',
              borderRadius: '24px',
              marginTop: '0.4rem',
              boxShadow: '0 4px 14px rgba(232, 90, 42, 0.3)',
              opacity: isLoading ? 0.75 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <span>{isLoading ? 'Logging in...' : 'Login'}</span>
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
}

// Public Website Layout Component
function PublicWebsiteContent() {
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState(null);

  const handleOpenModal = () => setIsVolunteerModalOpen(true);
  const handleCloseModal = () => setIsVolunteerModalOpen(false);

  const scrollToWorkspaces = () => {
    const el = document.getElementById('workspaces');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCause = (causeId) => {
    setSearchFilter({ cause: causeId });
    const target = document.getElementById('opportunities');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
      <CinematicIntro />
      <CustomCursor />

      {/* Navigation */}
      <Navbar
        onOpenVolunteerModal={handleOpenModal}
        onOpenWorkspaceModal={scrollToWorkspaces}
      />

      <main>
        {/* 01. Hero Section */}
        <Hero onOpenVolunteerModal={handleOpenModal} />

        {/* 02. Premium Impact Section */}
        <ImpactStats />

        {/* 03. Signature 3D WebGL Impact Network */}
        <ImpactNetwork3D />

        {/* 04. Cause Categories */}
        <CauseCategories onSelectCause={handleSelectCause} />

        {/* 05. Public Opportunities Explorer */}
        <OpportunityExplorer initialSearchFilter={searchFilter} />

        {/* 06. Editorial Projects System */}
        <ProjectShowcase />

        {/* 07. Scroll Storytelling */}
        <ScrollStorytelling />

        {/* 08. Verified Hours Engine */}
        <VerifiedHoursEngine />

        {/* 09. Volunteer Journey */}
        <PlatformJourney />

        {/* 10. Signature Impact Journey */}
        <SignatureImpactJourney />

        {/* 11. Platform Workspaces */}
        <PlatformWorkspaces />

        {/* 12. About Us */}
        <AboutSection onOpenVolunteerModal={handleOpenModal} />

        {/* 13. Volunteer Directory */}
        <DirectorySection />

        {/* 14. Gallery */}
        <GallerySection />

        {/* 15. Stories */}
        <StoriesSection />

        {/* 16. Plans & Pricing */}
        <PlansSection onOpenVolunteerModal={handleOpenModal} />

        {/* 17. Trust & FAQs */}
        <FAQSection />

        {/* 18. Contact */}
        <ContactSection />
      </main>

      <Footer onOpenVolunteerModal={handleOpenModal} />
      <VolunteerModal isOpen={isVolunteerModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

// Router Assembly with Auth & /admin Protection
function AppRouter() {
  const { isAdminLoggedIn } = useCMS();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const isAdminRoute = currentPath.startsWith('/admin') || window.location.hash === '#admin';
  const isLoginRoute = currentPath === '/login';
  const isSignUpRoute = currentPath === '/signup' || currentPath === '/register';
  const isProfileRoute = currentPath === '/profile' || currentPath === '/dashboard';

  // 1. Admin Portal Route
  if (isAdminRoute) {
    if (!isAdminLoggedIn) {
      if (currentPath !== '/admin' && currentPath !== '/admin/') {
        window.history.replaceState({}, '', '/admin');
      }
      return <StandaloneAdminLoginPage />;
    }
    return (
      <AdminRoute>
        <AdminDashboard onClose={() => navigateTo('/')} />
      </AdminRoute>
    );
  }

  // 2. Login Page Route
  if (isLoginRoute) {
    return (
      <div style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
        <Navbar />
        <LoginPage onNavigate={navigateTo} />
        <Footer />
      </div>
    );
  }

  // 3. Sign Up Registration Route
  if (isSignUpRoute) {
    return (
      <div style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
        <Navbar />
        <SignUpPage onNavigate={navigateTo} />
        <Footer />
      </div>
    );
  }

  // 4. Authenticated Profile / Dashboard Route
  if (isProfileRoute) {
    return (
      <div style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
        <Navbar />
        <ProtectedRoute>
          <UserProfilePage />
        </ProtectedRoute>
        <Footer />
      </div>
    );
  }

  // 5. Default Public Website
  return <PublicWebsiteContent />;
}

export default function App() {
  return (
    <AuthProvider>
      <CMSProvider>
        <AppRouter />
      </CMSProvider>
    </AuthProvider>
  );
}
