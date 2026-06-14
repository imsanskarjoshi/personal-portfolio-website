import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import TechStack from './components/TechStack';
import Hobbies from './components/Hobbies';
import MusicPlayer from './components/MusicPlayer';
import { Menu, X, ArrowUp } from 'lucide-react';
import './App.css';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'timeline', label: 'Journey' },
    { id: 'skills', label: 'Skills' },
    { id: 'hobbies', label: 'Passions' }
  ];

  // Monitor scrolling for active nav highlighting and Scroll-To-Top button visibility
  useEffect(() => {
    const handleScroll = () => {
      // 1. Scroll-to-top visibility
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // 2. Active Section Highlighter
      const scrollPos = window.scrollY + 200;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for 3D Scroll tilt entry animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

    const elements = document.querySelectorAll('.scroll-3d-card');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Decorative Gradient Background Blobs */}
      <div className="glow-container">
        <div className="glow-blob"></div>
        <div className="glow-blob"></div>
        <div className="glow-blob"></div>
      </div>

      {/* Floating Navbar */}
      <header className="glass-panel" style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '1200px',
        zIndex: 1000,
        borderRadius: '16px',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <div 
          onClick={() => scrollToSection('home')} 
          style={{
            fontSize: '1.4rem',
            fontWeight: '800',
            fontFamily: 'var(--font-heading)',
            cursor: 'pointer',
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span className="text-gradient">Sanskar Joshi.</span>
        </div>

        {/* Desktop Navigation */}
        <nav style={{ display: 'flex', gap: '8px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              style={{
                background: activeSection === link.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                color: activeSection === link.id ? 'var(--accent-secondary)' : 'var(--text-muted)',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
              className="nav-btn"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Mobile Navigation Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-main)',
            cursor: 'pointer',
            display: 'none'
          }}
          className="mobile-nav-toggle"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="glass-panel mobile-menu-drawer" style={{
          position: 'fixed',
          top: '90px',
          left: '5%',
          width: '90%',
          zIndex: 999,
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              style={{
                width: '100%',
                textAlign: 'left',
                background: activeSection === link.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                color: activeSection === link.id ? 'var(--accent-secondary)' : 'var(--text-main)',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)'
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      {/* Page Sections */}
      <main>
        <Hero />
        <Timeline />
        <TechStack />
        <Hobbies />
      </main>

      {/* Footer */}
      <footer style={{
        padding: '60px 0 40px 0',
        background: '#07080c',
        borderTop: '1px solid var(--border-glass)',
        textAlign: 'center'
      }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Sanskar Joshi.</h3>
          
          <div style={{
            fontSize: '0.85rem',
            color: 'var(--text-dark)',
            marginTop: '20px',
            borderTop: '1px solid rgba(255,255,255,0.02)',
            paddingTop: '20px'
          }}>
            &copy; {new Date().getFullYear()} Sanskar Joshi. All rights reserved. 
          </div>
        </div>
      </footer>

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 999,
            background: 'var(--grad-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '46px',
            height: '46px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)',
            transition: 'var(--transition-fast)'
          }}
          className="scroll-top-btn"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Floating Music Player */}
      <MusicPlayer />

      {/* Embedded overrides for responsive navigation menu displays */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: block !important;
          }
        }
        .nav-btn:hover {
          color: #fff !important;
          background: rgba(255, 255, 255, 0.02) !important;
        }
        .scroll-top-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 20px rgba(6, 182, 212, 0.5) !important;
        }
      `}</style>
    </div>
  );
}
