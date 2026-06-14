import React, { useState } from 'react';
import { ExternalLink, Code2 } from 'lucide-react';
import { Github } from './BrandIcons';

export default function Projects() {
  const categories = ['All', 'DevOps', 'Mobile'];
  const [activeCategory, setActiveCategory] = useState('All');

  const projectsData = [
    {
      id: 1,
      title: 'Automated GitOps EKS Pipeline',
      category: 'DevOps',
      desc: 'Engineered a highly available multi-environment GitOps deployment pipeline using ArgoCD, Jenkins, and Helm charts for continuous microservice deployment on AWS EKS with Prometheus alerts.',
      tags: ['AWS EKS', 'ArgoCD', 'Jenkins', 'Kubernetes', 'Helm'],
      gitLink: 'https://github.com',
      liveLink: 'https://example.com',
      color: 'var(--accent-secondary)'
    },
    {
      id: 2,
      title: 'Terraform AWS Multi-Region Deployer',
      category: 'DevOps',
      desc: 'Created a modular Infrastructure as Code (IaC) setup using Terraform and GitHub Actions to automatically provision secure VPCs, database subnets, and custom security rules across multiple AWS regions.',
      tags: ['Terraform', 'AWS', 'GitHub Actions', 'IaC', 'VPC'],
      gitLink: 'https://github.com',
      liveLink: 'https://example.com',
      color: 'var(--accent-primary)'
    },
    {
      id: 3,
      title: 'Personal Finance Tracker',
      category: 'Mobile',
      desc: 'A comprehensive, secure personal budgeting and finance tracker app. Built with Flutter for a fluid mobile UI and SQLite for secure offline local transaction ledger storage.',
      tags: ['Flutter', 'SQLite', 'Mobile App', 'Local DB', 'Play Store'],
      gitLink: 'https://github.com',
      liveLink: 'https://play.google.com/store',
      color: 'var(--accent-tertiary)'
    },
    {
      id: 4,
      title: 'Kubernetes Cluster Telemetry Stack',
      category: 'DevOps',
      desc: 'Configured a containerized Prometheus and Grafana stack to track Kubernetes nodes, custom service metrics, and database latency logs with automated alerts integrated into Slack.',
      tags: ['Prometheus', 'Grafana', 'Kubernetes', 'Alertmanager', 'Slack API'],
      gitLink: 'https://github.com',
      liveLink: 'https://example.com',
      color: 'var(--accent-secondary)'
    },
    {
      id: 6,
      title: 'Enterprise Spring Microservices Grid',
      category: 'DevOps',
      desc: 'Active R&D Architecture: Constructing a cloud-native Java 21 & Spring Boot 3 framework utilizing Spring Cloud, Kafka events, Spring Security OAuth2, and ArgoCD deployment pipelines with distributed OpenTelemetry tracing.',
      tags: ['Spring Boot 3', 'Spring Cloud', 'Kafka', 'Kubernetes', 'OpenTelemetry', 'Active R&D'],
      gitLink: 'https://github.com',
      liveLink: 'https://example.com',
      color: 'var(--accent-primary)'
    }
  ];

  const filteredProjects = activeCategory === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="projects-section" style={{
      padding: '100px 0',
      position: 'relative'
    }}>
      <div className="container">
        <div className="section-header">
          <h2>Featured <span className="text-gradient">Projects</span></h2>
          <p>A handpicked selection of premium applications and services I have engineered from the ground up.</p>
        </div>

        {/* Filter Buttons */}
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
              className="filter-btn"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid-2">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel project-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Project Preview Banner */}
              <div style={{
                height: '160px',
                background: `linear-gradient(135deg, rgba(18, 20, 32, 0.95), rgba(10, 11, 16, 0.95))`,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid var(--border-glass)'
              }}>
                {/* SVG Abstract Graphic */}
                <div style={{
                  position: 'absolute',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: project.color,
                  filter: 'blur(35px)',
                  opacity: 0.35
                }}></div>
                <Code2 size={48} style={{ color: project.color, zIndex: 1 }} />
                
                {/* In Progress Status Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#f59e0b',
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  padding: '3.5px 10px',
                  borderRadius: '100px',
                  textTransform: 'uppercase',
                  zIndex: 2
                }}>
                  In Progress
                </div>

                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: project.color,
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${project.color}33`,
                  padding: '3px 8px',
                  borderRadius: '100px',
                  textTransform: 'uppercase'
                }}>
                  {project.category}
                </div>
              </div>

              {/* Project Info */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', fontWeight: '700' }}>
                  {project.title}
                </h3>
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.95rem',
                  marginBottom: '20px',
                  flexGrow: 1
                }}>
                  {project.desc}
                </p>

                {/* Tech Tags */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-glass)',
                        color: 'var(--text-main)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: '500'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid var(--border-glass)',
                  paddingTop: '16px'
                }}>
                  <a
                    href={project.gitLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--text-muted)',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      transition: 'var(--transition-fast)'
                    }}
                    className="project-link"
                  >
                    <Github size={16} /> Code
                  </a>
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--accent-secondary)',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      transition: 'var(--transition-fast)'
                    }}
                    className="project-link"
                  >
                    Live Demo <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .project-card:hover {
          transform: translateY(-6px);
        }
        .project-link:hover {
          color: #fff !important;
        }
        .filter-btn:hover {
          border-color: var(--accent-primary) !important;
          color: #fff !important;
        }
      `}</style>
    </section>
  );
}
