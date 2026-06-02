import { useEffect, useState, useRef } from 'react';
import { client, urlFor } from '../lib/sanity';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocalize } from '../lib/locale';
import { Camera, ArrowUpRight } from 'lucide-react';

const GallerySection = () => {
    const { t } = useTranslation();
    const localize = useLocalize();
    const [data, setData] = useState<any>(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const query = `{
      "gallery": *[_type == "gallery"][0]{ scrollingText, images },
      "settings": *[_type == "siteSettings"][0]{ instagramUrl }
    }`;
        client.fetch(query).then(setData).catch(console.error);
    }, []);

    // --- PARALLAX ---
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    const marqueeX = useTransform(scrollYProgress, [0, 1], ['2%', '-30%']);
    const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '-4%']);

    const images: any[] = data?.gallery?.images || [];
    const scrollingText = localize(data?.gallery?.scrollingText) || 'PASSION • PERFORMANCE • VICTORY';

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[50vh] overflow-hidden bg-tennis-cream py-24 md:py-32"
        >
            {data?.gallery?.images && (
                <>
                    {/* --- PARALLAX MARQUEE WATERMARK --- */}
                    <div className="pointer-events-none absolute top-1/2 left-0 w-full -translate-y-1/2 select-none overflow-hidden">
                        <motion.div
                            style={{ x: marqueeX, WebkitTextStroke: '2px rgba(10,25,47,0.08)' }}
                            className="whitespace-nowrap font-display text-[5.5rem] uppercase leading-none text-transparent md:text-[11rem]"
                        >
                            {Array(10).fill(scrollingText).map((text, i) => (
                                <span key={i}>{text}&nbsp;&nbsp;</span>
                            ))}
                        </motion.div>
                    </div>

                    <div className="relative z-10 mx-auto max-w-7xl px-6">
                        {/* Header */}
                        <div className="mb-14 text-center">
                            <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-tennis-gold">
                                <span className="h-px w-8 bg-tennis-gold" />
                                {t('gallery.eyebrow')}
                                <span className="h-px w-8 bg-tennis-gold" />
                            </p>
                            <h3 className="mt-4 font-display text-4xl uppercase tracking-tight text-tennis-navy md:text-6xl">
                                {t('gallery.title')}
                            </h3>
                        </div>

                        {/* --- BENTO GRID --- */}
                        <motion.div
                            style={{ y: gridY }}
                            className="grid auto-rows-[150px] grid-cols-2 gap-3 md:auto-rows-[230px] md:gap-5 lg:grid-cols-3"
                        >
                            {images.map((img: any, index: number) => {
                                const featured = index === 0;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.94 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, margin: '-40px' }}
                                        transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                                        className={`group relative cursor-pointer overflow-hidden rounded-xl bg-tennis-navy shadow-card ${
                                            featured ? 'col-span-2 row-span-2' : ''
                                        }`}
                                    >
                                        <img
                                            src={urlFor(img).width(featured ? 1200 : 700).url()}
                                            alt=""
                                            className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
                                        />
                                        {/* gold-toned darken on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-tennis-navy/85 via-tennis-navy/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                        {/* gold ring */}
                                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 transition duration-500 group-hover:ring-2 group-hover:ring-tennis-gold/60" />
                                        {/* corner icon */}
                                        <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
                                            <ArrowUpRight size={16} />
                                        </div>
                                        {/* reveal label */}
                                        <div className="absolute bottom-4 left-4 flex translate-y-3 items-center gap-2 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                            <Camera size={15} className="text-tennis-gold" />
                                            <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em]">
                                                Stockholm South
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* Instagram CTA */}
                        {data.settings?.instagramUrl && (
                            <div className="mt-16 text-center">
                                <a
                                    href={data.settings.instagramUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group inline-flex items-center gap-2 border-b-2 border-tennis-navy pb-1 text-sm font-bold uppercase tracking-widest text-tennis-navy transition-colors hover:border-tennis-gold hover:text-tennis-gold"
                                >
                                    {t('gallery.instagram')}
                                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </a>
                            </div>
                        )}
                    </div>
                </>
            )}
        </section>
    );
};

export default GallerySection;
