import { useEffect, useState } from 'react';
import { client } from '../lib/sanity';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import BackgroundContainer from './BackgroundContainer';

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [bgSettings, setBgSettings] = useState<any>(null);

  useEffect(() => {
    client.fetch(`*[_type == "testimonial"]`).then(setTestimonials).catch(console.error);

    const bgQuery = `*[_type == "siteSettings"][0].testimonialsBackground{
      image,
      "videoUrl": video.asset->url,
      overlayOpacity
    }`;
    client.fetch(bgQuery).then(setBgSettings).catch(console.error);
  }, []);

  

  return (
    <BackgroundContainer settings={bgSettings}
      fallbackColor="bg-gray-50"
      className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Rubrik */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-extrabold uppercase tracking-tight text-tennis-navy md:text-4xl">
            Vad våra spelare säger
          </h2>
          <div className="mt-4 mx-auto h-1 w-20 bg-tennis-gold"></div>
        </div>

        {/* Grid med kort */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative rounded-sm bg-white p-8 shadow-md"
            >
              {/* Citat-ikon bakom texten */}
              <Quote className="absolute right-4 top-4 h-12 w-12 text-gray-100 rotate-180" />

              {/* Stjärnor */}
              <div className="mb-4 flex text-tennis-gold">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" className="mr-1" />
                ))}
              </div>

              {/* Text */}
              <p className="mb-6 relative z-10 text-gray-600 italic leading-relaxed">
                "{item.quote}"
              </p>

              {/* Avsändare */}
              <div className="mt-auto border-t pt-4 border-gray-100">
                <p className="font-bold uppercase text-tennis-navy text-sm">{item.name}</p>
                <p className="text-xs text-tennis-gold font-bold tracking-wider uppercase mt-1">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </BackgroundContainer>
  );
};

export default Testimonials;