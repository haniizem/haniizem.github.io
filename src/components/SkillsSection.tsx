import { useRef, useState } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { cn } from '../lib/utils';

interface SkillCardProps {
    name: string;
    category: string;
    icon: React.ReactNode;
}

function SkillCard({ name, category, icon }: SkillCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rotateY = ((e.clientX - centerX) / rect.width) * 15;
        const rotateX = ((centerY - e.clientY) / rect.height) * 15;

        setTransform({ rotateX, rotateY });
    };

    const handleMouseLeave = () => {
        setTransform({ rotateX: 0, rotateY: 0 });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="skill-card glass glass-hover rounded-xl p-6 cursor-pointer perspective group"
            style={{
                transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
            }}
        >
            <div className="preserve-3d">
                {/* Icon */}
                <div className="w-12 h-12 mb-4 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:scale-110 transition-transform">
                    {icon}
                </div>

                {/* Name */}
                <h3 className="font-display font-semibold text-lg text-text-primary mb-1">
                    {name}
                </h3>

                {/* Category */}
                <span className="text-sm text-text-secondary">{category}</span>
            </div>
        </div>
    );
}

// Icon components
const CodeIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

const DatabaseIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
);

const CpuIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
);

const ToolIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const skills = [
    // Core Skills
    { name: 'PLM Systems', category: 'Core Expertise', icon: <DatabaseIcon /> },
    { name: 'DOORS', category: 'Requirements', icon: <DatabaseIcon /> },
    { name: 'JIRA', category: 'Project Mgmt', icon: <ToolIcon /> },
    { name: 'Embedded Systems', category: 'Core Expertise', icon: <CpuIcon /> },

    // Languages
    { name: 'Python', category: 'Language', icon: <CodeIcon /> },
    { name: 'C', category: 'Language', icon: <CodeIcon /> },
    { name: 'Java', category: 'Language', icon: <CodeIcon /> },
    { name: 'VBA', category: 'Language', icon: <CodeIcon /> },
    { name: 'VHDL', category: 'Language', icon: <CpuIcon /> },

    // Tools
    { name: 'TpPLM', category: 'Tool', icon: <ToolIcon /> },
    { name: 'EWM', category: 'Tool', icon: <ToolIcon /> },
    { name: 'GitLab', category: 'Tool', icon: <ToolIcon /> },
    { name: 'Vivado', category: 'Tool', icon: <CpuIcon /> },
    { name: 'Power Query', category: 'Tool', icon: <DatabaseIcon /> },
    { name: 'Matlab/Simulink', category: 'Tool', icon: <CpuIcon /> },
];

export function SkillsSection() {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    const categories = [...new Set(skills.map(s => s.category))];

    const filteredSkills = activeFilter
        ? skills.filter(s => s.category === activeFilter)
        : skills;

    return (
        <SectionWrapper id="skills">
            {/* Header */}
            <div className="text-center mb-12">
                <span className="text-sm uppercase tracking-widest text-accent-primary font-medium">
                    Technical Arsenal
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-text-primary mt-4">
                    Skills & <span className="gradient-text">Technologies</span>
                </h2>
                <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
                    A diverse toolkit spanning embedded systems, PLM, and modern development practices.
                </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                <button
                    onClick={() => setActiveFilter(null)}
                    className={cn(
                        'px-4 py-2 rounded-full text-sm font-medium transition-all',
                        activeFilter === null
                            ? 'gradient-primary text-text-inverse'
                            : 'glass text-text-secondary hover:text-text-primary'
                    )}
                >
                    All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={cn(
                            'px-4 py-2 rounded-full text-sm font-medium transition-all',
                            activeFilter === cat
                                ? 'gradient-primary text-text-inverse'
                                : 'glass text-text-secondary hover:text-text-primary'
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {filteredSkills.map((skill) => (
                    <SkillCard key={skill.name} {...skill} />
                ))}
            </div>
        </SectionWrapper>
    );
}
