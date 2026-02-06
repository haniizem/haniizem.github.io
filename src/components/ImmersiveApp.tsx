import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scene3D } from './Scene3D';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

// Content data
const experienceData = [
    {
        company: 'Alstom',
        role: 'Project Configuration & Change Manager',
        period: '2024 - Present',
        location: 'Paris, France',
        highlights: [
            'Leading configuration management for major railway projects',
            'Implementing PLM processes and automation with VBA/Power Query',
            'Coordinating change management activities',
        ],
        isCurrent: true,
    },
    {
        company: 'Renault',
        role: 'Embedded Systems Engineer',
        period: '2020 - 2023',
        location: 'Guyancourt, France',
        highlights: [
            'Python report generation with reverse engineering',
            'DOORS requirements with custom DXL scripts',
            'CI pipeline for JIRA data automation',
        ],
        isCurrent: false,
    },
];

const skillsData = [
    { name: 'PLM Systems', category: 'Core' },
    { name: 'Python', category: 'Language' },
    { name: 'DOORS', category: 'Tool' },
    { name: 'JIRA', category: 'Tool' },
    { name: 'VBA', category: 'Language' },
    { name: 'Configuration Management', category: 'Core' },
    { name: 'C/C++', category: 'Language' },
    { name: 'Railway Systems', category: 'Core' },
];

const educationData = [
    {
        title: 'EI2I – Electronics & Computer Engineering',
        institution: 'Polytech Sorbonne',
        period: '2020 - 2023',
        projects: ['Wheelchair kit', 'Connected beehive', 'Polyphonic synthesizer'],
    },
    {
        title: "Bachelor's EEA",
        institution: 'Sorbonne University',
        period: '2018 - 2020',
        projects: ['Delivery robot', 'Pattern recognition'],
    },
];

const certificationsData = [
    'Electrical Certification BT/HT',
    'TOEIC for Engineer',
    'Railway Systems Engineering',
    'APSYS for Projects',
    'DFQ Projects & Programs',
    'Ethics & Compliance',
];

// Section component with 3D-style positioning
function ImmersiveSection({
    id,
    children,
    className = '',
    style = {}
}: {
    id: string;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}) {
    return (
        <section
            id={id}
            className={`immersive-section ${className}`}
            style={style}
        >
            {children}
        </section>
    );
}

// Hero Section
function HeroContent() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) return;

        const tl = gsap.timeline({ delay: 0.5 });
        tl.fromTo(titleRef.current,
            { opacity: 0, y: 100, rotateX: 30 },
            { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: 'power3.out' }
        )
            .fromTo(subtitleRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
                '-=0.6'
            )
            .fromTo(badgeRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
                '-=0.4'
            );
    }, [prefersReducedMotion]);

    return (
        <div className="hero-content">
            <h1 ref={titleRef} className="hero-title">
                Hani <span className="gradient-text">IZEM</span>
            </h1>
            <p ref={subtitleRef} className="hero-subtitle">
                Project Configuration & Change Manager
            </p>
            <div ref={badgeRef} className="hero-badge">
                <span className="pulse-dot" />
                Currently at Alstom
            </div>
            <div className="scroll-indicator">
                <span>Scroll to explore</span>
                <div className="scroll-arrow" />
            </div>
        </div>
    );
}

// About Section
function AboutContent() {
    return (
        <div className="content-panel glass-panel">
            <span className="section-label">About Me</span>
            <h2 className="section-title">
                Electronics & Industrial <span className="gradient-text">Engineer</span>
            </h2>
            <p className="section-text">
                Passionate about embedded systems and railway transport, I bring technical
                expertise and project management skills to every challenge.
            </p>
            <div className="stats-row">
                <div className="stat">
                    <span className="stat-value">4+</span>
                    <span className="stat-label">Years</span>
                </div>
                <div className="stat">
                    <span className="stat-value">3</span>
                    <span className="stat-label">Companies</span>
                </div>
                <div className="stat">
                    <span className="stat-value">5+</span>
                    <span className="stat-label">Domains</span>
                </div>
            </div>
        </div>
    );
}

