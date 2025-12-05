import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { client } from '../lib/sanity';
import BackgroundContainer from './BackgroundContainer';

const BookingSection = () => {
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const [bgSettings, setBgSettings] = useState<any>(null);

    useEffect(() => {
        const query = `*[_type == "siteSettings"][0].bookingBackground{
      image,
      "videoUrl": video.asset->url,
      overlayOpacity
    }`;
        client.fetch(query).then(setBgSettings).catch(console.error);
    }, []);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        const SERVICE_ID = 'DITT_SERVICE_ID';
        const TEMPLATE_ID = 'DITT_BOKNING_TEMPLATE_ID';
        const PUBLIC_KEY = 'DIN_PUBLIC_KEY';

        if (form.current) {
            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
                .then(() => {
                    setStatus('success');
                    form.current?.reset();
                }, (error) => {
                    console.error(error);
                    setStatus('error');
                });
        }
    };

    return (
        <section id="kontakt" className="bg-tennis-navy py-24 relative overflow-hidden">
            <BackgroundContainer
                id="kontakt"
                settings={bgSettings}
                fallbackColor="bg-tennis-navy"
                className="py-24"
            >

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-2xl">

                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-extrabold uppercase text-tennis-navy mb-4">
                                Boka din <span className="text-tennis-gold">träning</span>
                            </h2>
                            <p className="text-gray-600">
                                Fyll i formuläret så återkommer vi med tider och upplägg som passar dig.
                            </p>
                        </div>

                        <form ref={form} onSubmit={sendEmail} className="grid grid-cols-1 gap-6 md:grid-cols-2">

                            {/* Namn */}
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-xs font-bold uppercase tracking-widest text-tennis-navy mb-2">Namn</label>
                                <input
                                    type="text"
                                    name="from_name"
                                    required
                                    className="w-full border-b-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-tennis-gold focus:outline-none transition-colors"
                                    placeholder="Ditt för- och efternamn"
                                />
                            </div>

                            {/* Email */}
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-xs font-bold uppercase tracking-widest text-tennis-navy mb-2">E-post</label>
                                <input
                                    type="email"
                                    name="reply_to"
                                    required

                                    className="w-full border-b-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-tennis-gold focus:outline-none transition-colors"
                                    placeholder="din@email.se"
                                />
                            </div>

                            {/* Telefon */}
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-xs font-bold uppercase tracking-widest text-tennis-navy mb-2">Telefon</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="w-full border-b-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-tennis-gold focus:outline-none transition-colors"
                                    placeholder="070-123 45 67"
                                />
                            </div>

                            {/* Intresse (Dropdown) */}
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-xs font-bold uppercase tracking-widest text-tennis-navy mb-2">Jag är intresserad av</label>
                                <select
                                    name="interest"

                                    className="w-full border-b-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-tennis-gold focus:outline-none transition-colors"
                                >
                                    <option value="Provträning">Provträning</option>
                                    <option value="Privatlektion">Privatlektion</option>
                                    <option value="Vuxenkurs">Vuxenkurs</option>
                                    <option value="Juniorakademi">Juniorakademi</option>
                                    <option value="Annat">Annat</option>
                                </select>
                            </div>

                            {/* Meddelande */}
                            <div className="col-span-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-tennis-navy mb-2">Meddelande</label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    className="w-full border-b-2 border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 focus:border-tennis-gold focus:outline-none transition-colors"
                                    placeholder="Berätta lite om din nivå eller önskemål..."
                                ></textarea>
                            </div>

                            {/* Submit Knapp */}
                            <div className="col-span-2 mt-4">
                                <button
                                    type="submit"
                                    disabled={status === 'sending' || status === 'success'}
                                    className={`w-full py-4 text-sm font-bold uppercase tracking-widest transition-all 
                  ${status === 'success'
                                            ? 'bg-green-600 text-white cursor-default'
                                            : 'bg-tennis-navy text-white hover:bg-tennis-gold hover:text-tennis-navy'
                                        }`}
                                >
                                    {status === 'sending' ? 'Skickar...' : status === 'success' ? 'Tack för din förfrågan!' : 'Skicka Förfrågan'}
                                </button>
                                {status === 'error' && (
                                    <p className="text-red-500 text-sm mt-2 text-center">Något gick fel. Försök igen eller maila oss direkt.</p>
                                )}
                            </div>

                        </form>
                    </div>

                </div>
            </BackgroundContainer>
        </section>
    );
};

export default BookingSection;