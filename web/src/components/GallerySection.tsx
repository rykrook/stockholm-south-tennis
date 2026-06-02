import { useEffect, useState } from 'react';
import { client, urlFor } from '../lib/sanity';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocalize } from '../lib/locale';
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

const GallerySection = () => {
    const { t } = useTranslation();
    const localize = useLocalize();
    const [data, setData] = useState<any>(null);
    const [lightbox, setLightbox] = useState<number | null>(null);

    useEffect(() => {
        const query = `{
      "gallery": *[_type == "gallery"][0]{ scrollingText, images },
      "settings": *[_type == "siteSettings"][0]{ instagramUrl }
    }`;
        client.fetch(query).then(setData).catch(console.error);
    }, []);

    const images: any[] = data?.gallery?.images || [];

    // Keyboard controls + lock body scroll while the lightbox is open
    useEffect(() => {
        if (lightbox === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightbox(null);
            if (e.key === 'ArrowRight') setLightbox((v) => (v === null ? v : (v + 1) % images.length));
            if (e.key === 'ArrowLeft') setLightbox((v) => (v === null ? v : (v - 1 + images.length) % images.length));
        };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [lightbox, images.length]);

    if (!data || images.length === 0) return null;

    const marqueeText = (localize(data.gallery.scrollingText) || 'PASSION • PERFORMANCE • VICTORY').toString();
    const go = (dir: number) => setLightbox((v) => (v === null ? v : (v + dir + images.length) % images.length));

    const Half = ({ rev = false }: { rev?: boolean }) => (
        <div className="flex shrink-0">
            {Array(5).fill(0).map((_, i) => (
                <span key={i} className="mx-7 inline-flex items-center gap-7">
                    {marqueeText}
                    <span className={rev ? 'text-tennis-gold/20' : 'text-tennis-gold'} style={{ WebkitTextStroke: '0px' }}>
                        ●
                    </span>
                </span>
            ))}
        </div>
    );

    return (
        <section className="grain-overlay relative overflow-hidden bg-navy-950 py-24 md:py-32">
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />
            <div className="pointer-events-none absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full bg-tennis-gold/10 blur-[130px]" />
            <div className="pointer-events-none absolute -left-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-navy-600/25 blur-[130px]" />

            <div className="relative z-10">
                {/* Header */}
                <div className="mx-auto mb-10 max-w-7xl px-6 text-center">
                    <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-tennis-gold">
                        <span className="h-px w-8 bg-tennis-gold" />
                        {t('gallery.eyebrow')}
                        <span className="h-px w-8 bg-tennis-gold" />
                    </p>
                    <h3 className="mt-4 font-display text-4xl uppercase tracking-tight text-white md:text-6xl">
                        {t('gallery.title')}
                    </h3>
                </div>

                {/* TOP MARQUEE */}
                <div className="marquee-mask relative mb-12 flex overflow-hidden py-1">
                    <div
                        className="flex animate-marquee whitespace-nowrap font-display text-5xl uppercase leading-none text-transparent md:text-8xl"
                        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.28)' }}
                    >
                        <Half />
                        <Half />
                    </div>
                </div>

                {/* BENTO GRID */}
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid auto-rows-[155px] grid-cols-2 gap-3 md:auto-rows-[235px] md:gap-4 lg:grid-cols-3">
                        {images.map((img: any, i: number) => {
                            const featured = i === 0;
                            return (
                                <motion.button
                                    key={i}
                                    type="button"
                                    onClick={() => setLightbox(i)}
                                    aria-label={`Öppna bild ${i + 1}`}
                                    initial={{ opacity: 0, scale: 0.94 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                    className={`group relative block overflow-hidden rounded-xl bg-navy-800 text-left ring-1 ring-inset ring-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-gold hover:ring-2 hover:ring-tennis-gold/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-tennis-gold ${
                                        featured ? 'col-span-2 row-span-2' : ''
                                    }`}
                                >
                                    <img
                                        src={urlFor(img).width(featured ? 1200 : 700).url()}
                                        alt=""
                                        className="h-full w-full object-cover brightness-[0.82] saturate-[0.9] transition-all duration-[900ms] ease-out group-hover:scale-105 group-hover:brightness-110 group-hover:saturate-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                                    <span className="absolute left-4 top-2 font-display text-4xl leading-none text-white/25 transition-colors duration-500 group-hover:text-tennis-gold">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <div className="absolute bottom-4 left-4 flex translate-y-2 items-center gap-2 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                        <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em]">Stockholm South</span>
                                    </div>
                                    <div className="absolute bottom-3 right-3 flex h-9 w-9 scale-90 items-center justify-center rounded-full bg-tennis-gold text-tennis-navy opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                                        <ArrowUpRight size={16} />
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* BOTTOM MARQUEE */}
                <div className="marquee-mask relative mt-12 flex overflow-hidden py-1">
                    <div className="flex animate-marquee-rev whitespace-nowrap font-display text-5xl uppercase leading-none text-white/[0.05] md:text-8xl">
                        <Half rev />
                        <Half rev />
                    </div>
                </div>

                {/* Instagram CTA */}
                {data.settings?.instagramUrl && (
                    <div className="mt-12 text-center">
                        <a
                            href={data.settings.instagramUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-center gap-2 border-b-2 border-white/40 pb-1 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:border-tennis-gold hover:text-tennis-gold"
                        >
                            {t('gallery.instagram')}
                            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </div>
                )}
            </div>

            {/* --- LIGHTBOX --- */}
            <AnimatePresence>
                {lightbox !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setLightbox(null)}
                        className="fixed inset-0 z-[300] flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur-sm md:p-10"
                    >
                        {/* Close */}
                        <button
                            onClick={() => setLightbox(null)}
                            aria-label="Stäng"
                            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            <X size={26} />
                        </button>

                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); go(-1); }}
                                    aria-label="Föregående"
                                    className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-all hover:bg-tennis-gold hover:text-tennis-navy md:left-6"
                                >
                                    <ChevronLeft size={28} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); go(1); }}
                                    aria-label="Nästa"
                                    className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-all hover:bg-tennis-gold hover:text-tennis-navy md:right-6"
                                >
                                    <ChevronRight size={28} />
                                </button>
                            </>
                        )}

                        <motion.img
                            key={lightbox}
                            src={urlFor(images[lightbox]).width(1800).url()}
                            alt=""
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-h-[85vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
                        />

                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-display text-sm tracking-widest text-white/60">
                            {String(lightbox + 1).padStart(2, '0')}
                            <span className="mx-1 text-white/30">/</span>
                            {String(images.length).padStart(2, '0')}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default GallerySection;
