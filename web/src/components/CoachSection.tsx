import { useEffect, useState } from 'react';
import { client, urlFor } from '../lib/sanity';
import { motion } from 'framer-motion';

interface Coach {
  name: string;
  role: string;
  image: any;
  bio: string;
  philosophy: string;
  email?: string; 
  signature?: any;
}

const CoachSection = () => {
  const [coach, setCoach] = useState<Coach | null>(null);

  useEffect(() => {
    const query = `*[_type == "coach"][0]`;
    
    client.fetch(query).then((data) => {
      setCoach(data);
    }).catch(console.error);
  }, []);

  if (!coach) return null;
  return (
    <section id="om-oss" className="relative overflow-hidden bg-tennis-navy py-24 text-white">
      
      {/* Dekorativ bakgrund (en svag tennisboll eller cirkel) */}
      <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-tennis-gold opacity-5 blur-3xl"></div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        
        {/* VÄNSTER: Bild */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto w-full max-w-md lg:max-w-full"
        >
          {/* Ram-effekt */}
          <div className="absolute -bottom-4 -left-4 h-full w-full border-2 border-tennis-gold"></div>
          
          {coach.image && (
            <img 
              src={urlFor(coach.image).url()} 
              alt={coach.name}
              className="relative z-10 h-full w-full object-cover shadow-2xl grayscale transition-all duration-500 hover:grayscale-0"
            />
          )}
        </motion.div>

        {/* HÖGER: Text */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-tennis-gold">
            {coach.role}
          </p>
          
          <h2 className="mb-6 text-4xl font-extrabold uppercase leading-none md:text-5xl">
            {coach.name}
          </h2>

          <div className="mb-8 border-l-4 border-tennis-gold pl-6">
            <p className="text-xl font-light italic text-gray-300">
              "{coach.philosophy}"
            </p>
          </div>

          <p className="mb-8 text-lg leading-relaxed text-gray-400">
            {coach.bio}
          </p>

         {/* SIGNATUR-BILD */}
          {/* Visa bara om bilden finns uppladdad i Sanity */}
          {coach.signature && (
            <img 
              src={urlFor(coach.signature).url()} 
              alt={`${coach.name} signatur`}
              className="mb-8 h-16 w-auto opacity-60 invert filter" 
            />
          )}

         {coach.email && (
            <a 
              href={`mailto:${coach.email}`}
              className="inline-block border border-white bg-transparent px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-tennis-navy"
            >
              Kontakta mig
            </a>
          )}

        </motion.div>
      </div>
    </section>
  );
};

export default CoachSection;