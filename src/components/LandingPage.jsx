import Header from './Header';
import HeroSection from './HeroSection';
import EventHighlights from './EventHighlights';
import ExperienceSection from './ExperienceSection';
import TicketSection from './TicketSection';
import LocationSection from './LocationSection';
import FinalCTA from './FinalCTA';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <HeroSection />
      <EventHighlights />
      <ExperienceSection />
      <TicketSection />
      <LocationSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default LandingPage;