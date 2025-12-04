import CoachSection from './components/CoachSection';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ProgramsSection from './components/ProgramsSection';
import Testimonials from './components/Testimonials';

function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProgramsSection />
      <CoachSection />
      <Testimonials />
      <Footer/>
    </main>
  );
}

export default App;