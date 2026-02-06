import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface SectionWrapperProps {
    id: string;
    children: ReactNode;
    className?: string;
    darkBg?: boolean;
}

export function SectionWrapper({ id, children, className, darkBg = false }: SectionWrapperProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion || !contentRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRef.current,
                {
                    opacity: 0,
                    y: 60,
                },
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
            id={id}
            className={cn(
                'section relative',
                darkBg ? 'bg-background-surface' : 'bg-background-base',
                className
            )}
        >
            <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto">
                {children}
            </div>
        </section>
    );
}
