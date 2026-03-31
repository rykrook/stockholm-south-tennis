import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// 1. VIKTIGT: Importera Link från react-router-dom
import { Link } from 'react-router-dom'; 
import { client, urlFor } from '../lib/sanity'; // (eller ../sanity beroende på din filstruktur)

const ProgramsSection = () => {
  const [programs, setPrograms] = useState<any[]>([]);

  useEffect(() => {
    // 2. VIKTIGT: Vi måste hämta "slug.current" från Sanity för att veta vilken URL vi ska till
    const query = `*[_type == "program"] | order(_createdAt asc) {
      _id,
      title,
      description,
      "slug": slug.current, 
      mainImage,
      price,
      ageGroup
    }`;

    client.fetch(query).then(setPrograms).catch(console.error);
  }, []);

  return (
    <section id="program" className="bg-gray-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-extrabold uppercase tracking-tight text-tennis-navy md:text-5xl">
            Våra Program
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <motion.div
              key={program._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group flex flex-col overflow-hidden rounded-sm bg-white shadow-md transition-all hover:shadow-xl"
            >
              {/* Bild */}
              <div className="relative h-32 overflow-hidden bg-tennis-navy">
                {program.mainImage && (
                  <img
                    src={urlFor(program.mainImage).width(600).url()}
                    alt={program.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>

              {/* Textinnehåll */}
              <div className="flex flex-1 flex-col p-8">
                <h3 className="mb-3 text-2xl font-bold uppercase text-tennis-navy">
                  {program.title}
                </h3>
                <p className="mb-6 flex-1 text-gray-600">
                  {program.description}
                </p>

                {/* 3. VIKTIGT: Använd <Link> istället för <a> för att byta sida utan att ladda om webbläsaren */}
                <div className="mt-auto border-t border-gray-100 pt-6">
                  {program.slug ? (
                    <Link
                      to={`/program/${program.slug}`}
                      className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-tennis-gold transition-colors hover:text-tennis-navy"
                    >
                      Läs mer om upplägg & schema
                      <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  ) : (
                    <span className="text-xs text-red-500">Saknar slug i Sanity</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProgramsSection;