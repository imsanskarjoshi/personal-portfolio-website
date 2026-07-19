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
