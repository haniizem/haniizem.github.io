import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItemProps {
    company: string;
    role: string;
    period: string;
    location: string;
    description: string[];
    isLeft: boolean;
    isCurrent?: boolean;
}

function ExperienceCard({ company, role, period, location, description, isLeft, isCurrent }: ExperienceItemProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion || !cardRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                cardRef.current,
                {
                    opacity: 0,
                    x: isLeft ? -60 : 60,
                    scale: 0.9,
                },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: 'top 85%',
                        once: true,
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [isLeft, prefersReducedMotion]);

    return (
        <div
            ref={cardRef}
            className={cn(
                'relative w-full md:w-[calc(50%-2rem)] mb-12',
                isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
            )}
        >
            {/* Card */}
            <div className="glass glass-hover rounded-xl p-6 pt-8 relative group" style={{ overflow: 'clip', overflowClipMargin: '20px' }}>
                {/* Timeline node - centered on card top border */}
                <div className="timeline-node hidden md:block absolute -top-2 left-1/2 -translate-x-1/2 z-20">
                    {isCurrent && (
                        <div className="absolute inset-0 bg-accent-primary rounded-full animate-ping opacity-50" />
                    )}
                </div>

                {/* Gradient accent line */}
                <div
                    className={cn(
                        'absolute top-0 h-1 w-full gradient-primary',
                        isLeft ? 'left-0' : 'right-0'
                    )}
                />

                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <div>
                        <h3 className="font-display font-bold text-xl text-text-primary group-hover:gradient-text transition-all duration-300">
                            {company}
                        </h3>
                        <p className="text-accent-primary font-medium">{role}</p>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-2">
                            {isCurrent && (
                                <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                                    Current
                                </span>
                            )}
                            <span className="text-text-secondary text-sm">{period}</span>
                        </div>
                        <span className="text-text-secondary/60 text-sm">{location}</span>
                    </div>
                </div>

                {/* Description */}
                <ul className="space-y-2">
                    {description.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-text-secondary">
                            <span className="w-1.5 h-1.5 bg-accent-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>

                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-t from-accent-primary/5 to-transparent" />
                </div>
            </div>
        </div>
    );
}

const experiences = [
    {
        company: 'Alstom',
        role: 'Project Configuration & Change Manager',
        period: '2024 - Present',
        location: 'Paris, France',
        description: [
            'Leading configuration management for major railway projects',
            'Implementing PLM processes and ensuring data integrity across cross-functional teams',
            'Developing automation solutions using VBA and Power Query to optimize workflows',
            'Coordinating change management activities and ensuring compliance with railway standards',
        ],
        isCurrent: true,
    },
    {
        company: 'Renault',
        role: 'Embedded Systems Engineer',
        period: '2020 - 2023',
        location: 'Guyancourt, France',
        description: [
            'Design and implementation of project management tools',
            'Development of a Python report generation tool, including source code reverse engineering, DataFrame manipulation with Pandas and graph creation with Matplotlib',
            'Optimization of DOORS requirements management, ensuring end-to-end traceability through custom DXL scripts',
            'Implementation of a CI pipeline to extract, transform and load JIRA data to automate the cybersecurity status report of vehicle ECUs',
            'Project monitoring and testing, with active participation in the software quality assurance process',
            'Formalization of specifications, documentation and tutorial creation',
        ],
        isCurrent: false,
    },
    {
        company: 'Sonatrach',
        role: 'Discovery Internship',
        period: '2017 - 2018',
        location: 'Algeria',
        description: [
            'First exposure to industrial processes and engineering environments',
            'Learned fundamentals of project documentation and technical reporting',
        ],
        isCurrent: false,
    },
];

export function ExperienceSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion || !titleRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        once: true,
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [prefersReducedMotion]);

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="section relative bg-background-surface"
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div ref={titleRef} className="text-center mb-16">
                    <span className="text-sm uppercase tracking-widest text-accent-primary font-medium">
                        Career Path
                    </span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-text-primary mt-4">
                        Professional <span className="gradient-text">Experience</span>
                    </h2>
                    <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
                        From embedded systems at Renault to configuration management at Alstom,
                        my journey reflects a passion for complex technical challenges.
                    </p>
                </div>

                {/* Timeline */}
                <div className="timeline relative">
                    {experiences.map((exp, index) => (
                        <ExperienceCard
                            key={index}
                            {...exp}
                            isLeft={index % 2 === 0}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
