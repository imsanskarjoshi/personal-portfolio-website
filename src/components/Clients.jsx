import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

export default function Clients() {
  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Founder',
      company: 'ApexDesign Studio',
      quote: "Sanskar designed and built our personal finance mobile app using Flutter. The UI is incredibly fluid, and he successfully published it to the Google Play Store on schedule.",
      stars: 5,
      avatar: 'SJ'
    },
    {
      name: 'Alex Rivera',
      role: 'CTO',
      company: 'CloudPulse Analytics',
      quote: "He migrated our core microservices to AWS EKS and established a robust ArgoCD GitOps pipeline. Our deployment cycles went from hours to minutes. A highly skilled DevOps engineer.",
      stars: 5,
      avatar: 'AR'
    },
    {
      name: 'Michael Chang',
      role: 'Product Lead',
      company: 'Zenith Labs',
      quote: "His configuration of Prometheus and Grafana alerts on our Kubernetes cluster saved us from multiple production bottlenecks. His technical skill in Jenkins and Docker automations is exceptional.",
      stars: 5,
      avatar: 'MC'
    }
  ];

  const brandLogos = [
    'CloudPulse', 'ApexDesign', 'ZenithLabs', 'AppForge', 'DevFlow'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="clients" className="clients-section" style={{
      padding: '100px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div className="section-header">
          <h2>Client <span className="text-gradient">Feedback</span></h2>
          <p>What partners and business owners say about collaborating with me on complex software projects.</p>
        </div>

        {/* Brand Logos Horizontal Scrolling Marquee */}
        <div style={{
          marginBottom: '60px',
          padding: '20px 0',
          borderTop: '1px solid var(--border-glass)',
          borderBottom: '1px solid var(--border-glass)',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: '30px',
            flexWrap: 'wrap'
          }}>
            {brandLogos.map((brand, idx) => (
              <span
                key={idx}
                style={{
                  color: 'var(--text-dark)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  letterSpacing: '0.05em',
                  opacity: 0.6,
                  transition: 'var(--transition-fast)'
                }}
                className="brand-logo"
                onMouseEnter={(e) => e.target.style.opacity = 1}
                onMouseLeave={(e) => e.target.style.opacity = 0.6}
              >
                // {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative'
        }}>
          <div className="glass-panel" style={{
            padding: '40px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '20px'
          }}>
            <Quote size={40} style={{ color: 'var(--accent-secondary)', opacity: 0.2 }} />
            
            {/* Stars */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {[...Array(testimonials[currentIndex].stars)].map((_, i) => (
                <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>

            {/* Quote */}
            <p style={{
              fontSize: '1.2rem',
              lineHeight: '1.8',
              color: 'var(--text-main)',
              fontStyle: 'italic',
              transition: 'var(--transition-smooth)'
            }}>
              "{testimonials[currentIndex].quote}"
            </p>

            {/* Profile Avatar and Title */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginTop: '12px'
            }}>
              {/* Avatar placeholder */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--grad-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: '700',
                fontSize: '1rem'
              }}>
                {testimonials[currentIndex].avatar}
              </div>
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ fontSize: '1.05rem', margin: 0, fontWeight: '700' }}>
                  {testimonials[currentIndex].name}
                </h4>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                </span>
              </div>
            </div>

            {/* Slider Navigation arrows */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginTop: '24px'
            }}>
              <button
                onClick={prevTestimonial}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-main)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
                className="nav-arrow"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextTestimonial}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-main)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
                className="nav-arrow"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .nav-arrow:hover {
          background: var(--accent-primary) !important;
          border-color: transparent !important;
        }
      `}</style>
    </section>
  );
}
