import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Globala komponenter (visas på alla sidor)
import Navbar from './components/Navbar';
import NotificationBanner from './components/NotificationBanner';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SponsorsSection from './components/SponsorSection';

// Sidor
import Home from './pages/Home';
// Import för de nya sidorna (skapa dessa filer i src/pages/ om du inte redan gjort det)
import CampPage from './pages/CampPage';
import ProgramDetail from './pages/ProgramDetail';

function App() {
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  return (
    <Router>
      {/* Globala element högst upp */}
      <NotificationBanner onVisibilityChange={setIsBannerVisible} />
      <Navbar hasBanner={isBannerVisible} />

      {/* Main-innehåll som byts ut beroende på URL */}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lager" element={<CampPage />} />
          <Route path="/program/:slug" element={<ProgramDetail />} />
        </Routes>
      </main>

      {/* Globala element längst ner */}
      <SponsorsSection />
      <Footer />
      <ScrollToTop />
    </Router>
  );
}

export default App;