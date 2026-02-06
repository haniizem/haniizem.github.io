import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        label: 'Email',
        value: 'haniizem1998@gmail.com',
        href: 'mailto:haniizem1998@gmail.com',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        label: 'LinkedIn',
        value: 'linkedin.com/in/izem-hani',
        href: 'https://linkedin.com/in/izem-hani',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        label: 'Location',
        value: 'Paris, France',
        href: null,
    },
];

export function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion || !contentRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRef.current,
                { opacity: 0, y: 60 },
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
            id="contact"
            className="section relative bg-background-surface overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-secondary/10 rounded-full blur-3xl" />
            </div>

            <div ref={contentRef} className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-sm uppercase tracking-widest text-accent-primary font-medium">
                        Let's Connect
                    </span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-text-primary mt-4">
                        Get in <span className="gradient-text">Touch</span>
                    </h2>
                    <p className="text-text-secondary mt-4 max-w-xl mx-auto">
                        Interested in discussing a project or opportunity? I'm always open to new challenges
                        and collaborations.
                    </p>
                </div>

                {/* Contact Cards */}
                <div className="grid sm:grid-cols-3 gap-6 mb-12">
                    {contactInfo.map((item) => (
                        <a
                            key={item.label}
                            href={item.href || '#'}
                            target={item.href?.startsWith('http') ? '_blank' : undefined}
                            rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className={`glass glass-hover rounded-xl p-6 text-center group ${item.href ? 'cursor-pointer' : 'cursor-default'
                                }`}
                        >
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <div className="text-text-secondary text-sm mb-1">{item.label}</div>
                            <div className="text-text-primary font-medium text-sm break-all">
                                {item.value}
                            </div>
                        </a>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <a
                        href="mailto:haniizem1998@gmail.com"
                        className="btn-primary inline-flex"
                    >
                        <span>Send Me a Message</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 py-6 text-center border-t border-border-subtle">
                <p className="text-text-secondary text-sm">
                    © {new Date().getFullYear()} Hani IZEM. Crafted with passion and precision.
                </p>
            </div>
        </section>
    );
}
