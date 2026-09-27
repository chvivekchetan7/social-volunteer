import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import Card3DTilt from './Card3DTilt';
import { Camera, MapPin, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GallerySection() {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const { gallery: cmsGallery } = useCMS();

  const fallbackPhotos = [
    {
      title: 'Community Digital Learning Hub',
      category: 'Education',
      location: 'Bengaluru, KA',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Free Medical Diagnostic Camp',
      category: 'Healthcare',
      location: 'Patna, BR',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Miyawaki Tree Plantation Drive',
      category: 'Environment',
      location: 'Mumbai, MH',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Women Artisan Self-Help Workshop',
      category: 'Livelihoods',
      location: 'Ganjam, OD',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const photos = cmsGallery && cmsGallery.length > 0 ? cmsGallery : fallbackPhotos;

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) => (prev + 1) % photos.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) => (prev - 1 + photos.length) % photos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, photos.length]);

  const activeLightbox = activeLightboxIndex !== null ? photos[activeLightboxIndex] : null;

  return (
    <section id="gallery" className="section-padding" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
          <span className="subheading">GALLERY & MOMENTS</span>
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
            Moments Captured <span style={{ color: 'var(--brand-orange)', fontStyle: 'italic' }}>on the Field</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem' }}>
            Browse photos from our volunteer activities, health camps, and community events across India.
          </p>
        </div>

        {/* Asymmetric 3D Editorial Photo Gallery */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {photos.map((item, idx) => (
            <Card3DTilt
              key={idx}
              maxTilt={6}
              scale={1.02}
              className="gallery-item"
              style={{
                borderRadius: 'var(--radius-md)',
                height: '320px',
                overflow: 'hidden',
              }}
              onClick={() => setActiveLightboxIndex(idx)}
            >
              <div className="img-hover-zoom" style={{ width: '100%', height: '100%', position: 'relative' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                
                {/* Overlay Content */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0) 60%)',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    color: '#FFFFFF',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#FF8054',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginBottom: '0.2rem',
                    }}
                  >
                    {item.category}
                  </span>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 750, marginBottom: '0.2rem', textShadow: '0 2px 6px rgba(0,0,0,0.4)' }}>{item.title}</h4>
                  <div style={{ fontSize: '0.8rem', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={12} /> {item.location}
                  </div>
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>

      </div>

      {/* 3D Lightbox Modal with Keyboard Navigation */}
      {activeLightbox && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(11, 15, 23, 0.94)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
          onClick={() => setActiveLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveLightboxIndex(null)}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <X size={24} />
          </button>

          {/* Previous Image */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveLightboxIndex((prev) => (prev - 1 + photos.length) % photos.length);
            }}
            style={{
              position: 'absolute',
              left: '2rem',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <ChevronLeft size={28} />
          </button>

          {/* Next Image */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveLightboxIndex((prev) => (prev + 1) % photos.length);
            }}
            style={{
              position: 'absolute',
              right: '2rem',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <ChevronRight size={28} />
          </button>

          {/* Active Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '900px',
              width: '100%',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 30px 70px rgba(0, 0, 0, 0.8), 0 0 30px rgba(232, 90, 42, 0.3)',
              border: '1px solid rgba(255, 128, 84, 0.3)',
              background: '#0B0F17',
              color: '#FFFFFF',
            }}
          >
            <img
              src={activeLightbox.image}
              alt={activeLightbox.title}
              style={{ width: '100%', maxHeight: '65vh', objectFit: 'cover' }}
            />
            <div style={{ padding: '2rem' }}>
              <span style={{ color: '#FF8054', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.15em' }}>
                {activeLightbox.category.toUpperCase()} • {activeLightbox.location}
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginTop: '0.3rem', color: '#FFFFFF' }}>
                {activeLightbox.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
