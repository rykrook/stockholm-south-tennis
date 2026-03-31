import { useEffect, useState } from 'react';
import { client, urlFor } from '../lib/sanity';

const CampPage = () => {
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    client.fetch(`*[_type == "campEntry"] | order(date desc)`).then(setEntries);
    
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen pb-20">
      
      <div className="relative h-[30vh] md:h-[40vh] w-full flex items-center justify-center bg-tennis-navy pt-24 border-t-4 border-tennis-gold">
        <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter px-6 text-center">
          Våra Läger
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-16">
        <div className="space-y-20">
          {entries.map((entry) => (
            <div key={entry._id} className="group">
              {entry.image && (
                <div className="overflow-hidden rounded-sm mb-6 shadow-md">
                  <img 
                    src={urlFor(entry.image).width(1200).url()} 
                    alt={entry.title} 
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
              <h2 className="text-2xl font-bold uppercase text-tennis-navy mb-4">{entry.title}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{entry.text}</p>
              <div className="mt-4 text-tennis-gold font-bold text-sm uppercase tracking-widest">
                {entry.date}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default CampPage;