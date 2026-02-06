import { useState, useEffect, useCallback } from 'react';

export function useScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [currentSection, setCurrentSection] = useState(0);

    const handleScroll = useCallback(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        setScrollProgress(progress);

        // Determine current section based on viewport
        const sections = document.querySelectorAll('section[id]');
        let current = 0;

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const sectionMid = rect.top + rect.height / 3;
            if (sectionMid <= window.innerHeight / 2) {
                current = index;
            }
        });

        setCurrentSection(current);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return { scrollProgress, currentSection };
}
