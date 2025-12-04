import { useEffect, useState } from 'react';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { client } from '../lib/sanity';
import logoImg from '../assets/logo.png';

interface SiteSettings {
  address: string;
  postalAddress: string;
  email: string;
  phone: string;
  instagramUrl: string;
  facebookUrl: string;
}

const Footer = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const query = `*[_type == "siteSettings"][0]`;
    
    client.fetch(query)
      .then(data => setSettings(data))
      .catch(console.error);
  }, []);

  return (
    <footer id="kontakt" className="bg-tennis-navy text-white pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-16">
          
          {/* KOLUMN 1: Logo & Info */}
          <div className="space-y-6">
            <img src={logoImg} alt="SST Logo" className="h-12 w-auto brightness-0 invert" />
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
              <li><a href="#" className="hover:text-white transition-colors">Hem</a></li>
              <li><a href="#program" className="hover:text-white transition-colors">Våra Program</a></li>
              <li><a href="#om-oss" className="hover:text-white transition-colors">Om Akademin</a></li>
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
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Din e-post" 
                className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-tennis-gold focus:outline-none"
              />
              <button className="bg-tennis-gold py-3 text-sm font-bold uppercase tracking-widest text-tennis-navy hover:bg-white transition-colors">
                Prenumerera
              </button>
            </form>
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