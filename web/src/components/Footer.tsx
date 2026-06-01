import { useEffect, useState, useRef } from 'react';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { client, urlFor } from '../lib/sanity';
import localLogo from '../assets/localLogo.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const newsletterRef = useRef<HTMLFormElement>(null);
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const query = `*[_type == "siteSettings"][0]`;
    client.fetch(query).then(setSettings).catch(console.error);
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
    <footer id="kontakt" className="relative overflow-hidden bg-navy-950 pt-20 pb-10 text-white">
      {/* gold hairline accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tennis-gold/60 to-transparent" />
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-tennis-gold/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & blurb */}
          <div className="space-y-6">
            <img
              src={settings?.logo ? urlFor(settings.logo).url() : localLogo}
              alt="Stockholm South Tennis Academy"
              className="-ml-10 h-12 w-auto brightness-0 invert"
            />
            <p className="text-sm leading-relaxed text-gray-400">{t('footer.tagline')}</p>
            <div className="flex gap-4">
              {settings?.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:-translate-y-0.5 hover:bg-tennis-gold hover:text-tennis-navy"
                >
                  <Instagram size={20} />
                </a>
              )}
              {settings?.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:-translate-y-0.5 hover:bg-tennis-gold hover:text-tennis-navy"
                >
                  <Facebook size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-tennis-gold">{t('footer.quicklinks')}</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/" className="transition-colors hover:text-tennis-gold">{t('nav.home')}</Link></li>
              <li><Link to="/#program" className="transition-colors hover:text-tennis-gold">{t('nav.programs')}</Link></li>
              <li><Link to="/lager" className="transition-colors hover:text-tennis-gold">{t('nav.camps')}</Link></li>
              <li><Link to="/#om-oss" className="transition-colors hover:text-tennis-gold">{t('footer.about')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-tennis-gold">{t('footer.contact')}</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              {(settings?.address || settings?.postalAddress) && (
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-tennis-gold" />
                  <span>
                    Tumba Tenniscenter<br />
                    {settings.address}<br />
                    {settings.postalAddress}
                  </span>
                </li>
              )}
              {settings?.email && (
                <li className="flex items-center gap-3">
                  <Mail size={18} className="shrink-0 text-tennis-gold" />
                  <a href={`mailto:${settings.email}`} className="transition-colors hover:text-tennis-gold">{settings.email}</a>
                </li>
              )}
              {settings?.phone && (
                <li className="flex items-center gap-3">
                  <Phone size={18} className="shrink-0 text-tennis-gold" />
                  <a href={`tel:${settings.phone}`} className="transition-colors hover:text-tennis-gold">{settings.phone}</a>
                </li>
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-tennis-gold">{t('footer.newsletter')}</h3>
            <p className="mb-4 text-sm text-gray-400">{t('footer.newsletter_text')}</p>
            {newsletterStatus === 'success' ? (
              <div className="border-l-2 border-tennis-gold bg-white/10 p-4 text-sm text-white">
                {t('footer.newsletter_success')}
              </div>
            ) : (
              <form ref={newsletterRef} onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={t('footer.newsletter_ph')}
                  className="border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:border-tennis-gold focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === 'submitting'}
                  className="bg-tennis-gold py-3 text-sm font-bold uppercase tracking-widest text-tennis-navy transition-colors hover:bg-white disabled:opacity-50"
                >
                  {newsletterStatus === 'submitting' ? t('footer.subscribing') : t('footer.subscribe')}
                </button>
                {newsletterStatus === 'error' && (
                  <span className="mt-1 text-xs text-red-400">{t('footer.newsletter_error')}</span>
                )}
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Stockholm South Tennis Academy. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
