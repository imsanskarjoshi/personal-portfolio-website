import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Copy, Check } from 'lucide-react';

export default function InteractiveContact() {
  const [projectType, setProjectType] = useState('saas');
  const [features, setFeatures] = useState({
    auth: false,
    payments: false,
    websockets: false,
    adminPanel: false,
    charts: false
  });
  const [timelineWeeks, setTimelineWeeks] = useState(4);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  // Estimation variables
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [estimatedHours, setEstimatedHours] = useState(0);

  const projectBases = {
    saas: { name: 'Full-Stack SaaS Application', baseCost: 1500, baseHours: 60 },
    mobile: { name: 'Cross-Platform Mobile App', baseCost: 2000, baseHours: 80 },
    design: { name: 'Custom UI/UX Prototype', baseCost: 600, baseHours: 24 },
    api: { name: 'API Services & Integration', baseCost: 800, baseHours: 32 }
  };

  const featurePricing = {
    auth: { name: 'Secure Authentication & Auth0', cost: 250, hours: 10 },
    payments: { name: 'Stripe Payment Processing', cost: 300, hours: 12 },
    websockets: { name: 'Real-time WebSocket Sync', cost: 400, hours: 16 },
    adminPanel: { name: 'Comprehensive Admin Console', cost: 500, hours: 20 },
    charts: { name: 'Advanced Interactive Graphs', cost: 300, hours: 12 }
  };

  useEffect(() => {
    // 1. Calculate Base values
    const selectedBase = projectBases[projectType];
    let totalCost = selectedBase.baseCost;
    let totalHours = selectedBase.baseHours;

    // 2. Add Feature values
    Object.keys(features).forEach((key) => {
      if (features[key]) {
        totalCost += featurePricing[key].cost;
        totalHours += featurePricing[key].hours;
      }
    });

    // 3. Apply Timeline factor (Shorter timeline requires express rush premium)
    // base timeline is 4 weeks.
    // 1 week = +40% cost, 2 weeks = +20% cost, 4 weeks = +0%, 8-12 weeks = -10% cost
    let multiplier = 1.0;
    if (timelineWeeks <= 1) multiplier = 1.4;
    else if (timelineWeeks === 2) multiplier = 1.25;
    else if (timelineWeeks === 3) multiplier = 1.1;
    else if (timelineWeeks >= 8) multiplier = 0.9;

    totalCost = Math.round(totalCost * multiplier);

    setEstimatedCost(totalCost);
    setEstimatedHours(totalHours);
  }, [projectType, features, timelineWeeks]);

  const handleFeatureToggle = (key) => {
    setFeatures((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Pre-fill email link
  const getProposalSummaryText = () => {
    const selectedBase = projectBases[projectType].name;
    const selectedFeatures = Object.keys(features)
      .filter((k) => features[k])
      .map((k) => featurePricing[k].name)
      .join(', ');

    return `Project Blueprint Summary:
---------------------------
- Project Type: ${selectedBase}
- Additional Features: ${selectedFeatures || 'None'}
- Target Timeline: ${timelineWeeks} week(s)
- Estimated Investment: ~$${estimatedCost}
- Estimated Scope: ~${estimatedHours} hours

Client Details:
- Name: ${name || 'N/A'}
- Email: ${email || 'N/A'}
- Custom Notes: ${notes || 'None'}`;
  };

  const mailtoUrl = () => {
    const subject = encodeURIComponent('SaaS Project Estimator Proposal Request');
    const body = encodeURIComponent(getProposalSummaryText());
    return `mailto:hello@example.com?subject=${subject}&body=${body}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getProposalSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="estimator" className="contact-section" style={{
      padding: '100px 0',
      position: 'relative'
    }}>
      <div className="container">
        <div className="section-header">
          <h2>Blueprint <span className="text-gradient">Estimator</span></h2>
          <p>Design your custom digital project scope below, review real-time pricing and hours, and lock in a direct inquiry.</p>
        </div>

        <div className="grid-2">
          {/* Controls Panel */}
          <div className="glass-panel" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '24px', fontWeight: '700' }}>1. Project Specifications</h3>
            
            {/* Project Type */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '10px', fontWeight: '600' }}>
                SERVICE TYPE
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {Object.keys(projectBases).map((type) => (
                  <button
                    key={type}
                    onClick={() => setProjectType(type)}
                    style={{
                      background: projectType === type ? 'var(--grad-primary)' : 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid',
                      borderColor: projectType === type ? 'transparent' : 'var(--border-glass)',
                      color: '#fff',
                      padding: '12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    {projectBases[type].name.split(' ').slice(1).join(' ') || projectBases[type].name}
                  </button>
                ))}
              </div>
            </div>

            {/* Scope features */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: '600' }}>
                ADDITIONAL SCOPE & INTEGRATIONS
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {Object.keys(featurePricing).map((key) => (
                  <div
                    key={key}
                    onClick={() => handleFeatureToggle(key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.01)',
                      border: `1px solid ${features[key] ? 'var(--accent-primary)' : 'var(--border-glass)'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: '1px solid var(--text-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: features[key] ? 'var(--accent-primary)' : 'transparent',
                        borderColor: features[key] ? 'var(--accent-primary)' : 'var(--text-dark)'
                      }}>
                        {features[key] && <Check size={12} color="#fff" strokeWidth={3} />}
                      </div>
                      <span style={{ fontSize: '0.9rem', color: features[key] ? '#fff' : 'var(--text-muted)' }}>
                        {featurePricing[key].name}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--accent-secondary)', fontWeight: '600' }}>
                      +${featurePricing[key].cost}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Slider */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                  TARGET TIMELINE
                </label>
                <span style={{ color: 'var(--accent-tertiary)', fontWeight: '700', fontSize: '0.95rem' }}>
                  {timelineWeeks} {timelineWeeks === 1 ? 'Week' : 'Weeks'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={timelineWeeks}
                onChange={(e) => setTimelineWeeks(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--accent-tertiary)',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dark)', marginTop: '4px' }}>
                <span>1 Week (Express)</span>
                <span>4 Weeks (Standard)</span>
                <span>12 Weeks (Extended)</span>
              </div>
            </div>
          </div>

          {/* Estimates and Checkout */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-panel" style={{
              padding: '32px',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(99, 102, 241, 0.08))',
              borderColor: 'var(--border-glow)'
            }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', fontWeight: '700' }}>2. Dynamic Summary</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Project Structure</span>
                  <span style={{ fontWeight: '600' }}>{projectBases[projectType].name.split(' ')[0]} Base</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Estimated Hours</span>
                  <span style={{ fontWeight: '600' }}>~{estimatedHours} Hours</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Timeline Delivery</span>
                  <span style={{ fontWeight: '600', color: 'var(--accent-tertiary)' }}>{timelineWeeks} Weeks</span>
                </div>
                
                {/* Total Cost Display */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '12px'
                }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: '700' }}>Estimated Value</span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--accent-secondary)' }}>
                      ${estimatedCost}
                    </span>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dark)', marginTop: '-4px' }}>
                      USD (Approx. Proposal)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Send Form */}
            <div className="glass-panel" style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '16px', fontWeight: '700' }}>3. Secure Booking / Inquiry</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="estimator-inputs" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '6px',
                      padding: '10px 14px',
                      color: '#fff',
                      fontSize: '0.9rem'
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '6px',
                      padding: '10px 14px',
                      color: '#fff',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
                <textarea
                  rows="3"
                  placeholder="Additional project details or message..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '6px',
                    padding: '10px 14px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    resize: 'none'
                  }}
                ></textarea>

                <div className="estimator-actions" style={{ display: 'flex', gap: '12px', marginTop: '4px', flexWrap: 'wrap' }}>
                  <a
                    href={mailtoUrl()}
                    className="btn-primary"
                    style={{ flexGrow: 1, justifyContent: 'center' }}
                  >
                    Email Proposal <Send size={16} />
                  </a>
                  <button
                    onClick={copyToClipboard}
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid var(--border-glass)',
                      color: '#fff',
                      padding: '12px 18px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    className="copy-btn"
                  >
                    {copied ? <Check size={18} style={{ color: '#22c55e' }} /> : <Copy size={18} />}
                    {copied ? 'Copied!' : 'Copy Summary'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .copy-btn:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: var(--accent-primary) !important;
        }
        @media (max-width: 500px) {
          .estimator-inputs {
            grid-template-columns: 1fr !important;
          }
          .estimator-actions {
            flex-direction: column !important;
          }
          .estimator-actions a, .estimator-actions button {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
