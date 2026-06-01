import { useEffect, useState } from 'react';
import { client, urlFor } from '../lib/sanity';
import { ChevronLeft, ChevronRight, Calendar, ArrowLeft } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocalize } from '../lib/locale';

const LOCALES: Record<string, string> = { sv: 'sv-SE', en: 'en-GB', es: 'es-ES', fr: 'fr-FR' };

const portableTextComponents = {
    block: {
        normal: ({ children }: any) => <p className="mb-4 text-lg leading-relaxed text-gray-600">{children}</p>,
    },
    marks: {
        strong: ({ children }: any) => <strong className="font-bold text-tennis-navy">{children}</strong>,
    },
    list: {
        bullet: ({ children }: any) => <ul className="mb-4 list-disc space-y-2 pl-6 text-lg text-gray-600">{children}</ul>,
    },
};

const ImageCarousel = ({ gallery, title }: { gallery: any[]; title: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    if (!gallery || gallery.length === 0) return null;

    const nextImage = () => setCurrentIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
    const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));

    return (
        <div className="group relative mb-6 h-[300px] overflow-hidden rounded-xl bg-tennis-navy shadow-card md:h-[500px]">
            <img
                src={urlFor(gallery[currentIndex]).width(1200).url()}
                alt={`${title} - ${currentIndex + 1}`}
                className="h-full w-full object-cover transition-opacity duration-500"
            />
            {gallery.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-tennis-navy/80 p-2 text-white shadow-lg transition-all hover:scale-110 hover:bg-tennis-gold hover:text-tennis-navy md:p-3"
                        aria-label="Föregående"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-tennis-navy/80 p-2 text-white shadow-lg transition-all hover:scale-110 hover:bg-tennis-gold hover:text-tennis-navy md:p-3"
                        aria-label="Nästa"
                    >
                        <ChevronRight size={24} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                        {gallery.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-2 rounded-full transition-all ${idx === currentIndex ? 'w-6 bg-tennis-gold' : 'w-2 bg-white/50'}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const CampPage = () => {
    const { t, i18n } = useTranslation();
    const localize = useLocalize();
    const locale = LOCALES[i18n.language?.split('-')[0]] || 'sv-SE';
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

    const CampText = ({ camp }: { camp: any }) => {
        const text = localize(camp.text);
        return Array.isArray(text) ? (
            <PortableText value={text} components={portableTextComponents} />
        ) : (
            <p className="whitespace-pre-wrap text-lg leading-relaxed text-gray-600">{text}</p>
        );
    };

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Header */}
            <div className="grain-overlay relative flex h-[40vh] w-full flex-col items-center justify-center gap-6 overflow-hidden bg-gradient-to-b from-navy-950 to-navy-900 pt-24 md:h-[48vh]">
                <div className="absolute inset-x-0 top-0 h-1 bg-tennis-gold" />
                <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-tennis-gold/10 blur-[100px]" />
                <h1 className="px-6 text-center font-display text-5xl uppercase tracking-tight text-white md:text-7xl">
                    {t('camp.title')}
                </h1>
                <Link
                    to="/"
                    className="z-10 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-tennis-gold transition-colors hover:text-white"
                >
                    <ArrowLeft size={18} />
                    {t('camp.back')}
                </Link>
            </div>

            {/* Content */}
            <div className="mx-auto mt-20 max-w-4xl px-6">
                <div className="mb-24">
                    <div className="mb-10 flex items-center gap-4 border-b border-gray-200 pb-4">
                        <h2 className="font-display text-3xl uppercase tracking-tight text-tennis-navy md:text-4xl">{t('camp.upcoming')}</h2>
                        <div className="hidden h-px flex-1 bg-gray-200 sm:block" />
                    </div>

                    {upcomingCamps.length === 0 ? (
                        <p className="italic text-gray-500">{t('camp.empty')}</p>
                    ) : (
                        <div className="space-y-20">
                            {upcomingCamps.map((camp) => (
                                <div key={camp._id} className="group">
                                    <ImageCarousel gallery={camp.gallery} title={localize(camp.title)} />
                                    <div className="mb-2 mt-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-tennis-gold">
                                        <Calendar size={16} />
                                        {camp.startDate ? new Date(camp.startDate).toLocaleDateString(locale) : t('camp.no_date')}
                                    </div>
                                    <h3 className="mb-4 font-display text-3xl uppercase tracking-wide text-tennis-navy">{localize(camp.title)}</h3>
                                    <div className="mt-4"><CampText camp={camp} /></div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {pastCamps.length > 0 && (
                    <div>
                        <div className="mb-10 flex items-center gap-4 border-b border-gray-200 pb-4">
                            <h2 className="font-display text-3xl uppercase tracking-tight text-tennis-navy md:text-4xl">{t('camp.past')}</h2>
                            <div className="hidden h-px flex-1 bg-gray-200 sm:block" />
                        </div>
                        <div className="space-y-20">
                            {pastCamps.map((camp) => (
                                <div key={camp._id} className="group opacity-95">
                                    <ImageCarousel gallery={camp.gallery} title={localize(camp.title)} />
                                    <div className="mb-2 mt-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400">
                                        <Calendar size={16} />
                                        {camp.startDate ? new Date(camp.startDate).toLocaleDateString(locale, { year: 'numeric', month: 'long' }) : ''}
                                    </div>
                                    <h3 className="mb-4 font-display text-2xl uppercase tracking-wide text-tennis-navy">{localize(camp.title)}</h3>
                                    <div className="mt-4"><CampText camp={camp} /></div>
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
