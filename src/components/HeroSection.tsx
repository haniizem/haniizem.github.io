import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function HeroSection() {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Mouse parallax effect
    useEffect(() => {
        if (prefersReducedMotion) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            setMousePosition({
                x: (clientX - centerX) / centerX,
                y: (clientY - centerY) / centerY,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [prefersReducedMotion]);

    // Initial animations
    useEffect(() => {
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 });

            tl.fromTo(
                titleRef.current,
                { opacity: 0, y: 80, rotateX: 15 },
                { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: 'power3.out' }
            )
                .fromTo(
                    subtitleRef.current,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
                    '-=0.6'
                )
                .fromTo(
                    badgeRef.current,
                    { opacity: 0, scale: 0.8 },
                    { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
                    '-=0.4'
                );
        }, heroRef);

        return () => ctx.revert();
    }, [prefersReducedMotion]);

    return (
        <section
            ref={heroRef}
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-base"
        >
            {/* Circuit Grid Background */}
            <div className="circuit-grid" />

            {/* Radial gradient overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.8) 70%, #0a0a0a 100%)',
                }}
            />

            {/* Animated orbs */}
            <div
                className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl animate-float"
                style={{
                    background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)',
                    top: '10%',
                    right: '10%',
                    transform: prefersReducedMotion ? 'none' : `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
                    transition: 'transform 0.3s ease-out',
                }}
            />
            <div
                className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl animate-float"
                style={{
                    background: 'radial-gradient(circle, rgba(236,72,153,0.5) 0%, transparent 70%)',
                    bottom: '20%',
                    left: '5%',
                    animationDelay: '-3s',
                    transform: prefersReducedMotion ? 'none' : `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
                    transition: 'transform 0.3s ease-out',
                }}
            />

            {/* Content */}
            <div
                className="relative z-10 text-center px-6 max-w-5xl perspective"
                style={{
                    transform: prefersReducedMotion ? 'none' : `rotateX(${mousePosition.y * -2}deg) rotateY(${mousePosition.x * 2}deg)`,
                    transition: 'transform 0.1s ease-out',
                }}
            >
                {/* Alstom Badge */}
                <div
                    ref={badgeRef}
                    className="inline-flex items-center gap-2 mb-8 px-4 py-2 glass rounded-full"
                >
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-text-secondary font-medium">
                        Currently at <span className="text-text-primary font-semibold">Alstom</span>
                    </span>
                </div>

                {/* Main Title */}
                <h1
                    ref={titleRef}
                    className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-hero mb-6 preserve-3d"
                >
                    <span className="block text-text-primary">Hani</span>
                    <span className="gradient-text">IZEM</span>
                </h1>

                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    className="text-lg sm:text-xl md:text-2xl text-text-secondary font-medium mb-12 max-w-2xl mx-auto"
                >
                    Project Configuration & Change Manager
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a href="#experience" className="btn-primary">
                        <span>Explore My Journey</span>
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </a>
                    <a href="#contact" className="btn-secondary">
                        <span>Get in Touch</span>
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary">
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <div className="w-6 h-10 border-2 border-text-secondary/30 rounded-full flex justify-center pt-2">
                    <div className="w-1.5 h-1.5 bg-accent-primary rounded-full animate-bounce" />
                </div>
            </div>
        </section>
    );
}
