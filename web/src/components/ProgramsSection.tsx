import { useEffect, useState } from 'react';
import { client, urlFor } from '../lib/sanity';
import { motion } from 'framer-motion';

interface Program {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  price: string;
  ageGroup: string;
  description: string;
}

const ProgramsSection = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      const query = `*[_type == "program"]{
        _id,
        title,
        slug,
        mainImage,
        price,
        ageGroup,
        description
      }`;

      try {
        const data = await client.fetch(query);
        setPrograms(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Kunde inte hämta program:", error);
        setIsLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (isLoading) {
    return <div className="py-20 text-center text-white">Laddar program...</div>;
  }

  return (
    <section id="program" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* --- RUBRIK --- */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-extrabold uppercase tracking-tight text-tennis-navy md:text-5xl">
            Våra <span className="text-tennis-gold">Program</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Vi erbjuder träning i världsklass för alla nivåer. Från nybörjare till elitspelare. Hitta programmet som passar dig.
          </p>
        </div>

        {/* --- GRID MED PROGRAM-KORT --- */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <motion.div
              key={program._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative flex flex-col overflow-hidden bg-white shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* BILD */}
              <div className="relative h-64 w-full overflow-hidden">
                {program.mainImage && (
                  <img
                    src={urlFor(program.mainImage).width(800).height(600).url()}
                    alt={program.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                {/* Pris-tagg uppe i hörnet */}
                <div className="absolute right-0 top-0 bg-tennis-gold px-4 py-2 text-xs font-bold uppercase tracking-widest text-tennis-navy">
                  {program.ageGroup === 'kids' ? 'Barn' : program.ageGroup === 'junior' ? 'Junior' : program.ageGroup === 'adults' ? 'Vuxen' : 'Alla'}
                </div>
              </div>

              {/* TEXTINNEHÅLL */}
              <div className="flex flex-1 flex-col p-8">
                <h3 className="mb-2 text-2xl font-bold uppercase text-tennis-navy group-hover:text-tennis-gold transition-colors">
                  {program.title}
                </h3>
                
                {program.price && (
                  <p className="mb-4 text-sm font-semibold text-gray-500">
                    {program.price}
                  </p>
                )}

                <p className="mb-6 line-clamp-3 flex-1 text-gray-600">
                  {program.description}
                </p>

                {/* KNAPP */}
                <button className="mt-auto w-full border-2 border-tennis-navy py-3 text-sm font-bold uppercase tracking-widest text-tennis-navy transition-all hover:bg-tennis-navy hover:text-white">
                  Läs mer
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProgramsSection;