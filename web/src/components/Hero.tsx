import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { client, urlFor } from '../lib/sanity';
import defaultHeroImage from '../assets/tennis.jpg';

interface HeroData {
    heroImage: any;
    heroVideo: any;
    heroTitle: string;
    heroTitleAccent: string;
    heroSubtitle: string;
}

const Hero = () => {
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

    // Standardvärden (Fallback) om inget finns i Sanity än
    const title = data?.heroTitle || "Utveckla ditt spel";
    const titleAccent = data?.heroTitleAccent || "till nästa nivå";
    const subtitle = data?.heroSubtitle || "Professionell träning i Tumba för juniorer och vuxna som vill mer än bara slå bollar. Vi bygger spelare med rätt teknik, fysik och mentalitet.";

    const bgImage = data?.heroImage ? urlFor(data.heroImage).url() : defaultHeroImage;

    // @ts-ignore (ignorerar TS varning om dynamisk property på data objektet)
    const videoUrl = data?.heroVideoUrl;

    return (
        <section className="relative h-screen w-full overflow-hidden bg-tennis-navy">

            {/* --- BAKGRUND (VIDEO ELLER BILD) --- */}
            <div className="absolute inset-0">

                {videoUrl ? (
                    /* VIDEO BAKGRUND (Om video finns i Sanity) */
                    <video
                        className="h-full w-full object-cover object-center"
                        src={videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                ) : (
                    /* BILD BAKGRUND (Annars bild) */
                    <img
                        src={bgImage}
                        alt="Hero Background"
                        className="h-full w-full object-cover object-center"
                    />
                )}

                {/* overlay */}
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* --- INNEHÅLL --- */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="max-w-4xl"
                >
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-tennis-gold md:text-base">
                        Stockholm South Tennis Academy • Tumba, Stockholm
                    </p>

                    <h1 className="mb-6 text-5xl font-extrabold uppercase leading-tight tracking-tight text-white md:text-7xl">
                        {title} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-tennis-gold">
                            {titleAccent}
                        </span>
                    </h1>

                    <p className="mb-8 text-lg leading-relaxed text-gray-200 md:text-xl mx-auto max-w-2xl">
                        {subtitle}
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <a
                            href="#kontakt"
                            className="rounded-none bg-tennis-gold px-8 py-4 text-sm font-bold uppercase tracking-wider text-tennis-navy transition-all hover:bg-white hover:text-tennis-navy md:text-base"
                        >
                            Boka Provträning
                        </a>

                        <a
                            href="#program"
                            className="rounded-none border-2 border-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-tennis-navy md:text-base"
                        >
                            Våra Program
                        </a>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default Hero;