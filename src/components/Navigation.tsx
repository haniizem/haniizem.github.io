import { useState, useEffect } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { cn } from '../lib/utils';

const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
];

export function Navigation() {
    const { currentSection } = useScrollProgress();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
                isScrolled
                    ? 'glass-strong py-3'
                    : 'bg-transparent py-6'
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <button
                    onClick={() => scrollToSection('hero')}
                    className="font-display font-bold text-xl tracking-tight hover:text-accent-primary transition-colors"
                >
                    <span className="gradient-text">H</span>
                    <span className="text-text-primary">.</span>
                    <span className="gradient-text">I</span>
                </button>

                {/* Desktop Navigation Dots */}
                <div className="hidden md:flex items-center gap-3">
                    {sections.map((section, index) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className="group relative p-2"
                            aria-label={section.label}
                        >
                            <span
                                className={cn(
                                    'block w-2 h-2 rounded-full transition-all duration-300',
                                    currentSection === index
                                        ? 'bg-accent-primary scale-125 shadow-neon'
                                        : 'bg-text-secondary/40 group-hover:bg-text-primary'
                                )}
                            />
                            <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 bg-background-surface text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {section.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    aria-label="Toggle menu"
                >
                    <span className={cn(
                        'w-6 h-0.5 bg-text-primary transition-transform duration-300',
                        isMenuOpen && 'rotate-45 translate-y-2'
                    )} />
                    <span className={cn(
                        'w-6 h-0.5 bg-text-primary transition-opacity duration-300',
                        isMenuOpen && 'opacity-0'
                    )} />
                    <span className={cn(
                        'w-6 h-0.5 bg-text-primary transition-transform duration-300',
                        isMenuOpen && '-rotate-45 -translate-y-2'
                    )} />
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={cn(
                'md:hidden absolute top-full left-0 right-0 glass-strong overflow-hidden transition-all duration-300',
                isMenuOpen ? 'max-h-96 border-t border-border-subtle' : 'max-h-0'
            )}>
                <div className="px-6 py-4 flex flex-col gap-2">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className="text-left py-2 text-text-secondary hover:text-text-primary transition-colors"
                        >
                            {section.label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
