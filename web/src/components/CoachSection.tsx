import { useEffect, useState } from 'react';
import { client, urlFor } from '../lib/sanity';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocalize } from '../lib/locale';

interface Coach {
  _id: string;
  name: string;
  role: string;
  image: any;
  bio: string;
  philosophy: string;
  email?: string;
  signature?: any;
}

const CoachSection = () => {
  const { t } = useTranslation();
  const localize = useLocalize();
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const query = `*[_type == "coach"] | order(_createdAt asc)`;
    client.fetch(query).then(setCoaches).catch(console.error);
  }, []);

  if (coaches.length === 0) return null;

  const activeCoach = coaches[currentIndex];
  const nextCoach = () => setCurrentIndex((prev) => (prev === coaches.length - 1 ? 0 : prev + 1));
  const prevCoach = () => setCurrentIndex((prev) => (prev === 0 ? coaches.length - 1 : prev - 1));

  return (
    <section id="om-oss" className="grain-overlay relative overflow-hidden bg-navy-950 py-24 text-white md:py-32">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -right-24 top-16 h-96 w-96 rounded-full bg-tennis-gold/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-navy-600/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section eyebrow */}
        <p className="mb-12 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-tennis-gold">
          <span className="h-px w-8 bg-tennis-gold" />
          {t('coach.eyebrow')}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCoach._id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-12 lg:grid-cols-2 lg:items-center"
          >
            {/* LEFT: Image */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-full">
              <div className="absolute -bottom-4 -left-4 h-full w-full border border-tennis-gold/70" />
              {activeCoach.image && (
                <img
                  src={urlFor(activeCoach.image).width(900).url()}
                  alt={activeCoach.name}
                  className="relative z-10 h-[520px] w-full object-cover object-top shadow-2xl grayscale transition-all duration-700 hover:grayscale-0"
                />
              )}
            </div>

            {/* RIGHT: Text */}
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-tennis-gold">
                {localize(activeCoach.role)}
              </p>

              <h2 className="mb-8 font-display text-5xl uppercase leading-[0.9] md:text-6xl">
                {activeCoach.name}
              </h2>

              {localize(activeCoach.philosophy) && (
                <div className="relative mb-8 pl-7">
                  <Quote className="absolute -left-1 -top-2 text-tennis-gold/40" size={36} strokeWidth={1.5} />
                  <p className="border-l-2 border-tennis-gold pl-6 text-xl font-light italic text-gray-200">
                    {localize(activeCoach.philosophy)}
                  </p>
                </div>
              )}

              <p className="mb-8 text-lg leading-relaxed text-gray-400">{localize(activeCoach.bio)}</p>

              {activeCoach.signature && (
                <img
                  src={urlFor(activeCoach.signature).url()}
                  alt={`${activeCoach.name} signatur`}
                  className="mb-8 h-16 w-auto opacity-70 invert filter"
                />
              )}

              {/* Actions */}
              <div className="mt-8 flex flex-col justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
                {activeCoach.email ? (
                  <a
                    href={`mailto:${activeCoach.email}`}
                    className="group relative inline-block overflow-hidden border border-white/70 px-8 py-3 text-center text-sm font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:text-tennis-navy"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-300 ease-out group-hover:translate-x-0" />
                    <span className="relative">{t('coach.contact')}</span>
                  </a>
                ) : (
                  <div />
                )}

                {coaches.length > 1 && (
                  <div className="flex items-center gap-4">
                    <button
                      onClick={prevCoach}
                      className="flex h-12 w-12 items-center justify-center border border-white/25 text-white transition-all hover:border-tennis-gold hover:bg-tennis-gold hover:text-tennis-navy"
                      aria-label={t('coach.prev')}
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <span className="font-display text-lg tracking-widest text-white/50">
                      {String(currentIndex + 1).padStart(2, '0')}
                      <span className="mx-1 text-white/25">/</span>
                      {String(coaches.length).padStart(2, '0')}
                    </span>
                    <button
                      onClick={nextCoach}
                      className="flex h-12 w-12 items-center justify-center border border-white/25 text-white transition-all hover:border-tennis-gold hover:bg-tennis-gold hover:text-tennis-navy"
                      aria-label={t('coach.next')}
                    >
                      <ChevronRight size={22} />
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
