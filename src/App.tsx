import './App.css';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import { TrainBackground } from './components/TrainBackground';

function App() {
  return (
    <TrainBackground>
      <div className="relative min-h-screen">
        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <EducationSection />
          <CertificationsSection />
          <ContactSection />
        </main>
      </div>
    </TrainBackground>
  );
}

export default App;
