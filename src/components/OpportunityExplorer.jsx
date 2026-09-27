import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import OpportunityDetailModal from './OpportunityDetailModal';
import Card3DTilt from './Card3DTilt';
import { Search, Filter, MapPin, Calendar, Clock, Users, Building2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function OpportunityExplorer({ initialSearchFilter }) {
  const { opportunities } = useCMS();
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  // Filters
  const [selectedCause, setSelectedCause] = useState(initialSearchFilter?.cause || 'All');
  const [selectedLocation, setSelectedLocation] = useState(initialSearchFilter?.location || 'All');
  const [selectedType, setSelectedType] = useState(initialSearchFilter?.type || 'All');

  // Filter Logic
  const filtered = useMemo(() => {
    return opportunities.filter((item) => {
      if (selectedCause !== 'All' && item.cause.toLowerCase() !== selectedCause.toLowerCase()) return false;
      if (selectedType !== 'All' && item.type.toLowerCase() !== selectedType.toLowerCase()) return false;
      if (selectedLocation !== 'All' && selectedLocation.trim() !== '' && !item.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
      return true;
    });
  }, [opportunities, selectedCause, selectedLocation, selectedType]);

  return (
    <section id="opportunities" className="section-padding" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem' }}>
          <span className="subheading">FEATURED OPPORTUNITIES</span>
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
            Find & Reserve Your Next <span style={{ color: 'var(--brand-orange)', fontStyle: 'italic' }}>Verified</span> Shift
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem' }}>
            Browse active volunteer opportunities across India. Filter by cause, location, and commitment.
          </p>
        </div>

        {/* Interactive Filter Control Panel */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '2.5rem',
            background: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            border: '1px solid #E5E7EB',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--brand-orange)', fontWeight: 750, fontSize: '0.9rem' }}>
            <Filter size={18} />
            <span>FILTER BY:</span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Sector filter */}
            <select
              value={selectedCause}
              onChange={(e) => setSelectedCause(e.target.value)}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(24, 24, 22, 0.15)',
                fontSize: '0.88rem',
                fontWeight: 600,
                outline: 'none',
                background: '#FFFFFF',
              }}
            >
              <option value="All">All Cause Sectors</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Environment">Environment</option>
              <option value="Livelihoods">Livelihoods</option>
              <option value="Disaster Response">Disaster Response</option>
            </select>

            {/* Type filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(24, 24, 22, 0.15)',
                fontSize: '0.88rem',
                fontWeight: 600,
                outline: 'none',
                background: '#FFFFFF',
              }}
            >
              <option value="All">All Formats (In-person & Remote)</option>
              <option value="In-person">In-person Shifts</option>
              <option value="Remote">Remote / Virtual</option>
            </select>

            {/* Reset button */}
            <button
              onClick={() => {
                setSelectedCause('All');
                setSelectedLocation('All');
                setSelectedType('All');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Opportunities 3D Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {filtered.map((item) => (
            <Card3DTilt
              key={item.id}
              maxTilt={8}
              scale={1.02}
              className="opportunity-card"
              style={{
                borderRadius: 'var(--radius-md)',
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                {/* Card Image */}
                <div className="img-hover-zoom" style={{ height: '185px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span 
                    style={{
                      position: 'absolute',
                      top: '0.85rem',
                      left: '0.85rem',
                      backgroundColor: 'rgba(17, 24, 39, 0.88)',
                      color: '#FFFFFF',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {item.cause}
                  </span>
                  <span 
                    style={{
                      position: 'absolute',
                      top: '0.85rem',
                      right: '0.85rem',
                      backgroundColor: 'var(--status-approved-bg)',
                      color: 'var(--status-approved-text)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    <ShieldCheck size={13} /> Verified Hours
                  </span>
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.35rem', lineHeight: 1.3 }}>
                    {item.title}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--brand-orange)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1rem' }}>
                    <Building2 size={15} />
                    <span>{item.organisation}</span>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '1.25rem' }}>
                    {item.description}
                  </p>

                  {/* Specs List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={15} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                      <span>{item.location} ({item.type})</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={15} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                      <span>{item.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock size={15} style={{ color: 'var(--brand-orange)', flexShrink: 0 }} />
                      <span>{item.commitment} • <strong>{item.hours} Verified Hrs</strong></span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div style={{ marginTop: 'auto', borderTop: '1px solid #F0F0F0', paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>AVAILABILITY</div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--brand-orange)' }}>
                        {item.placesLeft} Places Left
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedOpportunity(item)}
                      className="btn-orange"
                      style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem', borderRadius: '20px' }}
                    >
                      <span>Reserve Slot</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>

      </div>

      {/* Opportunity Detail Drawer Modal */}
      {selectedOpportunity && (
        <OpportunityDetailModal
          opportunity={selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
        />
      )}
    </section>
  );
}
