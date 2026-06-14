import React from 'react';
import { Sparkles, Users, Flame, Star, ExternalLink, Activity } from 'lucide-react';

export default function SideHustle() {
  const metrics = [
    { label: 'Monthly Revenue', value: '$1,450', icon: <Flame size={18} style={{ color: '#ef4444' }} /> },
    { label: 'Active SaaS Users', value: '5,200+', icon: <Users size={18} style={{ color: 'var(--accent-secondary)' }} /> },
    { label: 'Chrome Stars', value: '450+', icon: <Star size={18} style={{ color: '#f59e0b' }} /> }
  ];

  return (
    <section id="sidehustle" className="hustle-section" style={{
      padding: '100px 0',
      position: 'relative'
    }}>
      <div className="container">
        <div className="section-header">
          <h2>Side <span className="text-gradient">Hustle</span> Ventures</h2>
          <p>Entrepreneurial projects I design, construct, and scale independently outside of my standard roles.</p>
        </div>

        <div className="glass-panel" style={{
          padding: '40px',
          background: 'linear-gradient(135deg, rgba(18, 20, 32, 0.75), rgba(10, 11, 16, 0.75))',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Neon abstract glow blob in corner */}
          <div style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: 'var(--accent-tertiary)',
            filter: 'blur(75px)',
            opacity: 0.15,
            pointerEvents: 'none'
          }}></div>

          <div className="grid-2" style={{ alignItems: 'center' }}>
            {/* Project description and details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--accent-tertiary)',
                fontWeight: '600',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                <Sparkles size={16} /> Active Product Venture
              </div>
              
              <h3 style={{ fontSize: '2.2rem', fontWeight: '800', lineHeight: '1.2' }}>
                FocusFlow Chrome Extension
              </h3>
              
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                FocusFlow is a minimalist productivity companion that automatically blocks distractions, tracks deep work intervals, and visualizes focus streaks right in the browser. I conceptualized, built, and launched it to the Chrome Web Store, scaling it to thousands of weekly active users.
              </p>

              {/* Metrics row */}
              <div style={{
                display: 'flex',
                gap: '16px',
                marginTop: '12px',
                flexWrap: 'wrap'
              }}>
                {metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="glass-card"
                    style={{
                      padding: '16px 20px',
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      minWidth: '130px',
                      background: 'rgba(255, 255, 255, 0.01)',
                      border: '1px solid var(--border-glass)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dark)', fontSize: '0.85rem' }}>
                      {metric.icon}
                      {metric.label}
                    </div>
                    <span style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--text-main)' }}>
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                  style={{
                    background: 'var(--grad-accent)',
                    boxShadow: '0 4px 15px rgba(217, 70, 239, 0.25)'
                  }}
                  onMouseEnter={(e) => e.target.style.boxShadow = '0 6px 20px rgba(217, 70, 239, 0.4)'}
                  onMouseLeave={(e) => e.target.style.boxShadow = '0 4px 15px rgba(217, 70, 239, 0.25)'}
                >
                  Visit Chrome Store <ExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* Graphic Showcase mockup */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              position: 'relative'
            }}>
              {/* Floating window panel simulation */}
              <div className="glass-panel" style={{
                width: '100%',
                maxWidth: '400px',
                padding: '20px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  borderBottom: '1px solid var(--border-glass)',
                  paddingBottom: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Activity size={18} style={{ color: 'var(--accent-tertiary)' }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)', fontFamily: 'monospace' }}>
                      Focus Session active
                    </span>
                  </div>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#22c55e',
                    boxShadow: '0 0 6px #22c55e',
                    animation: 'blink 1.5s infinite'
                  }}></div>
                </div>

                {/* Simulated content info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    textAlign: 'center',
                    fontFamily: 'monospace',
                    margin: '10px 0',
                    color: 'var(--text-main)'
                  }}>
                    24:59
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-dark)',
                    textAlign: 'center',
                    marginTop: '-8px'
                  }}>
                    Task: Implement Portfolio Estimation
                  </div>
                  <div style={{
                    height: '4px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: '60%',
                      background: 'var(--grad-accent)'
                    }}></div>
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px',
                    marginTop: '8px'
                  }}>
                    <div className="glass-card" style={{ padding: '10px', fontSize: '0.8rem', textAlign: 'center' }}>
                      🔥 12h Streak
                    </div>
                    <div className="glass-card" style={{ padding: '10px', fontSize: '0.8rem', textAlign: 'center' }}>
                      🛡️ 15 Blocked
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 0.2 }
          50% { opacity: 1 }
        }
      `}</style>
    </section>
  );
}
