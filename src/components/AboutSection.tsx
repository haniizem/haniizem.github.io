import { SectionWrapper } from './SectionWrapper';

export function AboutSection() {
    return (
        <SectionWrapper id="about">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Text Content */}
                <div className="space-y-6 bg-background-overlay/50 backdrop-blur-md rounded-2xl p-6 lg:p-8">
                    <div className="inline-block">
                        <span className="text-sm uppercase tracking-widest text-accent-primary font-medium">
                            About Me
                        </span>
                        <div className="h-0.5 w-12 bg-accent-primary mt-2" />
                    </div>

                    <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-text-primary">
                        Electronics & Industrial Computer Science{' '}
                        <span className="gradient-text">Engineer</span>
                    </h2>

                    <div className="space-y-4 text-text-secondary text-lg leading-relaxed">
                        <p>
                            Passionate about embedded systems and railway transport, I bring a unique blend of
                            technical expertise and project management skills to every challenge. My journey
                            spans from designing electronic circuits to optimizing large-scale configuration
                            management systems.
                        </p>
                        <p>
                            Currently driving innovation at <span className="text-text-primary font-semibold">Alstom</span>,
                            I specialize in PLM systems, automation, and cross-functional team coordination
                            on major railway infrastructure projects.
                        </p>
                    </div>

                    {/* Key Stats */}
                    <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border-subtle">
                        <div>
                            <div className="font-display font-bold text-3xl gradient-text">4+</div>
                            <div className="text-text-secondary text-sm mt-1">Years Experience</div>
                        </div>
                        <div>
                            <div className="font-display font-bold text-3xl gradient-text">10+</div>
                            <div className="text-text-secondary text-sm mt-1">Projects Delivered</div>
                            <div className="text-accent-primary/60 text-xs mt-0.5">Pro & Academic</div>
                        </div>
                        <div>
                            <div className="font-display font-bold text-3xl gradient-text">4</div>
                            <div className="text-text-secondary text-sm mt-1">Tech Domains</div>
                        </div>
                    </div>
                </div>

                {/* Visual Element */}
                <div className="relative">
                    <div className="glass rounded-2xl p-8 relative overflow-hidden">
                        {/* Abstract circuit pattern */}
                        <svg
                            className="absolute inset-0 w-full h-full opacity-10"
                            viewBox="0 0 400 400"
                        >
                            <defs>
                                <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#8b5cf6" />
                                    <stop offset="100%" stopColor="#ec4899" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M50,200 L100,200 L100,100 L200,100 L200,150 M200,100 L300,100 L300,200 L350,200"
                                stroke="url(#circuit-gradient)"
                                strokeWidth="2"
                                fill="none"
                                className="animate-pulse"
                            />
                            <path
                                d="M50,250 L150,250 L150,300 L250,300 L250,250 L350,250"
                                stroke="url(#circuit-gradient)"
                                strokeWidth="2"
                                fill="none"
                                className="animate-pulse"
                                style={{ animationDelay: '0.5s' }}
                            />
                            <circle cx="100" cy="200" r="6" fill="#8b5cf6" className="animate-pulse" />
                            <circle cx="200" cy="100" r="6" fill="#ec4899" className="animate-pulse" />
                            <circle cx="300" cy="200" r="6" fill="#8b5cf6" className="animate-pulse" />
                            <circle cx="250" cy="300" r="6" fill="#ec4899" className="animate-pulse" />
                        </svg>

                        {/* Content overlay */}
                        <div className="relative z-10 space-y-4">
                            <h3 className="font-display font-semibold text-xl text-text-primary">
                                Core Expertise
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    'PLM Systems',
                                    'Configuration Management',
                                    'Embedded Systems',
                                    'Railway Transport',
                                    'Process Automation',
                                    'Team Coordination',
                                ].map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 text-sm bg-accent-primary/10 text-accent-primary border border-accent-primary/20 rounded-full"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-primary/20 rounded-full blur-2xl" />
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-secondary/20 rounded-full blur-2xl" />
                </div>
            </div>
        </SectionWrapper>
    );
}
