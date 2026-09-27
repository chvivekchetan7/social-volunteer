import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'Who can become a Social Volunteer?',
      a: 'Anyone aged 16 and above with a passion for social change can join! Our community includes high school and university students, working professionals, doctors, teachers, retirees, and homemakers. No prior experience is required—we provide full orientation and training.',
    },
    {
      q: 'What is the minimum time commitment required?',
      a: 'We offer flexible volunteering pathways starting from as little as 2 to 4 hours per week during weekends. You can choose weekend teaching slots, monthly health camp support, or event-based climate cleanup drives based on your availability.',
    },
    {
      q: 'Can I volunteer remotely or virtually?',
      a: 'Yes! While ground operations take place in 18+ states, we have active virtual teams working on digital content creation, curriculum design, online tutoring, social media management, data coordination, and grant writing.',
    },
    {
      q: 'Are there any fees or registration costs to join?',
      a: 'Absolutely not. Social Volunteers is a non-profit movement. Joining and volunteering is 100% free of charge. All necessary project materials, ID badges, and campaign supplies are provided by the organization.',
    },
    {
      q: 'Will I receive a Volunteering Certificate?',
      a: 'Yes, all registered volunteers who complete a minimum of 20 verified volunteer hours receive an official verified Certificate of Social Volunteering, with detailed performance endorsements available for student academic credits or LinkedIn profiles.',
    },
    {
      q: 'How does the organization ensure safety and transparency?',
      a: 'All ground initiatives adhere to strict safety protocols, including background checks for mentors, child safety guidelines, medical safety standards during camps, and transparent monthly financial & impact reporting verified by an independent board.',
    },
  ];

  return (
    <section id="faq" className="section-padding" style={{ background: 'var(--bg-primary)', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="subheading">COMMON QUESTIONS</span>
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
            Frequently Asked <span style={{ color: 'var(--accent-emerald)', fontStyle: 'italic' }}>Questions</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Everything you need to know about joining our volunteer movement.
          </p>
        </div>

        {/* Accordions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem 1.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: isOpen ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                  borderColor: isOpen ? 'var(--accent-emerald)' : 'rgba(28, 26, 23, 0.08)',
                }}
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {faq.q}
                  </h3>
                  <div
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      color: 'var(--accent-emerald)',
                      flexShrink: 0,
                    }}
                  >
                    <ChevronDown size={22} />
                  </div>
                </div>

                {isOpen && (
                  <p
                    style={{
                      marginTop: '1rem',
                      color: 'var(--text-secondary)',
                      fontSize: '0.98rem',
                      lineHeight: 1.65,
                      borderTop: '1px solid rgba(28, 26, 23, 0.06)',
                      paddingTop: '1rem',
                    }}
                  >
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
