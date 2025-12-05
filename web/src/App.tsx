import { useState } from 'react';
import BookingSection from './components/BookingSection';
import CoachSection from './components/CoachSection';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import NotificationBanner from './components/NotificationBanner';
import ProgramsSection from './components/ProgramsSection';
import ScrollToTop from './components/ScrollToTop';
import Testimonials from './components/Testimonials';

function App() {
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  
  return (
    <main>
     <NotificationBanner onVisibilityChange={setIsBannerVisible} />
      <Navbar hasBanner={isBannerVisible} />
      <Hero />
      <ProgramsSection />
      <CoachSection />
      <Testimonials />
      <BookingSection />
      <ScrollToTop/>
      <Footer/>
    </main>
  );
}

export default App;