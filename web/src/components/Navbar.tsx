import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Hem', href: '#' },
        { name: 'Program', href: '#program' },
        { name: 'Akademin', href: '#om-oss' },
        { name: 'Kontakt', href: '#kontakt' },
    ];

    return (
        <>
            <nav
                className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isScrolled
                        ? 'bg-tennis-navy/95 py-4 shadow-lg backdrop-blur-md'
                        : 'bg-transparent py-6'
                    }`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

                    <div className="text-2xl font-extrabold uppercase tracking-tighter text-white">
                        SS<span className="text-tennis-gold">T</span>
                        <span className="hidden text-sm font-light tracking-widest sm:inline-block ml-2 opacity-80">
                            Stockholm South Tennis
                        </span>
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

                        <button className="border border-tennis-gold bg-transparent px-5 py-2 text-xs font-bold uppercase tracking-widest text-tennis-gold transition-all hover:bg-tennis-gold hover:text-tennis-navy">
                            Boka
                        </button>
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
                        className="fixed inset-0 z-[60] flex flex-col bg-tennis-navy px-6 py-8 md:hidden"
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

                            <button className="w-full bg-tennis-gold py-4 text-center text-sm font-bold uppercase tracking-widest text-tennis-navy">
                                Boka Provträning
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;