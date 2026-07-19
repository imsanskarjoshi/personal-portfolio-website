import React, { useState } from 'react';
import { 
  Sparkles, Users, Flame, Star, ExternalLink, Activity, 
  BookOpen, Terminal, Layers, Globe, Database, 
  Smartphone, ShieldCheck, Cpu, DollarSign, TrendingUp
} from 'lucide-react';
import { Chrome } from './BrandIcons';

export default function SideHustle() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'SaaS & API', 'Chrome Extension', 'Dev Tools', 'Mobile App'];

  const metrics = [
    { label: 'Total Recurring Revenue', value: '$8,870/mo', icon: <TrendingUp size={20} style={{ color: '#ef4444' }} /> },
    { label: 'Active Project Installs', value: '28,000+', icon: <Users size={20} style={{ color: 'var(--accent-secondary)' }} /> },
    { label: 'One-Time Sales Revenue', value: '$3,650+', icon: <DollarSign size={20} style={{ color: '#10b981' }} /> }
  ];

  const projectsData = [
    {
      id: 1,
      title: 'FinTrack',
      category: 'Mobile App',
      desc: 'built with Flutter and AI.',
      link: 'https://play.google.com/store/apps/details?id=com.sanskar.fintrack',
      linkText: 'Google Play Store',
      color: 'var(--accent-tertiary)',
      icon: <Smartphone size={20} />,
      badge: 'Google Play',
    },

    {
      id: 2,
      title: 'RK Tutorial',
      category: 'Mobile App',
      desc: 'built with Flutter and AI.',
      link: 'https://play.google.com/store/apps/details?id=com.sanskarjoshi.tuitionapp',
      linkText: 'Google Play Store',
      color: 'var(--accent-tertiary)',
      icon: <Smartphone size={20} />,
      badge: 'Google Play',
    },
    {
      id: 3,
      title: 'K8sPulse Cluster Dashboard',
      category: 'Dev Tools',
      desc: 'Lightweight cluster visualizer that packages Kubernetes API query structures and Prometheus charts in a small 15MB binary.',
      revenue: '$950/mo MRR',
      users: '250+ cluster installs',
      link: 'https://example.com',
      linkText: 'Order License',
      color: 'var(--accent-secondary)',
      icon: <Cpu size={20} />,
      badge: 'Active MRR',
      visualType: 'k8s',
      visualData: { pods: '18/18 Running', cpu: '48%', memory: '62%' }
    }
  ];

  const filteredProjects = activeCategory === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === activeCategory);

  // Render a simulated screenshot/dashboard visual based on project type
  const renderVisualMockup = (project) => {
    const data = project.visualData;
    
    switch (project.visualType) {
      case 'timer':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dark)', fontFamily: 'monospace' }}>{data.title}</span>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'monospace', color: project.color, textShadow: `0 0 10px ${project.color}33` }}>
              {data.time}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ fontSize: '0.7rem', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e', padding: '2px 8px', borderRadius: '100px' }}>
                Running
              </span>
            </div>
          </div>
        );
      case 'code':
        return (
          <div style={{ padding: '16px', fontFamily: 'monospace', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left', width: '100%' }}>
            {data.lines.map((line, i) => (
              <div key={i} style={{ 
                color: line.startsWith('#') ? 'var(--text-main)' : line.startsWith('>>') ? '#22c55e' : 'var(--text-muted)'
              }}>
                {line}
              </div>
            ))}
          </div>
        );
      case 'logs':
        return (
          <div style={{ padding: '16px', fontFamily: 'monospace', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left', width: '100%' }}>
            {data.lines.map((line, i) => (
              <div key={i} style={{ color: line.includes('Saved') ? 'var(--accent-secondary)' : 'var(--text-dark)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {line}
              </div>
            ))}
          </div>
        );
      case 'tasks':
        return (
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
            {data.tasks.map((task, i) => (
              <div key={i} className="glass-card" style={{ padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', borderRadius: '6px', margin: 0 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '500', color: 'var(--text-main)' }}>{task[0]}</span>
                <span style={{ 
                  fontSize: '0.65rem', 
                  padding: '2px 6px', 
                  borderRadius: '100px',
                  background: task[1] === 'Done' ? 'rgba(34,197,94,0.1)' : task[1] === 'Progress' ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.02)',
                  color: task[1] === 'Done' ? '#22c55e' : task[1] === 'Progress' ? '#f59e0b' : 'var(--text-muted)',
                  border: `1px solid ${task[1] === 'Done' ? 'rgba(34,197,94,0.2)' : task[1] === 'Progress' ? 'rgba(245,158,11,0.2)' : 'var(--border-glass)'}`
                }}>{task[1]}</span>
              </div>
            ))}
          </div>
        );
      case 'ui-layout':
        return (
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px', height: '100%', width: '100%' }}>
            <div style={{ height: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', paddingLeft: '8px', fontSize: '0.65rem', color: 'var(--text-dark)' }}>
              Canvas Layout
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px', flexGrow: 1 }}>
              <div style={{ background: 'rgba(99,102,241,0.05)', border: '1px dashed var(--accent-primary)55', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: 'var(--accent-primary)' }}>
                Sidebar
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ height: '35%', background: 'rgba(6,182,212,0.05)', border: '1px dashed var(--accent-secondary)55', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: 'var(--accent-secondary)' }}>
                  Hero Grid
                </div>
                <div style={{ flexGrow: 1, background: 'rgba(255,255,255,0.02)', border: '1px dashed var(--border-glass)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: 'var(--text-dark)' }}>
                  Main Content
                </div>
              </div>
            </div>
          </div>
        );
      case 'metrics':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '6px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dark)' }}>{data.title}</span>
            <span style={{ fontSize: '2.4rem', fontWeight: '800', color: '#10b981' }}>{data.value}</span>
            <span style={{ fontSize: '0.75rem', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: '100px', border: '1px solid rgba(16,185,129,0.3)' }}>
              {data.change}
            </span>
          </div>
        );
      case 'charts':
        return (
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', justifyContent: 'center', width: '100%' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dark)', fontWeight: '600' }}>{data.title}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {data.data.map((item, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{item[0]}</span>
                    <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{item[1]}</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: item[1], background: 'var(--grad-primary)' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'scanner':
        return (
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', gap: '8px', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '0.9rem', fontWeight: '700' }}>
              <ShieldCheck size={18} /> CLI Shield Active
            </div>
            <div className="dashboard-fallback-widget" style={{ padding: '8px', margin: 0 }}>
              <div>$ gitguard scan</div>
              <div style={{ color: '#10b981' }}>✔ {data.checked} checked</div>
              <div style={{ color: 'var(--text-dark)' }}>{data.secrets}</div>
            </div>
          </div>
        );
      case 'k8s':
        return (
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', justifyContent: 'center', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-main)' }}>k8s pods</span>
              <span style={{ fontSize: '0.7rem', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '1px 6px', borderRadius: '4px' }}>active</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div className="dashboard-fallback-widget" style={{ padding: '8px 10px', textAlign: 'center', margin: 0 }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-dark)' }}>CPU</div>
                <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--accent-secondary)' }}>{data.cpu}</div>
              </div>
              <div className="dashboard-fallback-widget" style={{ padding: '8px 10px', textAlign: 'center', margin: 0 }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-dark)' }}>RAM</div>
                <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--accent-tertiary)' }}>{data.memory}</div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-glass)',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 15px ${project.color}22`
            }}>
              <span style={{ color: project.color }}>{project.icon}</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="sidehustles" className="section-padding-large" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <h2>Side <span className="text-gradient">Hustles</span></h2>
        </div>

        {/* Categories / Filter Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '48px',
          flexWrap: 'wrap'
        }}>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? 'var(--grad-primary)' : 'rgba(255, 255, 255, 0.02)',
                color: activeCategory === cat ? '#fff' : 'var(--text-muted)',
                border: '1px solid',
                borderColor: activeCategory === cat ? 'transparent' : 'var(--border-glass)',
                borderRadius: '8px',
                padding: '8px 20px',
                fontFamily: 'var(--font-heading)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                boxShadow: activeCategory === cat ? '0 4px 15px rgba(6, 182, 212, 0.15)' : 'none'
              }}
              className={activeCategory === cat ? 'filter-btn-active' : ''}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Dashboard Grid */}
        <div className="grid-3-auto">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel scroll-3d-card in-view"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                background: 'rgba(18, 20, 32, 0.5)'
              }}
            >
              {/* Project Visual Showcase (Dashboard Mockup Frame) */}
              <div style={{
                height: '180px',
                background: '#090a0f',
                position: 'relative',
                borderBottom: '1px solid var(--border-glass)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                {/* Visual Radial Glow Accent */}
                <div style={{
                  position: 'absolute',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: project.color,
                  filter: 'blur(45px)',
                  opacity: 0.25,
                  pointerEvents: 'none'
                }}></div>

                {/* Draw HTML simulated mockup widgets */}
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
                  {renderVisualMockup(project)}
                </div>

                {/* Glowing MRR Badge in Upper Left Corner of Graphic */}
                {project.revenue && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: project.revenue.includes('mo') ? 'var(--accent-secondary)' : '#10b981',
                    background: project.revenue.includes('mo') ? 'rgba(6,182,212,0.1)' : 'rgba(16,185,129,0.1)',
                    border: `1px solid ${project.revenue.includes('mo') ? 'rgba(6,182,212,0.3)' : 'rgba(16,185,129,0.3)'}`,
                    padding: '4px 10px',
                    borderRadius: '100px',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: `0 0 10px ${project.color}11`,
                    zIndex: 2
                  }}>
                    <Flame size={12} fill="currentColor" /> {project.revenue}
                  </div>
                )}

                {/* Category tag in Upper Right Corner */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  color: 'var(--text-muted)',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-glass)',
                  padding: '3px 8px',
                  borderRadius: '100px',
                  textTransform: 'uppercase',
                  zIndex: 2
                }}>
                  {project.category}
                </div>
              </div>

              {/* Project Card Text Content */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                
                {/* Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ color: project.color }}>{project.icon}</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>
                    {project.title}
                  </h3>
                </div>

                {/* Description */}
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  flexGrow: 1
                }}>
                  {project.desc}
                </p>

                {/* Users Count Metrics Info */}
                {project.users && (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    fontSize: '0.8rem', 
                    color: 'var(--text-dark)',
                    marginBottom: '20px',
                    borderTop: '1px dashed var(--border-glass)',
                    paddingTop: '12px'
                  }}>
                    <Users size={14} style={{ color: 'var(--accent-secondary)' }} />
                    <span>Installed & scaled by <strong style={{ color: 'var(--text-muted)' }}>{project.users}</strong></span>
                  </div>
                )}

                {/* Link buttons */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid var(--border-glass)',
                  paddingTop: '16px'
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: 'var(--text-dark)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {project.badge}
                  </span>
                  
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: project.color,
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      transition: 'var(--transition-fast)'
                    }}
                    className="hustle-link"
                  >
                    {project.linkText} <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hustle-link:hover {
          color: #fff !important;
          text-shadow: 0 0 8px currentColor;
        }
      `}</style>
    </section>
  );
}
