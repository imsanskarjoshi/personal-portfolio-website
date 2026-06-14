import React from 'react';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';

export default function Timeline() {
  const workExperience = [
    {
      period: 'Aug 2023 - Present',
      role: 'DevOps Engineer',
      company: 'Tensech (Remote / WFH)',
      desc: 'Managing scalable cloud environments on AWS, containerizing system resources using Docker & Kubernetes, automating build releases with Jenkins, and supporting developers through continuous delivery structures.'
    }
  ];

  const educationHistory = [
    {
      period: '2019 - 2023',
      degree: 'B.Tech in Computer Science',
      institution: 'Acropolis Technical Campus, Indore',
      desc: 'Completed undergraduate degree with 8.0 CGPA.'
    },
    {
      period: '2018 - 2019',
      degree: 'Class 12th (CBSE)',
      institution: 'Sarafa Vidya Niketan Indore',
      desc: 'Completed Higher Secondary with 71% in PCM (Physics, Chemistry, Mathematics) + Computer Science.'
    },
    {
      period: '2016 - 2017',
      degree: 'Class 10th (CBSE)',
      institution: 'Sarafa Vidya Niketan Indore',
      desc: 'Completed High School with a perfect 10.0 CGPA score.'
    }
  ];

  return (
    <section id="timeline" className="timeline-section" style={{
      padding: '100px 0',
      background: 'var(--grad-dark)',
      position: 'relative'
    }}>
      <div className="container">
        <div className="section-header">
          <h2>My <span className="text-gradient">Journey</span></h2>
          <p>A chronological overview of my professional development and educational path.</p>
        </div>

        <div className="grid-2">
          {/* Work Timeline */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '32px',
              justifyContent: 'center'
            }}>
              <Briefcase size={24} style={{ color: 'var(--accent-secondary)' }} />
              <h3 style={{ fontSize: '1.8rem', fontWeight: '700' }}>Work Experience</h3>
            </div>

            <div className="timeline-container" style={{
              position: 'relative',
              paddingLeft: '24px',
              borderLeft: '2px solid rgba(255, 255, 255, 0.05)'
            }}>
              <div className="timeline-line-glow" style={{
                position: 'absolute',
                top: 0,
                left: '-2px',
                width: '2px',
                height: '100%',
                background: 'linear-gradient(to bottom, var(--accent-secondary), transparent)',
                opacity: 0.5
              }}></div>
              
              {workExperience.map((item, idx) => (
                <div key={idx} className="timeline-item" style={{
                  position: 'relative',
                  marginBottom: '40px'
                }}>
                  {/* Glowing timeline node */}
                  <div className="timeline-node" style={{
                    position: 'absolute',
                    left: '-33px',
                    top: '4px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: 'var(--bg-primary)',
                    border: '3px solid var(--accent-secondary)',
                    boxShadow: '0 0 8px var(--accent-secondary)',
                    transition: 'var(--transition-fast)'
                  }}></div>

                  <div className="glass-card scroll-3d-card" style={{ padding: '20px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--accent-secondary)',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      <Calendar size={14} />
                      {item.period}
                    </div>
                    <h4 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{item.role}</h4>
                    <span style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.9rem',
                      display: 'block',
                      marginBottom: '12px',
                      fontWeight: '500'
                    }}>{item.company}</span>
                    <p style={{ color: 'var(--text-dark)', fontSize: '0.95rem' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Timeline */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '32px',
              justifyContent: 'center'
            }}>
              <GraduationCap size={24} style={{ color: 'var(--accent-tertiary)' }} />
              <h3 style={{ fontSize: '1.8rem', fontWeight: '700' }}>Education</h3>
            </div>

            <div className="timeline-container" style={{
              position: 'relative',
              paddingLeft: '24px',
              borderLeft: '2px solid rgba(255, 255, 255, 0.05)'
            }}>
              <div className="timeline-line-glow" style={{
                position: 'absolute',
                top: 0,
                left: '-2px',
                width: '2px',
                height: '100%',
                background: 'linear-gradient(to bottom, var(--accent-tertiary), transparent)',
                opacity: 0.5
              }}></div>

              {educationHistory.map((item, idx) => (
                <div key={idx} className="timeline-item" style={{
                  position: 'relative',
                  marginBottom: '40px'
                }}>
                  {/* Glowing timeline node */}
                  <div className="timeline-node" style={{
                    position: 'absolute',
                    left: '-33px',
                    top: '4px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: 'var(--bg-primary)',
                    border: '3px solid var(--accent-tertiary)',
                    boxShadow: '0 0 8px var(--accent-tertiary)',
                    transition: 'var(--transition-fast)'
                  }}></div>

                  <div className="glass-card scroll-3d-card" style={{ padding: '20px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--accent-tertiary)',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      <Calendar size={14} />
                      {item.period}
                    </div>
                    <h4 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{item.degree}</h4>
                    <span style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.9rem',
                      display: 'block',
                      marginBottom: '12px',
                      fontWeight: '500'
                    }}>{item.institution}</span>
                    <p style={{ color: 'var(--text-dark)', fontSize: '0.95rem' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Styles for nodes to glow more on card hover */}
      <style>{`
        .timeline-item:hover .timeline-node {
          transform: scale(1.3);
          background: #fff !important;
        }
      `}</style>
    </section>
  );
}
