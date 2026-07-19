import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, Code } from 'lucide-react';
import { Github, Linkedin, Twitter } from './BrandIcons';
import sanskarProfile from '../assets/sanskar_profile.png';

const titles = [
  "DevOps Engineer",
  "Cloud, AI, & Automation Enthusiast",
  "Aspiring Backend & Java Developer",
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer;
    const fullText = titles[titleIndex] || '';
    if (!fullText) return;
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, Math.max(0, currentText.length - 1)));
        setTypingSpeed(40);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, Math.min(fullText.length, currentText.length + 1)));
        setTypingSpeed(100);
      }, typingSpeed);
    }

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 1500); // Wait before deleting
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex]);

  return (
    <section id="home" className="hero-section" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '120px 0 60px 0',
      position: 'relative'
    }}>
      <div className="container grid-2" style={{ alignItems: 'center', paddingTop: '50px' }}>
        {/* Hero Info */}
        <div className="hero-info" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="tagline" style={{
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            color: 'var(--accent-primary)',
            padding: '6px 14px',
            borderRadius: '100px',
            fontSize: '0.85rem',
            fontWeight: '600',
            width: 'fit-content',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Available for Freelance & Full-time Roles
          </div>
          
          <h1 className="hero-title">
            Hi, I'm <span className="text-gradient">Sanskar Joshi</span> <br />
            <span className="hero-subtitle">
              I am a <span className="text-gradient-alt">{currentText}</span>
              <span className="cursor" style={{
                animation: 'blink 1s step-end infinite',
                borderRight: '3px solid var(--accent-tertiary)',
                marginLeft: '4px'
              }}>&nbsp;</span>
            </span>
          </h1>
          
          <p className="hero-desc">
            I orchestrate cloud infrastructures, construct automated CI/CD pipelines, and build backend systems. Bridging platform scalability with clean development.
          </p>

          <div className="hero-actions" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#timeline" className="btn-primary">
              View Journey <ArrowRight size={18} />
            </a>
            <a href="mailto:sanskarjoshi@example.com" className="btn-secondary">
              Get In Touch
            </a>
          </div>

          <div className="social-links" style={{ display: 'flex', gap: '20px', marginTop: '16px', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-dark)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Follow me:
            </span>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon" style={{
              color: 'var(--text-muted)', transition: 'var(--transition-fast)'
            }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon" style={{
              color: 'var(--text-muted)', transition: 'var(--transition-fast)'
            }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
              <Linkedin size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon" style={{
              color: 'var(--text-muted)', transition: 'var(--transition-fast)'
            }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
              <Twitter size={20} />
            </a>
            <a href="mailto:hello@example.com" className="social-icon" style={{
              color: 'var(--text-muted)', transition: 'var(--transition-fast)'
            }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Hero Visual Showcase: Profile Photo & Code Terminal */}
        <div className="hero-visual" style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          {/* 1. Profile Picture Frame */}
          <div className="hero-photo-wrapper" style={{ maxWidth: '360px', width: '100%' }}>
            <div className="hero-photo-frame">
              <img 
                src={sanskarProfile} 
                alt="Sanskar Joshi" 
                className="hero-photo-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Styles inline fallback */}
      <style>{`
        @keyframes blink {
          50% { border-color: transparent }
        }
      `}</style>
    </section>
  );
}
