import { useEffect, useState } from 'react';
import { client, urlFor } from '../lib/sanity';
import { ChevronLeft, ChevronRight, Calendar, ArrowLeft } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { Link } from 'react-router-dom';


const portableTextComponents = {
    block: {
        normal: ({ children }: any) => <p className="text-gray-600 leading-relaxed text-lg mb-4">{children}</p>,
    },
    marks: {
        strong: ({ children }: any) => <strong className="font-bold text-tennis-navy">{children}</strong>,
    },
    list: {
        bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-4 text-gray-600 text-lg space-y-2">{children}</ul>,
    },
};

const ImageCarousel = ({ gallery, title }: { gallery: any[], title: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!gallery || gallery.length === 0) return null;

    const nextImage = () => {
        setCurrentIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
    };

    return (
        <div className="relative group overflow-hidden rounded-sm mb-6 shadow-md bg-tennis-navy h-[300px] md:h-[500px]">
            <img
                src={urlFor(gallery[currentIndex]).width(1200).url()}
                alt={`${title} - bild ${currentIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-500"
            />

            {gallery.length > 1 && (
                <>

                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-tennis-navy/80 text-white p-2 md:p-3 rounded-full transition-all hover:bg-tennis-gold hover:text-tennis-navy hover:scale-110 z-10 shadow-lg"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-tennis-navy/80 text-white p-2 md:p-3 rounded-full transition-all hover:bg-tennis-gold hover:text-tennis-navy hover:scale-110 z-10 shadow-lg"
                    >
                        <ChevronRight size={24} />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {gallery.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-2 rounded-full transition-all ${idx === currentIndex ? 'w-6 bg-tennis-gold' : 'w-2 bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};


const CampPage = () => {
    const [upcomingCamps, setUpcomingCamps] = useState<any[]>([]);
    const [pastCamps, setPastCamps] = useState<any[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        const query = `*[_type == "campEntry"] | order(startDate asc)`;

        client.fetch(query).then((data) => {
            const today = new Date().toISOString().split('T')[0];

            const upcoming = data.filter((camp: any) => camp.startDate >= today);
            const past = data.filter((camp: any) => camp.startDate < today);

            past.sort((a: any, b: any) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

            setUpcomingCamps(upcoming);
            setPastCamps(past);
        });
    }, []);

    return (
        <div className="bg-white min-h-screen pb-20">

            {/* HEADER MED RUBRIK OCH TILLBAKAKNAPP */}
            <div className="relative h-[30vh] md:h-[40vh] w-full flex flex-col items-center justify-center bg-tennis-navy pt-24 border-t-4 border-tennis-gold gap-6">

                <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter px-6 text-center">
                    Våra Läger
                </h1>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-tennis-gold transition-colors hover:text-white z-10"
                >
                    <ArrowLeft size={18} />
                    Tillbaka till startsidan
                </Link>

            </div>

            {/* INNEHÅLL */}
            <div className="max-w-4xl mx-auto px-6 mt-20">

                <div className="mb-24">
                    <div className="flex items-center gap-4 mb-10 border-b border-gray-200 pb-4">
                        <h2 className="text-3xl font-extrabold uppercase tracking-tight text-tennis-navy">Kommande Läger</h2>
                        <div className="h-px flex-1 bg-gray-200 hidden sm:block"></div>
                    </div>

                    {upcomingCamps.length === 0 ? (
                        <p className="text-gray-500 italic">Just nu har vi inga inplanerade läger. Håll utkik eller anmäl dig till vårt nyhetsbrev!</p>
                    ) : (
                        <div className="space-y-20">
                            {upcomingCamps.map((camp) => (
                                <div key={camp._id} className="group">
                                    <ImageCarousel gallery={camp.gallery} title={camp.title} />

                                    <div className="flex items-center gap-2 mt-4 mb-2 text-tennis-gold font-bold text-sm uppercase tracking-widest">
                                        <Calendar size={16} />
                                        {camp.startDate ? new Date(camp.startDate).toLocaleDateString('sv-SE') : 'Datum ej satt'}
                                    </div>

                                    <h3 className="text-3xl font-bold uppercase text-tennis-navy mb-4">{camp.title}</h3>
                                    <div className="mt-4">
                                        {Array.isArray(camp.text) ? (
                                            <PortableText value={camp.text} components={portableTextComponents} />
                                        ) : (
                                            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">{camp.text}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {pastCamps.length > 0 && (
                    <div>
                        <div className="flex items-center gap-4 mb-10 border-b border-gray-200 pb-4">
                            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-tennis-navy">Tidigare Läger</h2>
                            <div className="h-px flex-1 bg-gray-200 hidden sm:block"></div>
                        </div>

                        <div className="space-y-20">
                            {pastCamps.map((camp) => (
                                <div key={camp._id} className="group">
                                    <ImageCarousel gallery={camp.gallery} title={camp.title} />

                                    <div className="flex items-center gap-2 mt-4 mb-2 text-gray-400 font-bold text-sm uppercase tracking-widest">
                                        <Calendar size={16} />
                                        {camp.startDate ? new Date(camp.startDate).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long' }) : ''}
                                    </div>

                                    <h3 className="text-2xl font-bold uppercase text-tennis-navy mb-4">{camp.title}</h3>
                                    <div className="mt-4">
                                        {Array.isArray(camp.text) ? (
                                            <PortableText value={camp.text} components={portableTextComponents} />
                                        ) : (
                                            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">{camp.text}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default CampPage;