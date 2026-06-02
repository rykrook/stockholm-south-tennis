import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { client, urlFor } from '../lib/sanity';
import defaultHeroImage from '../assets/tennis.jpg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { useLocalize } from '../lib/locale';

interface HeroData {
    heroImage: any;
    heroVideoUrl?: string;
    heroTitle: string;
    heroTitleAccent: string;
    heroSubtitle: string;
}

const Hero = () => {
    const { t } = useTranslation();
    const localize = useLocalize();
    const [data, setData] = useState<HeroData | null>(null);

    useEffect(() => {
        const query = `*[_type == "siteSettings"][0]{
            heroImage,
            "heroVideoUrl": heroVideo.asset->url,
            heroTitle,
            heroTitleAccent,
            heroSubtitle
        }`;

        client.fetch(query)
            .then((result) => setData(result))
            .catch(console.error);
    }, []);

    const title = localize(data?.heroTitle) || "Utveckla ditt spel";
    const titleAccent = localize(data?.heroTitleAccent) || "till nästa nivå";
    const subtitle = localize(data?.heroSubtitle) || "Professionell träning i Tumba för juniorer och vuxna som vill mer än bara slå bollar. Vi bygger spelare med rätt teknik, fysik och mentalitet.";

    const bgImage = data?.heroImage ? urlFor(data.heroImage).width(2400).quality(80).url() : defaultHeroImage;
    const videoUrl = data?.heroVideoUrl;

    // Staggered reveal for the headline lines
    const lineParent = {
        hidden: {},
        show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
    };
    const lineChild = {
        hidden: { y: 26, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
    };

    return (
        <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-navy-950">
            {/* --- BACKGROUND MEDIA --- */}
            <div className="absolute inset-0">
                {videoUrl ? (
                    <video
                        className="h-full w-full object-cover object-center"
                        src={videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                ) : (
                    <img
                        src={bgImage}
                        alt=""
                        className="h-full w-full object-cover object-center animate-kenburns"
                    />
                )}
            </div>

            {/* --- LAYERED OVERLAYS for cinematic depth + legibility --- */}
            <div className="absolute inset-0 bg-navy-950/40" />
            <div className="absolute inset-0 bg-hero-vignette" />
            <div className="absolute inset-0 bg-navy-fade" />
            {/* centered scrim so headline pops on busy photos */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(5,11,24,0.6),transparent_75%)]" />
            {/* warm gold glow from the lower-left, like court-side light */}
            <div className="pointer-events-none absolute -bottom-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-tennis-gold/20 blur-[120px]" />
            {/* film grain */}
            <div className="grain-overlay pointer-events-none absolute inset-0" />

            {/* --- CONTENT --- */}
            <div className="relative z-10 flex h-full flex-col">
                <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                    <div className="max-w-5xl">
                        {/* Eyebrow */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                            className="mb-6 flex items-center justify-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold-light md:text-xs"
                        >
                            <span className="h-px w-8 bg-tennis-gold/60" />
                            Stockholm South Tennis Academy
                            <span className="h-px w-8 bg-tennis-gold/60" />
                        </motion.div>

                        {/* Headline with line-clip reveal */}
                        <motion.h1
                            variants={lineParent}
                            initial="hidden"
                            animate="show"
                            className="font-display text-[3.25rem] uppercase leading-[1.0] tracking-tight text-white drop-shadow-[0_4px_30px_rgba(5,11,24,0.6)] sm:text-7xl md:text-8xl lg:text-[7.5rem]"
                        >
                            {/* No overflow clipping → Swedish diacritics (Ä Å Ö) always render in full */}
                            <motion.span variants={lineChild} className="block">
                                {title}
                            </motion.span>
                            {/* Solid gold (not a background-clip gradient) so Ä/Å marks never get sliced, incl. Safari */}
                            {/* mt gives row 2's Ä/Å ring clearance from row 1 (scales with font size) */}
                            <motion.span variants={lineChild} className="mt-[0.28em] block text-tennis-gold">
                                {titleAccent}
                            </motion.span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.65, ease: 'easeOut' }}
                            className="mx-auto mt-7 max-w-2xl text-balance text-base leading-relaxed text-gray-300 md:text-lg"
                        >
                            {subtitle}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                        >
                            <Link
                                to="/lager"
                                className="group relative inline-flex items-center gap-2 overflow-hidden bg-tennis-gold px-8 py-4 text-sm font-bold uppercase tracking-widest text-tennis-navy shadow-gold transition-transform duration-300 hover:-translate-y-0.5"
                            >
                                {/* sheen sweep */}
                                <span className="absolute inset-0 -translate-x-full bg-gold-sheen transition-transform duration-700 ease-out group-hover:translate-x-full" />
                                <span className="relative">{t('hero.cta_camp')}</span>
                                <ArrowRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>

                            <a
                                href="#program"
                                className="group inline-flex items-center gap-2 border border-white/40 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-tennis-navy"
                            >
                                {t('hero.cta_programs')}
                                <ArrowRight size={16} className="opacity-60 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll cue */}
                <motion.a
                    href="#program"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mb-8 flex flex-col items-center gap-2 text-white/60 transition-colors hover:text-tennis-gold"
                    aria-label={t('hero.scroll')}
                >
                    <span className="text-[0.6rem] font-semibold uppercase tracking-[0.3em]">{t('hero.scroll')}</span>
                    <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/40 p-1">
                        <span className="h-2 w-0.5 animate-scroll-cue rounded-full bg-current" />
                    </span>
                </motion.a>
            </div>
        </section>
    );
};

export default Hero;
