import React, { useState } from 'react';
import { Quote, Play, Pause, MapPin } from 'lucide-react';

export default function StoriesSection() {
  const [playingId, setPlayingId] = useState(null);

  // Real testimonials directly extracted from socialvolunteers.in reference site
  const stories = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Education Volunteer',
      initials: 'PS',
      location: 'Bengaluru, India',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      quote: "Volunteering through this platform changed my perspective on community service. The opportunities are well-organized and truly impactful.",
      tag: 'VOLUNTEER TESTIMONIAL',
      duration: '1:45 min audio snippet',
    },
    {
      id: 2,
      name: 'Arjun Patel',
      role: 'Healthcare Volunteer',
      initials: 'AP',
      location: 'Ahmedabad, India',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      quote: "I've served over 200 hours and earned multiple badges. The digital ID card makes it easy to showcase my volunteer work to employers.",
      tag: 'VOLUNTEER TESTIMONIAL',
      duration: '2:10 min audio snippet',
    },
    {
      id: 3,
      name: 'Meera Reddy',
      role: 'NGO Coordinator',
      initials: 'MR',
      location: 'Hyderabad, India',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      quote: "As an organization, we've found dedicated volunteers who share our mission. The platform streamlines the entire coordination process.",
      tag: 'PARTNER TESTIMONIAL',
      duration: '1:30 min audio snippet',
    },
  ];

  const toggleAudio = (id) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <section id="stories" className="section-padding" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
          <span className="subheading">COMMUNITY VOICES & BLOG</span>
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
            Stories That <span style={{ color: 'var(--brand-orange)', fontStyle: 'italic' }}>Inspire</span> Action
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Insights, experiences, and inspiring updates from our volunteer community.
          </p>
        </div>

        {/* Story Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {stories.map((story) => {
            const isPlaying = playingId === story.id;
            return (
              <div
                key={story.id}
                className="glass-panel story-card"
                style={{
                  padding: '2.25rem',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  background: '#FFFFFF',
                }}
              >
                <div>
                  {/* Card Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <span className="badge-tag">{story.tag}</span>
                    <Quote size={28} style={{ color: 'var(--brand-orange)', opacity: 0.6 }} />
                  </div>

                  {/* Quote text from reference site */}
                  <p
                    style={{
                      fontSize: '1.02rem',
                      fontStyle: 'italic',
                      color: 'var(--text-primary)',
                      lineHeight: 1.65,
                      marginBottom: '1.75rem',
                    }}
                  >
                    "{story.quote}"
                  </p>
                </div>

                <div>
                  {/* Audio Listening Simulation */}
                  <div
                    style={{
                      background: isPlaying ? 'var(--brand-orange-soft)' : 'var(--bg-secondary)',
                      padding: '0.65rem 1rem',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.5rem',
                      cursor: 'pointer',
                      border: isPlaying ? '1px solid var(--brand-orange)' : '1px solid transparent',
                    }}
                    onClick={() => toggleAudio(story.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <button
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: 'var(--brand-orange)',
                          color: '#FFFFFF',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        {isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: '2px' }} />}
                      </button>
                      <span style={{ fontSize: '0.8rem', fontWeight: 650, color: 'var(--text-primary)' }}>
                        {isPlaying ? 'Playing testimonial audio...' : 'Listen to story'}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{story.duration}</span>
                  </div>

                  {/* Person Details */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #E85A2A 0%, #FF8054 100%)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        flexShrink: 0,
                      }}
                    >
                      {story.initials}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 750, color: 'var(--text-primary)' }}>{story.name}</h4>
                      <div style={{ fontSize: '0.82rem', color: 'var(--brand-orange)', fontWeight: 600 }}>{story.role}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        <MapPin size={12} /> {story.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
