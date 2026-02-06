import { SectionWrapper } from './SectionWrapper';

const certifications = [
    {
        name: 'Electrical Certification BT/HT',
        issuer: 'Temis Formation',
        description: 'Low and High Voltage electrical safety certification',
    },
    {
        name: 'TOEIC for Engineer',
        issuer: 'IELTS Malta',
        description: 'English proficiency certification for engineering professionals',
    },
    {
        name: 'Railway Systems Engineering',
        issuer: 'Alstom University',
        description: 'Comprehensive training on railway signaling and control systems',
    },
    {
        name: 'APSYS for Projects',
        issuer: 'Alstom University',
        description: 'Project management methodology and tools certification',
    },
    {
        name: 'DFQ Projects & Programs',
        issuer: 'Alstom University',
        description: 'Quality management for projects and programs',
    },
    {
        name: 'Ethics & Compliance',
        issuer: 'Alstom University',
        description: 'Corporate ethics and compliance training',
    },
];

export function CertificationsSection() {
    return (
        <SectionWrapper id="certifications">
            {/* Header */}
            <div className="text-center mb-12">
                <span className="text-sm uppercase tracking-widest text-accent-primary font-medium">
                    Credentials
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-text-primary mt-4">
                    Certifications & <span className="gradient-text">Training</span>
                </h2>
            </div>

            {/* Certifications Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                    <div
                        key={cert.name}
                        className="glass glass-hover rounded-xl p-6 group relative overflow-hidden"
                    >
                        {/* Number */}
                        <div className="absolute top-4 right-4 font-display font-bold text-5xl text-accent-primary/10 group-hover:text-accent-primary/20 transition-colors">
                            {String(index + 1).padStart(2, '0')}
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            <div className="w-10 h-10 mb-4 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>

                            <h3 className="font-display font-semibold text-lg text-text-primary mb-2 group-hover:gradient-text transition-all duration-300">
                                {cert.name}
                            </h3>

                            <div className="mb-3">
                                <span className="text-accent-primary text-sm font-medium">{cert.issuer}</span>
                            </div>

                            <p className="text-text-secondary text-sm leading-relaxed">
                                {cert.description}
                            </p>
                        </div>

                        {/* Hover gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
