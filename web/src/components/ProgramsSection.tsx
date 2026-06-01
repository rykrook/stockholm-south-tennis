import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { client, urlFor } from '../lib/sanity';
import { useLocalize } from '../lib/locale';

interface Program {
  _id: string;
  title: string;
  description: string;
  slug?: string;
  mainImage?: any;
  price?: string;
  ageGroup?: string;
}

const ProgramsSection = () => {
  const { t } = useTranslation();
  const localize = useLocalize();
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
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

  const ageLabel = (group?: string) =>
    group ? t(`programs.age_${group}`, { defaultValue: '' }) : '';

  const CardInner = ({ program, index }: { program: Program; index: number }) => (
    <>
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-tennis-navy">
        {program.mainImage ? (
          <img
            src={urlFor(program.mainImage).width(800).height(600).url()}
            alt={localize(program.title)}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-navy-800 to-navy-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-tennis-navy via-tennis-navy/25 to-transparent" />

        {/* Index number */}
        <span className="absolute left-5 top-3 font-display text-5xl leading-none text-white/25">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Age chip */}
        {ageLabel(program.ageGroup) && (
          <span className="absolute right-4 top-4 rounded-full bg-tennis-gold/90 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-tennis-navy backdrop-blur-sm">
            {ageLabel(program.ageGroup)}
          </span>
        )}

        {/* Title over image */}
        <h3 className="absolute inset-x-5 bottom-4 font-display text-2xl uppercase leading-tight tracking-wide text-white">
          {localize(program.title)}
        </h3>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-7">
        {localize(program.price) && (
          <span className="mb-3 inline-flex w-fit items-center text-sm font-bold uppercase tracking-wider text-tennis-gold">
            {localize(program.price)}
          </span>
        )}
        <p className="mb-6 flex-1 leading-relaxed text-gray-600">{localize(program.description)}</p>

        <div className="mt-auto border-t border-gray-100 pt-5">
          {program.slug ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-tennis-navy transition-colors group-hover:text-tennis-gold">
              {t('programs.cta')}
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          ) : (
            <span className="text-xs text-red-500">{t('programs.missing_slug')}</span>
          )}
        </div>
      </div>
    </>
  );

  return (
    <section id="program" className="relative overflow-hidden bg-tennis-cream py-24 md:py-32">
      {/* Decorative oversized faded word */}
      <span className="pointer-events-none absolute -top-6 left-0 select-none font-display text-[8rem] uppercase leading-none text-tennis-navy/[0.03] md:text-[14rem]">
        Tennis
      </span>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-tennis-gold">
            <span className="h-px w-8 bg-tennis-gold" />
            {t('programs.eyebrow')}
          </p>
          <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-tight text-tennis-navy md:text-6xl">
            {t('programs.title')}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-600">{t('programs.subtitle')}</p>
        </div>

        {/* Grid */}
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <motion.div
              key={program._id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {program.slug ? (
                <Link
                  to={`/program/${program.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover"
                >
                  <CardInner program={program} index={index} />
                </Link>
              ) : (
                <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-card">
                  <CardInner program={program} index={index} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
