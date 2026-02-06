import { SectionWrapper } from './SectionWrapper';

interface EducationData {
    title: string;
    institution: string;
    period: string;
    subtitle?: string;
    projects?: string[];
    curriculum: {
        title: string;
        items: string[];
    }[];
}

const educationData: EducationData[] = [
    {
        title: 'EI2I – Electronics and Computer Engineering',
        institution: 'Polytech Sorbonne',
        period: '2020 - 2023',
        projects: [
            'Wheelchair motorization kit (Arduino, BMS, GANTT/FMEA)',
            'Connected beehive IoT',
            'Polyphonic synthesizer (FreeRTOS, Microcontroller)'
        ],
        curriculum: [
            {
                title: 'Technical Skills',
                items: [
                    'Analog and digital telecommunications',
                    'Electromagnetism, Optoelectronics',
                    'Real-time systems (RTOS)',
                    'Internet of Things (IoT)',
                    'Database management',
                    'Object-oriented programming (Java)',
                ],
            },
            {
                title: 'Business & Enterprise Knowledge',
                items: [
                    'Industrial management',
                    'Introduction to project management',
                    'Professional efficiency',
                    'Strategy and performance',
                    'Sustainable development',
                    'International economics and markets',
                    'Entrepreneurship week',
                    'English',
                    'Language stay (Malta)',
                ],
            },
        ],
    },
    {
        title: "Bachelor's Degree – Electronics, Electrical Energy and Automation (EEA)",
        institution: 'Sorbonne University',
        period: '2018 - 2020',
        projects: [
            'Delivery robot for social distancing (Signal processing, Magnetic guidance)',
            'Pattern recognition (C, Legendre moments)'
        ],
        curriculum: [
            {
                title: 'Core Technical',
                items: [
                    'Digital and analog electronics',
                    'Integrated circuit design and implementation (clean rooms, Cadence, PSpice)',
                    'Programming in C, Matlab/Simulink',
                    'Signal processing (amplification, filtering) and control systems',
                    'Image and sound processing',
                    'VHDL, FPGA, microcontrollers',
                    'Electronic circuit design',
                ],
            },
            {
                title: 'Professional Skills',
                items: [
                    'Work organization and adaptability',
                    'Technical documentation usage',
                    'Teamwork',
                    'Documentation, written and oral presentations',
                ],
            },
        ],
    },
    {
        title: 'Python for Data Science and Machine Learning Bootcamp',
        institution: 'Udemy',
        period: '2023',
        curriculum: [
            {
                title: 'Data Science Skills',
                items: [
                    'Big Data analysis with Spark',
                    'Numerical computing with NumPy',
                    'Statistical visualization with Matplotlib and Seaborn',
                    'Interactive visualizations with Plotly',
                    'Natural Language Processing and spam filtering',
                ],
            },
        ],
    },
];

function EducationCard({ data }: { data: EducationData }) {
    return (
        <div className="education-card group">
            {/* Main Card */}
            <div className="glass glass-hover rounded-xl p-6 cursor-pointer transition-all duration-300 relative overflow-hidden">
                {/* Gradient line */}
                <div className="absolute top-0 left-0 w-full h-1 gradient-primary opacity-60 group-hover:opacity-100 transition-opacity" />

                {/* Header - Always visible */}
                <div className="education-header">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                            <h3 className="font-display font-bold text-lg text-text-primary group-hover:gradient-text transition-all duration-300">
                                {data.title}
                            </h3>
                            <p className="text-accent-primary font-medium mt-1">{data.institution}</p>
                            {data.subtitle && (
                                <p className="text-text-secondary text-sm mt-1">{data.subtitle}</p>
                            )}
                        </div>
                        <span className="text-text-secondary text-sm whitespace-nowrap bg-background-base/50 px-3 py-1 rounded-full">
                            {data.period}
                        </span>
                    </div>
                </div>

                {/* Content area - Gets covered by popup */}
                <div className="education-content mt-4">
                    {/* Projects */}
                    {data.projects && data.projects.length > 0 && (
                        <div className="mb-4">
                            <span className="text-xs uppercase tracking-wider text-accent-primary font-medium">
                                Projects
                            </span>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {data.projects.map((project) => (
                                    <span
                                        key={project}
                                        className="text-sm px-3 py-1 bg-accent-primary/10 text-text-secondary border border-accent-primary/20 rounded-full"
                                    >
                                        {project}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}



                    {/* Popup - Positioned relative to content area */}
                    <div className="education-popup">
                        {data.curriculum.map((section, idx) => (
                            <div key={idx} className={idx > 0 ? 'mt-4 pt-4 border-t border-border-subtle' : ''}>
                                <div className="popup-title">{section.title}</div>
                                <ul>
                                    {section.items.map((item, itemIdx) => (
                                        <li key={itemIdx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function EducationSection() {
    return (
        <SectionWrapper id="education" darkBg>
            {/* Header */}
            <div className="text-center mb-12">
                <span className="text-sm uppercase tracking-widest text-accent-primary font-medium">
                    Academic Background
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-text-primary mt-4">
                    Education & <span className="gradient-text">Training</span>
                </h2>
                <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
                    A solid foundation in electronics, computer engineering, and continuous learning
                    in modern technologies.
                </p>
            </div>

            {/* Education Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {educationData.map((edu) => (
                    <EducationCard key={edu.title} data={edu} />
                ))}
            </div>
        </SectionWrapper>
    );
}
