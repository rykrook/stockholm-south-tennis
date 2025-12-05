import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { client, urlFor } from '../lib/sanity';
import localLogo from '../assets/localLogo.png';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
    hasBanner: boolean;
}

const Navbar = ({ hasBanner }: NavbarProps) => {
    const { t, i18n } = useTranslation()
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [logoUrl, setLogoUrl] = useState(localLogo);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 50) setIsScrolled(true);
            else setIsScrolled(false);

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        const fetchLogo = async () => {
            const query = `*[_type == "siteSettings"][0].logo`;
            try {
                const logoData = await client.fetch(query);
                if (logoData) {
                    setLogoUrl(urlFor(logoData).url());
                }
            } catch (error) {
                console.error("Kunde inte hämta logga:", error);
            }
        };
        fetchLogo();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const navLinks = [
        { name: t('nav.programs'), href: '#program' },
        { name: t('nav.academy'), href: '#om-oss' },
        { name: t('nav.contact'), href: '#kontakt' },
    ];

    return (
        <>
            <nav
                className={`fixed left-0 right-0 z-50 transition-all duration-300 transform 
        ${isVisible ? 'translate-y-0' : '-translate-y-full'
                    } 
        ${hasBanner ? 'top-10' : 'top-0'
                    }
        ${isScrolled
                        ? 'bg-tennis-navy/95 py-3 shadow-lg backdrop-blur-md'
                        : 'bg-transparent py-5'
                    }`}
            >
                <div className="flex w-full items-center justify-between pl-0 pr-4 md:pl-0 md:pr-10">

                    <div className="text-2xl font-extrabold uppercase tracking-tighter text-white">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="flex items-center cursor-pointer transition-opacity hover:opacity-80"
                        >
                            <img
                                src={logoUrl}
                                alt="Stockholm South Tennis Academy"
                                className="h-20 w-auto object-contain -my-4 sm:h-32 sm:-my-6"
                            />
                        </a>
                    </div>

                    <div className="hidden items-center gap-8 md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-bold uppercase tracking-widest text-white transition-colors hover:text-tennis-gold"
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="flex gap-2 text-xs font-bold uppercase">
                            <button onClick={() => changeLanguage('sv')} className={`hover:text-tennis-gold ${i18n.language === 'sv' ? 'text-tennis-gold' : 'text-white'}`}>SV</button>
                            <span className="text-white/30">|</span>
                            <button onClick={() => changeLanguage('en')} className={`hover:text-tennis-gold ${i18n.language === 'en' ? 'text-tennis-gold' : 'text-white'}`}>EN</button>
                            <span className="text-white/30">|</span>
                            <button onClick={() => changeLanguage('es')} className={`hover:text-tennis-gold ${i18n.language === 'es' ? 'text-tennis-gold' : 'text-white'}`}>ES</button>
                            <span className="text-white/30">|</span>
                            <button onClick={() => changeLanguage('fr')} className={`hover:text-tennis-gold ${i18n.language === 'fr' ? 'text-tennis-gold' : 'text-white'}`}>FR</button>
                        </div>


                        <a
                            href="#kontakt"
                            className="border border-tennis-gold bg-transparent px-5 py-2 text-xs font-bold uppercase tracking-widest text-tennis-gold transition-all hover:bg-tennis-gold hover:text-tennis-navy"
                        >

                            {t('nav.book')}
                        </a>
                    </div>

                    <button
                        className="text-white md:hidden"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={28} />
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed inset-0 z-[200] flex flex-col bg-tennis-navy px-6 py-8 md:hidden"
                    >
                        <div className="flex items-center justify-between mb-12">
                            <span className="text-2xl font-bold text-white">MENY</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
                                <X size={32} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-bold uppercase tracking-wider text-white transition-colors hover:text-tennis-gold"
                                >
                                    {link.name}
                                </a>
                            ))}


                            <div className="h-px w-full bg-white/10 my-4"></div>
                            <div className="flex justify-center gap-6 text-xl font-bold uppercase mb-4">
                                <button
                                    onClick={() => changeLanguage('sv')}
                                    className={`transition-colors ${i18n.language === 'sv' ? 'text-tennis-gold' : 'text-white'}`}
                                >
                                    SV
                                </button>
                                <span className="text-white/30">|</span>
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className={`transition-colors ${i18n.language === 'en' ? 'text-tennis-gold' : 'text-white'}`}
                                >
                                    EN
                                </button>
                                <span className="text-white/30">|</span>
                                <button
                                    onClick={() => changeLanguage('es')}
                                    className={`transition-colors ${i18n.language === 'es' ? 'text-tennis-gold' : 'text-white'}`}
                                >
                                    ES
                                </button>
                                <span className="text-white/30">|</span>
                                <button
                                    onClick={() => changeLanguage('fr')}
                                    className={`transition-colors ${i18n.language === 'fr' ? 'text-tennis-gold' : 'text-white'}`}
                                >
                                    FR
                                </button>
                            </div>

                            <a
                                href="#kontakt"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full bg-tennis-gold py-4 text-center text-sm font-bold uppercase tracking-widest text-tennis-navy"
                            >
                                {t('hero.cta_book')}
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;