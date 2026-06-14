import React from 'react';
import { Layers, Database, Cpu } from 'lucide-react';

export default function TechStack() {
  const stack = [
    {
      category: 'DevOps & Platform',
      icon: <Cpu size={22} className="text-gradient" />,
      color: 'var(--accent-secondary)',
      skills: [
        { name: 'AWS Cloud Services', level: 90 },
        { name: 'Kubernetes (K8s) Orchestration', level: 85 },
        { name: 'Docker & Containerization', level: 95 },
        { name: 'Jenkins & Automated CI/CD', level: 90 }
      ]
    },
    {
      category: 'Backend Core',
      icon: <Database size={22} style={{ color: 'var(--accent-primary)' }} />,
      color: 'var(--accent-primary)',
      skills: [
        { name: 'Java Programming', level: 80 },
        { name: 'Spring Boot Framework [Learning]', level: 70 }
      ]
    }
  ];

  return (
    <section id="skills" className="tech-section" style={{
      padding: '100px 0',
      background: 'var(--grad-dark)',
      position: 'relative'
    }}>
      <div className="container">
        <div className="section-header">
          <h2>Technical <span className="text-gradient">Familiarity</span></h2>
          <p>An overview of the programming languages, database structures, and operations systems I specialize in.</p>
        </div>

        <div className="grid-2">
          {stack.map((cat, idx) => (
            <div
              key={idx}
              className="glass-panel skill-category-card scroll-3d-card"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              {/* Category Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '28px',
                borderBottom: '1px solid var(--border-glass)',
                paddingBottom: '16px'
              }}>
                {cat.icon}
                <h3 style={{ fontSize: '1.35rem', fontWeight: '700' }}>{cat.category}</h3>
              </div>

              {/* Skills List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flexGrow: 1 }}>
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-item">
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px',
                      fontSize: '0.92rem',
                      fontWeight: '500'
                    }}>
                      <span>{skill.name}</span>
                      <span style={{ color: cat.color, fontWeight: '600' }}>{skill.level}%</span>
                    </div>
                    {/* Bar container */}
                    <div style={{
                      height: '6px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '100px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      {/* Active filler */}
                      <div
                        style={{
                          height: '100%',
                          width: `${skill.level}%`,
                          background: `linear-gradient(to right, ${cat.color}, var(--bg-tertiary))`,
                          borderRadius: '100px',
                          boxShadow: `0 0 10px ${cat.color}aa`,
                          transition: 'width 1.5s cubic-bezier(0.1, 0.8, 0.2, 1)'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skill-category-card:hover {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
}
