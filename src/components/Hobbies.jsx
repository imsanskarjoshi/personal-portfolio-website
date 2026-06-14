import React from 'react';
import { Music, Activity, Trophy, Flame, Sparkles } from 'lucide-react';

export default function Hobbies() {
  const hobbiesList = [
    {
      title: 'Cricket',
      desc: 'An active field sport I enjoy playing regularly, focusing on timing, strategy, and team coordination.',
      icon: <Trophy size={24} style={{ color: 'var(--accent-secondary)' }} />,
      grad: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)',
      glow: 'rgba(6, 182, 212, 0.2)'
    },
    {
      title: 'Football',
      desc: 'A high-stamina game of position and team dynamic that keeps me physically and mentally sharp.',
      icon: <Activity size={24} style={{ color: 'var(--accent-primary)' }} />,
      grad: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(217, 70, 239, 0.05) 100%)',
      glow: 'rgba(99, 102, 241, 0.2)'
    },
    {
      title: 'Table Tennis',
      desc: 'A rapid reflex sport requiring immediate hand-eye coordination, quick rallies, and spin control.',
      icon: <Flame size={24} style={{ color: 'var(--accent-tertiary)' }} />,
      grad: 'linear-gradient(135deg, rgba(217, 70, 239, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
      glow: 'rgba(217, 70, 239, 0.2)'
    },
    {
      title: 'Badminton',
      desc: 'A high-speed court sport that demands quick footwork, timing, and energetic rallying.',
      icon: <Sparkles size={24} style={{ color: 'var(--accent-secondary)' }} />,
      grad: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)',
      glow: 'rgba(6, 182, 212, 0.2)'
    },
    {
      title: 'Singing',
      desc: 'A creative outlet to practice vocal control, learn scales, and appreciate different musical genres.',
      icon: <Music size={24} style={{ color: 'var(--accent-tertiary)' }} />,
      grad: 'linear-gradient(135deg, rgba(217, 70, 239, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
      glow: 'rgba(217, 70, 239, 0.2)'
    }
  ];

  return (
    <section id="hobbies" className="hobbies-section" style={{
      padding: '100px 0',
      background: 'var(--grad-dark)',
      position: 'relative'
    }}>
      <div className="container">
        <div className="section-header">
          <h2>Passions & <span className="text-gradient">Interests</span></h2>
          <p>What fuels my curiosity and creative expression outside of standard office hours.</p>
        </div>

        <div className="grid-3">
          {hobbiesList.map((hobby, idx) => (
            <div
              key={idx}
              className="glass-panel hobby-card scroll-3d-card"
              style={{
                padding: '30px 24px',
                background: hobby.grad,
                border: '1px solid var(--border-glass)',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '16px',
                transition: 'var(--transition-smooth)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Inner glowing halo */}
              <div style={{
                position: 'absolute',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: hobby.glow,
                filter: 'blur(30px)',
                top: '-30px',
                right: '-30px',
                pointerEvents: 'none'
              }}></div>

              {/* Icon Container */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-glass)',
                padding: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {hobby.icon}
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>
                {hobby.title}
              </h3>
              
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                lineHeight: '1.6'
              }}>
                {hobby.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hobby-card:hover {
          transform: translateY(-8px);
          border-color: var(--accent-secondary) !important;
          box-shadow: 0 12px 30px rgba(6, 182, 212, 0.15);
        }
      `}</style>
    </section>
  );
}
