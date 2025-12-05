import { useEffect, useState, useRef } from 'react';
import { client, urlFor } from '../lib/sanity';
import { motion, useScroll, useTransform } from 'framer-motion';

const GallerySection = () => {
    const [data, setData] = useState<any>(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const query = `{
      "gallery": *[_type == "gallery"][0]{
        scrollingText,
        images
      },
      "settings": *[_type == "siteSettings"][0]{
        instagramUrl
      }
    }`;

        client.fetch(query).then(setData).catch(console.error);
    }, []);

    // --- PARALLAX ANIMATION ---
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-280%"]);
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-white py-24 md:py-32 min-h-[50vh]"
        >

            {/* Visa bara innehållet om galleri-data har laddats */}
            {data && data.gallery && data.gallery.images && (
                <>
                    {/* --- RULLANDE TEXT BAKGRUND --- */}
                    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 select-none overflow-visible pointer-events-none">
                        <motion.div
                            style={{ x }}
                            className="whitespace-nowrap text-[4rem] md:text-[6rem] font-black uppercase leading-none text-tennis-navy opacity-10"
                        >
                            {Array(12).fill(data.gallery.scrollingText).map((text, i) => (
                                <span key={i}>
                                    {text} &nbsp; • &nbsp;
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    <div className="mx-auto max-w-7xl px-6 relative z-10">

                        <div className="mb-16 text-center">
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-tennis-gold">
                                Life at the Academy
                            </h2>
                            <h3 className="mt-2 text-3xl font-extrabold uppercase text-tennis-navy md:text-5xl">
                                In Action
                            </h3>
                        </div>

                        {/* --- MASONRY GRID --- */}
                        <motion.div
                            style={{ y }}
                            className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6"
                        >
                            {data.gallery.images.map((img: any, index: number) => {
                                const isLarge = index === 0 || index === 5;
                                const isWide = index === 3;

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className={`relative overflow-hidden rounded-sm group cursor-pointer
                      ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}
                      ${isWide ? 'md:col-span-2' : ''}
                      h-64 md:h-auto
                    `}
                                    >
                                        <img
                                            src={urlFor(img).width(800).url()}
                                            alt="Gallery"
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        <div className="absolute inset-0 bg-tennis-navy/0 transition-colors duration-300 group-hover:bg-tennis-navy/20"></div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* --- KNAPP TILL INSTAGRAM (DYNAMISK) --- */}
                        {/* Visa bara om länk finns i siteSettings */}
                        {data.settings?.instagramUrl && (
                            <div className="mt-16 text-center">
                                <a
                                    href={data.settings.instagramUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-block border-b-2 border-tennis-navy pb-1 text-sm font-bold uppercase tracking-widest text-tennis-navy hover:text-tennis-gold hover:border-tennis-gold transition-colors"
                                >
                                    Följ oss på Instagram
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