// Experience Section
function ExperienceContent() {
    return (
        <div className="experience-panels">
            {experienceData.map((exp, i) => (
                <div key={i} className="content-panel glass-panel experience-card">
                    <div className="exp-header">
                        <h3 className="exp-company">{exp.company}</h3>
                        {exp.isCurrent && <span className="current-badge">Current</span>}
                    </div>
                    <p className="exp-role">{exp.role}</p>
                    <p className="exp-meta">{exp.period} • {exp.location}</p>
                    <ul className="exp-highlights">
                        {exp.highlights.map((h, j) => (
                            <li key={j}>{h}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

// Skills Section
function SkillsContent() {
    return (
        <div className="content-panel glass-panel skills-panel">
            <span className="section-label">Technical Stack</span>
            <h2 className="section-title">
                Skills & <span className="gradient-text">Expertise</span>
            </h2>
            <div className="skills-grid">
                {skillsData.map((skill, i) => (
                    <div key={i} className="skill-tag" data-category={skill.category}>
                        {skill.name}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Education Section
function EducationContent() {
    return (
        <div className="education-panels">
            {educationData.map((edu, i) => (
                <div key={i} className="content-panel glass-panel education-card">
                    <h3 className="edu-title">{edu.title}</h3>
                    <p className="edu-institution">{edu.institution}</p>
                    <p className="edu-period">{edu.period}</p>
                    <div className="edu-projects">
                        {edu.projects.map((p, j) => (
                            <span key={j} className="project-tag">{p}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

// Certifications Section
function CertificationsContent() {
    return (
        <div className="content-panel glass-panel certifications-panel">
            <span className="section-label">Credentials</span>
            <h2 className="section-title">
                Certifications
            </h2>
            <div className="cert-grid">
                {certificationsData.map((cert, i) => (
                    <div key={i} className="cert-item">
                        <span className="cert-number">{String(i + 1).padStart(2, '0')}</span>
                        <span className="cert-name">{cert}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Contact Section
function ContactContent() {
    return (
        <div className="content-panel glass-panel contact-panel">
            <span className="section-label">Destination Reached</span>
            <h2 className="section-title">
                Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="section-text">
                Ready to discuss your next project or opportunity?
            </p>
            <div className="contact-links">
                <a href="mailto:haniizem1998@gmail.com" className="contact-btn primary">
                    Send Email
                </a>
                <a href="https://linkedin.com/in/izem-hani" target="_blank" rel="noopener noreferrer" className="contact-btn secondary">
                    LinkedIn
                </a>
            </div>
            <p className="footer-text">
                © 2024 Hani IZEM. Crafted with passion.
            </p>
        </div>
    );
}

// Main Immersive App
export function ImmersiveApp() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(scrollTop / docHeight, 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // GSAP scroll animations for content
    useEffect(() => {
        if (prefersReducedMotion) return;

        const sections = document.querySelectorAll('.immersive-section');
        sections.forEach((section) => {
            gsap.fromTo(section,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'top 20%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [prefersReducedMotion]);

    return (
        <div ref={containerRef} className="immersive-container">
            {/* 3D Background Scene */}
            <Scene3D scrollProgress={scrollProgress} />

            {/* Overlay Content */}
            <div className="immersive-content">
                {/* Hero */}
                <ImmersiveSection id="hero" className="hero-section">
                    <HeroContent />
                </ImmersiveSection>

                {/* About */}
                <ImmersiveSection id="about" className="about-section">
                    <AboutContent />
                </ImmersiveSection>

                {/* Experience */}
                <ImmersiveSection id="experience" className="experience-section">
                    <span className="section-label floating-label">Career Journey</span>
                    <h2 className="section-title floating-title">
                        Professional <span className="gradient-text">Experience</span>
                    </h2>
                    <ExperienceContent />
                </ImmersiveSection>

                {/* Skills */}
                <ImmersiveSection id="skills" className="skills-section">
                    <SkillsContent />
                </ImmersiveSection>

                {/* Education */}
                <ImmersiveSection id="education" className="education-section">
                    <span className="section-label floating-label">Knowledge Station</span>
                    <h2 className="section-title floating-title">
                        Education & <span className="gradient-text">Training</span>
                    </h2>
                    <EducationContent />
                </ImmersiveSection>

                {/* Certifications */}
                <ImmersiveSection id="certifications" className="certifications-section">
                    <CertificationsContent />
                </ImmersiveSection>

                {/* Contact */}
                <ImmersiveSection id="contact" className="contact-section">
                    <ContactContent />
                </ImmersiveSection>
            </div>

            {/* Fixed Navigation */}
            <nav className="immersive-nav">
                <div className="nav-progress" style={{ height: `${scrollProgress * 100}%` }} />
                {['hero', 'about', 'experience', 'skills', 'education', 'certifications', 'contact'].map((id, i) => (
                    <a
                        key={id}
                        href={`#${id}`}
                        className={`nav-dot ${scrollProgress > (i / 7) && scrollProgress < ((i + 1) / 7) ? 'active' : ''}`}
                        title={id.charAt(0).toUpperCase() + id.slice(1)}
                    />
                ))}
            </nav>
        </div>
    );
}

export default ImmersiveApp;
