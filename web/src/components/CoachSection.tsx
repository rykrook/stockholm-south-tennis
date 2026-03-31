import { useEffect, useState } from 'react';
import { client, urlFor } from '../lib/sanity';
import { motion, AnimatePresence } from 'framer-motion';
// Importera ikoner för knapparna
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Coach {
  _id: string; // Bra att ha för unika React-keys
  name: string;
  role: string;
  image: any;
  bio: string;
  philosophy: string;
  email?: string; 
  signature?: any;
}

const CoachSection = () => {
  // 1. ÄNDRING: State för ALLA coacher, och state för aktivt index
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // 2. ÄNDRING: Ta bort [0] för att hämta listan, sortera på skapandedatum
    const query = `*[_type == "coach"] | order(_createdAt asc)`;
    
    client.fetch(query).then((data) => {
      setCoaches(data);
    }).catch(console.error);
  }, []);

  if (coaches.length === 0) return null;

  // Hämta coachen vi tittar på just nu
  const activeCoach = coaches[currentIndex];

  // 3. ÄNDRING: Funktioner för att byta coach
  const nextCoach = () => {
    setCurrentIndex((prev) => (prev === coaches.length - 1 ? 0 : prev + 1));
  };

  const prevCoach = () => {
    setCurrentIndex((prev) => (prev === 0 ? coaches.length - 1 : prev - 1));
  };

  return (
    <section id="om-oss" className="relative overflow-hidden bg-tennis-navy py-24 text-white">
      
      {/* Dekorativ bakgrund */}
      <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-tennis-gold opacity-5 blur-3xl pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6">
        
        {/* AnimatePresence hanterar animeringen när vi byter ut innehållet */}
        <AnimatePresence mode="wait">
          <motion.div 
            // Key gör att React vet att det är en NY coach och triggar animeringen
            key={activeCoach._id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="grid gap-12 lg:grid-cols-2 lg:items-center"
          >
            
            {/* VÄNSTER: Bild */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-full">
              {/* Ram-effekt */}
              <div className="absolute -bottom-4 -left-4 h-full w-full border-2 border-tennis-gold"></div>
              
              {activeCoach.image && (
                <img 
                  src={urlFor(activeCoach.image).url()} 
                  alt={activeCoach.name}
                  className="relative z-10 h-[500px] w-full object-cover shadow-2xl grayscale transition-all duration-500 hover:grayscale-0"
                />
              )}
            </div>

            {/* HÖGER: Text */}
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-tennis-gold">
                {activeCoach.role}
              </p>
              
              <h2 className="mb-6 text-4xl font-extrabold uppercase leading-none md:text-5xl">
                {activeCoach.name}
              </h2>

              <div className="mb-8 border-l-4 border-tennis-gold pl-6">
                <p className="text-xl font-light italic text-gray-300">
                  "{activeCoach.philosophy}"
                </p>
              </div>

              <p className="mb-8 text-lg leading-relaxed text-gray-400">
                {activeCoach.bio}
              </p>

              {/* SIGNATUR-BILD */}
              {activeCoach.signature && (
                <img 
                  src={urlFor(activeCoach.signature).url()} 
                  alt={`${activeCoach.name} signatur`}
                  className="mb-8 h-16 w-auto opacity-60 invert filter" 
                />
              )}

              {/* KNAPPAR OCH NAVIGATION */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/10 pt-8 mt-8">
                
                {activeCoach.email ? (
                  <a 
                    href={`mailto:${activeCoach.email}`}
                    className="inline-block border border-white bg-transparent px-8 py-3 text-center text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-tennis-navy"
                  >
                    Kontakta mig
                  </a>
                ) : (
                  <div></div> // Tom div för att behålla flex-layouten om mejl saknas
                )}

                {/* Bläddra-knappar (visas bara om det finns fler än 1 coach) */}
                {coaches.length > 1 && (
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={prevCoach}
                      className="flex h-12 w-12 items-center justify-center border border-white/30 text-white transition-all hover:border-tennis-gold hover:text-tennis-gold"
                      aria-label="Föregående coach"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    
                    <span className="text-sm font-bold tracking-widest text-white/50">
                      {currentIndex + 1} / {coaches.length}
                    </span>

                    <button 
                      onClick={nextCoach}
                      className="flex h-12 w-12 items-center justify-center border border-white/30 text-white transition-all hover:border-tennis-gold hover:text-tennis-gold"
                      aria-label="Nästa coach"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                )}
                
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default CoachSection;