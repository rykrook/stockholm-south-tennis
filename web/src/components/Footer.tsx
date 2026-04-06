import { useEffect, useState, useRef } from 'react';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { client, urlFor } from '../lib/sanity';
import localLogo from '../assets/localLogo.png';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

interface SiteSettings {
  address: string;
  postalAddress: string;
  email: string;
  phone: string;
  instagramUrl: string;
  facebookUrl: string;
  logo: any;
}

const Footer = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  
  const newsletterRef = useRef<HTMLFormElement>(null);
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const query = `*[_type == "siteSettings"][0]`;
    
    client.fetch(query)
      .then(data => setSettings(data))
      .catch(console.error);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewsletterStatus('submitting');

    if (!newsletterRef.current) return;

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, newsletterRef.current, PUBLIC_KEY)
    .then(() => {
      setNewsletterStatus('success');
      newsletterRef.current?.reset();
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      setNewsletterStatus('error');
    });
  };

  return (
    <footer id="kontakt" className="bg-tennis-navy text-white pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-16">
          
          {/* KOLUMN 1: Logo & Info */}
          <div className="space-y-6">
           <img 
              src={settings?.logo ? urlFor(settings.logo).url() : localLogo} 
              alt="SST Logo" 
              className="h-12 w-auto -ml-10" 
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Vi utvecklar framtidens tennisspelare i södra Stockholm. Professionell träning med passion och kvalitet.
            </p>
            
            {/* Sociala Ikoner */}
            <div className="flex gap-4">
              {settings?.instagramUrl && (
                <a 
                  href={settings.instagramUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-tennis-gold hover:text-tennis-navy"
                >
                  <Instagram size={20} />
                </a>
              )}
              {settings?.facebookUrl && (
                <a 
                  href={settings.facebookUrl}
                  target="_blank" 
                  rel="noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-tennis-gold hover:text-tennis-navy"
                >
                  <Facebook size={20} />
                </a>
              )}
            </div>
          </div>

          {/* KOLUMN 2: Snabblänkar */}
          <div>
            <h3 className="mb-6 font-bold uppercase tracking-widest text-tennis-gold">Hitta snabbt</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-white transition-colors">Hem</Link></li>
              <li><Link to="/#program" className="hover:text-white transition-colors">Våra Program</Link></li>
              <li><Link to="/lager" className="hover:text-white transition-colors">Våra Läger</Link></li>
              <li><Link to="/#om-oss" className="hover:text-white transition-colors">Om Akademin</Link></li>
            </ul>
          </div>

          {/* KOLUMN 3: Kontakt  */}
          <div>
            <h3 className="mb-6 font-bold uppercase tracking-widest text-tennis-gold">Kontakt</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              
              {/* Adress */}
              {(settings?.address || settings?.postalAddress) && (
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-tennis-gold shrink-0 mt-1" />
                  <span>
                    Tumba Tenniscenter<br />
                    {settings.address}<br />
                    {settings.postalAddress}
                  </span>
                </li>
              )}

              {/* Email */}
              {settings?.email && (
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-tennis-gold shrink-0" />
                  <a href={`mailto:${settings.email}`} className="hover:text-white">
                    {settings.email}
                  </a>
                </li>
              )}

              {/* Telefon */}
              {settings?.phone && (
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-tennis-gold shrink-0" />
                  <a href={`tel:${settings.phone}`} className="hover:text-white">
                    {settings.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* KOLUMN 4: Nyhetsbrev */}
          <div>
            <h3 className="mb-6 font-bold uppercase tracking-widest text-tennis-gold">Nyhetsbrev</h3>
            <p className="mb-4 text-sm text-gray-400">Få de senaste nyheterna och inbjudningar till läger.</p>
            
            {newsletterStatus === 'success' ? (
              <div className="bg-white/10 border-l-2 border-tennis-gold p-4 text-sm text-white">
                Tack! Du är nu tillagd i vårt nyhetsbrev.
              </div>
            ) : (
              <form ref={newsletterRef} onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="Din e-post" 
                  className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-tennis-gold focus:outline-none"
                />
                <button 
                  type="submit"
                  disabled={newsletterStatus === 'submitting'}
                  className="bg-tennis-gold py-3 text-sm font-bold uppercase tracking-widest text-tennis-navy hover:bg-white transition-colors disabled:opacity-50"
                >
                  {newsletterStatus === 'submitting' ? 'Registrerar...' : 'Prenumerera'}
                </button>
                {newsletterStatus === 'error' && (
                  <span className="text-xs text-red-400 mt-1">Ett fel uppstod, försök igen senare.</span>
                )}
              </form>
            )}
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Stockholm South Tennis Academy. Alla rättigheter reserverade.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;