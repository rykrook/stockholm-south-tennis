import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { client, urlFor } from '../lib/sanity';
import localLogo from '../assets/localLogo.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
    hasBanner: boolean;
}

const LANGS = ['sv', 'en', 'es', 'fr'] as const;

const Navbar = ({ hasBanner }: NavbarProps) => {
    const { t, i18n } = useTranslation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [logoUrl, setLogoUrl] = useState(localLogo);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const changeLanguage = (lng: string) => i18n.changeLanguage(lng);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 50);
            if (currentScrollY > lastScrollY && currentScrollY > 100) setIsVisible(false);
            else setIsVisible(true);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        const fetchLogo = async () => {
            const query = `*[_type == "siteSettings"][0].logo`;
            try {
                const logoData = await client.fetch(query);
                if (logoData) setLogoUrl(urlFor(logoData).url());
            } catch (error) {
                console.error("Kunde inte hämta logga:", error);
            }
        };
        fetchLogo();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const navLinks = [
        { name: t('nav.programs'), href: '/#program' },
        { name: t('nav.academy'), href: '/#om-oss' },
        { name: t('nav.contact'), href: '/#kontakt' },
    ];

    return (
        <>
            <nav
                className={`fixed left-0 right-0 z-50 transform transition-all duration-500
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        ${hasBanner ? 'top-10' : 'top-0'}
        ${isScrolled
                        ? 'border-b border-white/10 bg-navy-950/80 py-2 shadow-lg backdrop-blur-xl'
                        : 'border-b border-transparent bg-transparent py-4'
                    }`}
            >
                <div className="flex w-full items-center justify-between px-6 md:pl-2 md:pr-10">

                    <Link
                        to="/"
                        className="relative z-50 flex items-center transition-opacity hover:opacity-80"
                    >
                        <img
                            src={logoUrl}
                            alt="Stockholm South Tennis Academy"
                            className="h-11 w-auto object-contain brightness-0 invert sm:h-16 md:h-28 md:-my-6"
                        />
                    </Link>

                    {/* DESKTOP NAV */}
                    <div className="hidden items-center gap-9 md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="group relative text-sm font-semibold uppercase tracking-widest text-white/90 transition-colors hover:text-white"
                            >
                                {link.name}
                                <span className="absolute -bottom-1.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-tennis-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
                            </Link>
                        ))}

                        {/* Language segmented control */}
                        <div className="flex items-center gap-0.5 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-sm">
                            {LANGS.map((lng) => (
                                <button
                                    key={lng}
                                    onClick={() => changeLanguage(lng)}
                                    className={`rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider transition-all ${i18n.language?.startsWith(lng)
                                            ? 'bg-tennis-gold text-tennis-navy shadow-sm'
                                            : 'text-white/60 hover:text-white'
                                        }`}
                                >
                                    {lng}
                                </button>
                            ))}
                        </div>

                        <Link
                            to="/#kontakt"
                            className="group relative overflow-hidden border border-tennis-gold px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-tennis-gold transition-colors duration-300 hover:text-tennis-navy"
                        >
                            <span className="absolute inset-0 -translate-x-full bg-tennis-gold transition-transform duration-300 ease-out group-hover:translate-x-0" />
                            <span className="relative">{t('nav.book')}</span>
                        </Link>
                    </div>

                    {/* MOBILE TOGGLE */}
                    <button
                        className="relative z-50 text-white focus:outline-none md:hidden"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Öppna meny"
                    >
                        <Menu size={28} />
                    </button>
                </div>
            </nav>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[200] flex flex-col bg-navy-950 px-6 py-8 md:hidden"
                    >
                        {/* gold glow accent */}
                        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-tennis-gold/10 blur-3xl" />

                        <div className="mb-12 flex items-center justify-between">
                            <span className="font-display text-3xl uppercase tracking-wide text-white">Meny</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white" aria-label="Stäng meny">
                                <X size={32} />
                            </button>
                        </div>

                        <div className="relative flex flex-col gap-7">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: 24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.07 }}
                                >
                                    <Link
                                        to={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="font-display text-4xl uppercase tracking-wide text-white transition-colors hover:text-tennis-gold"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <div className="my-4 h-px w-full bg-white/10" />

                            <div className="flex justify-center gap-2">
                                {LANGS.map((lng) => (
                                    <button
                                        key={lng}
                                        onClick={() => changeLanguage(lng)}
                                        className={`rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all ${i18n.language?.startsWith(lng)
                                                ? 'bg-tennis-gold text-tennis-navy'
                                                : 'border border-white/15 text-white/70'
                                            }`}
                                    >
                                        {lng}
                                    </button>
                                ))}
                            </div>

                            <Link
                                to="/#kontakt"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="mt-2 block w-full bg-tennis-gold py-4 text-center text-sm font-bold uppercase tracking-widest text-tennis-navy"
                            >
                                {t('hero.cta_book')}
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
