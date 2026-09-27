import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import Card3DTilt from './Card3DTilt';
import { Check, Minus, ArrowRight, Sparkles } from 'lucide-react';

export default function PlansSection({ onOpenVolunteerModal }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { plans: cmsPlans } = useCMS();

  // Fallback plans if cmsPlans is empty
  const fallbackPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Free',
      subtitle: 'Free',
      desc: 'Perfect for individual volunteers getting started',
      highlight: false,
      cta: 'Get Started',
      features: [
        'Browse volunteer opportunities',
        'Apply to unlimited opportunities',
        'Basic profile',
        'Track volunteer hours',
        'Digital volunteer ID',
        'Email support',
      ],
    },
    {
      id: 'professional',
      name: 'Professional',
      badge: 'Recommended',
      price: '₹499',
      period: '/month',
      desc: 'For dedicated volunteers seeking advanced features',
      highlight: true,
      cta: 'Upgrade Now',
      features: [
        'Everything in Basic',
        'Priority application review',
        'Advanced profile with portfolio',
        'Skill verification badges',
        'Certificate downloads',
        'Monthly impact reports',
        'Priority support',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₹999',
      period: '/month',
      desc: 'For organizations and volunteer coordinators',
      highlight: false,
      cta: 'Contact Sales',
      features: [
        'Everything in Professional',
        'Post unlimited opportunities',
        'Manage volunteer applications',
        'Team collaboration tools',
        'Analytics dashboard',
        'Custom branding',
        'Dedicated account manager',
        'API access',
      ],
    },
  ];

  const plans = cmsPlans && cmsPlans.length > 0
    ? cmsPlans.filter(p => p.active !== false)
    : fallbackPlans;

  // Comparison Matrix Data
  const comparisonRows = [
    { feature: 'Browse & Apply Opportunities', basic: true, pro: true, premium: true },
    { feature: 'Volunteer Hour Tracking', basic: true, pro: true, premium: true },
    { feature: 'Digital Volunteer ID', basic: true, pro: true, premium: true },
    { feature: 'Email Support', basic: true, pro: true, premium: true },
    { feature: 'Priority Application Review', basic: false, pro: true, premium: true },
    { feature: 'Advanced Profile & Portfolio', basic: false, pro: true, premium: true },
    { feature: 'Skill Verification Badges', basic: false, pro: true, premium: true },
    { feature: 'Certificate Downloads', basic: false, pro: true, premium: true },
    { feature: 'Monthly Impact Reports', basic: false, pro: true, premium: true },
    { feature: 'Priority Support', basic: false, pro: true, premium: true },
    { feature: 'Post Unlimited Opportunities', basic: false, pro: false, premium: true },
    { feature: 'Manage Volunteer Applications', basic: false, pro: false, premium: true },
    { feature: 'Team Collaboration Tools', basic: false, pro: false, premium: true },
    { feature: 'Analytics Dashboard', basic: false, pro: false, premium: true },
    { feature: 'Custom Branding & API Access', basic: false, pro: false, premium: true },
    { feature: 'Dedicated Account Manager', basic: false, pro: false, premium: true },
  ];

  return (
    <section id="plans" className="section-padding" style={{ background: '#FFFFFF', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4rem' }}>
          <span className="subheading">PLANS & PRICING</span>
          <h2 className="heading-lg" style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Choose the Right Plan for <span style={{ color: 'var(--brand-orange)', fontStyle: 'italic' }}>Your Impact</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem', lineHeight: 1.6 }}>
            Transparent pricing for individual volunteers, active contributors, and organizations.
          </p>
        </div>

        {/* 3D Pricing Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch',
            marginBottom: '5rem',
            overflow: 'visible',
          }}
        >
          {plans.map((p) => {
            const isHighlighted = p.highlight;

            return (
              <Card3DTilt
                key={p.id}
                maxTilt={2.5}
                scale={1.015}
                className="plan-card"
                style={{
                  borderRadius: '20px',
                  background: isHighlighted ? '#FFF9F5' : '#FFFFFF',
                  border: isHighlighted
                    ? '2px solid var(--brand-orange)'
                    : '1px solid #E5E7EB',
                }}
              >
                <div
                  style={{
                    padding: '2.5rem 2rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    {/* Category Pill / Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                      <span
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          color: isHighlighted ? 'var(--brand-orange)' : 'var(--text-muted)',
                        }}
                      >
                        {p.name} PLAN
                      </span>

                      {isHighlighted && (
                        <span 
                          style={{ 
                            backgroundColor: 'var(--brand-orange)', 
                            color: '#FFFFFF', 
                            padding: '0.25rem 0.75rem', 
                            borderRadius: '20px', 
                            fontSize: '0.75rem', 
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            boxShadow: '0 4px 12px rgba(232, 90, 42, 0.4)',
                          }}
                        >
                          <Sparkles size={12} /> {p.badge}
                        </span>
                      )}
                    </div>

                    {/* Title & Price */}
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                      {p.name}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem', marginBottom: '0.75rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '2.5rem',
                          fontWeight: 700,
                          color: isHighlighted ? 'var(--brand-orange)' : 'var(--text-primary)',
                          lineHeight: 1,
                        }}
                      >
                        {p.price}
                      </span>
                      {p.period && (
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                          {p.period}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                      {p.desc}
                    </p>

                    <div style={{ borderTop: '1px solid #F0F0F0', paddingTop: '1.25rem', marginBottom: '1.75rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '0.85rem', textTransform: 'uppercase' }}>
                        WHAT'S INCLUDED:
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {p.features.map((feat, fidx) => (
                          <div key={fidx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                            <div
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                background: 'var(--brand-orange-soft)',
                                color: 'var(--brand-orange)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                marginTop: '2px',
                              }}
                            >
                              <Check size={12} />
                            </div>
                            <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 550, lineHeight: 1.4 }}>
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA Action Button */}
                  <button
                    onClick={() => {
                      if (p.id === 'premium') {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      } else if (onOpenVolunteerModal) {
                        onOpenVolunteerModal();
                      } else {
                        window.history.pushState({}, '', '/signup');
                        window.dispatchEvent(new Event('popstate'));
                      }
                    }}
                    className="btn-orange"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1.5rem',
                      fontSize: '0.92rem',
                      borderRadius: '24px',
                      backgroundColor: isHighlighted ? 'var(--brand-orange)' : '#111827',
                    }}
                  >
                    <span>{p.cta}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </Card3DTilt>
            );
          })}
        </div>

        {/* Plan Feature Comparison Table */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="subheading">FEATURE COMPARISON</span>
            <h3 className="heading-md" style={{ color: 'var(--text-primary)' }}>
              Compare Detailed Membership Capabilities
            </h3>
          </div>

          <div
            style={{
              borderRadius: 'var(--radius-md)',
              padding: '2rem',
              background: 'var(--bg-primary)',
              border: '1px solid #E5E7EB',
              boxShadow: 'var(--shadow-sm)',
              overflowX: 'auto',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E7EB', color: 'var(--text-primary)' }}>
                  <th style={{ padding: '1rem', fontSize: '0.95rem', fontWeight: 800 }}>FEATURES</th>
                  <th style={{ padding: '1rem', fontSize: '0.95rem', fontWeight: 800, textAlign: 'center' }}>BASIC (Free)</th>
                  <th style={{ padding: '1rem', fontSize: '0.95rem', fontWeight: 800, textAlign: 'center', color: 'var(--brand-orange)' }}>
                    PROFESSIONAL (₹499)
                  </th>
                  <th style={{ padding: '1rem', fontSize: '0.95rem', fontWeight: 800, textAlign: 'center' }}>PREMIUM (₹999)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #F0F0F0' }}>
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 550 }}>
                      {row.feature}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                      {row.basic ? (
                        <Check size={18} style={{ color: 'var(--brand-orange)', margin: '0 auto' }} />
                      ) : (
                        <Minus size={18} style={{ color: 'var(--text-muted)', opacity: 0.4, margin: '0 auto' }} />
                      )}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'center', background: 'rgba(232, 90, 42, 0.02)' }}>
                      {row.pro ? (
                        <Check size={18} style={{ color: 'var(--brand-orange)', margin: '0 auto' }} />
                      ) : (
                        <Minus size={18} style={{ color: 'var(--text-muted)', opacity: 0.4, margin: '0 auto' }} />
                      )}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                      {row.premium ? (
                        <Check size={18} style={{ color: 'var(--brand-orange)', margin: '0 auto' }} />
                      ) : (
                        <Minus size={18} style={{ color: 'var(--text-muted)', opacity: 0.4, margin: '0 auto' }} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
