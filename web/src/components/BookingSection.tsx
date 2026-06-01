import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
import { client } from '../lib/sanity';
import BackgroundContainer from './BackgroundContainer';

const BookingSection = () => {
    const { t } = useTranslation();
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

        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_BOOKING_TEMPLATE_ID;
        const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

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

    const inputClass =
        "w-full border-b-2 border-gray-200 bg-gray-50/70 px-4 py-3 text-gray-900 transition-colors focus:border-tennis-gold focus:bg-white focus:outline-none";
    const labelClass =
        "mb-2 block text-xs font-bold uppercase tracking-widest text-tennis-navy";

    return (
        <section id="kontakt" className="relative overflow-hidden bg-tennis-navy">
            <BackgroundContainer
                id="kontakt"
                settings={bgSettings}
                fallbackColor="bg-tennis-navy"
                className="py-24 md:py-32"
            >
                <div className="container relative z-10 mx-auto px-6">
                    <div className="mx-auto max-w-3xl bg-white p-8 shadow-2xl md:p-12">
                        <div className="mb-10 text-center">
                            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-tennis-gold">
                                {t('booking.eyebrow')}
                            </p>
                            <h2 className="font-display text-4xl uppercase tracking-tight text-tennis-navy md:text-5xl">
                                {t('booking.title_1')} <span className="text-gold-gradient">{t('booking.title_2')}</span>
                            </h2>
                            <p className="mt-4 text-gray-600">{t('booking.subtitle')}</p>
                        </div>

                        <form ref={form} onSubmit={sendEmail} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="col-span-2 md:col-span-1">
                                <label className={labelClass}>{t('booking.name')}</label>
                                <input type="text" name="name" required className={inputClass} placeholder={t('booking.name_ph')} />
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <label className={labelClass}>{t('booking.email')}</label>
                                <input type="email" name="email" required className={inputClass} placeholder="din@email.se" />
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <label className={labelClass}>{t('booking.phone')}</label>
                                <input type="tel" name="phone" className={inputClass} placeholder="070-123 45 67" />
                            </div>

                            <div className="col-span-2 md:col-span-1">
                                <label className={labelClass}>{t('booking.interest')}</label>
                                <select name="program" className={inputClass}>
                                    <option value="Provträning">{t('booking.opt_trial')}</option>
                                    <option value="Privatlektion">{t('booking.opt_private')}</option>
                                    <option value="Juniorakademi">{t('booking.opt_junior')}</option>
                                    <option value="Miniakademi">{t('booking.opt_mini')}</option>
                                    <option value="Läger">{t('booking.opt_camp')}</option>
                                    <option value="Annat">{t('booking.opt_other')}</option>
                                </select>
                            </div>

                            <div className="col-span-2">
                                <label className={labelClass}>{t('booking.message')}</label>
                                <textarea name="message" rows={4} className={inputClass} placeholder={t('booking.message_ph')} />
                            </div>

                            <div className="col-span-2 mt-4">
                                <button
                                    type="submit"
                                    disabled={status === 'sending' || status === 'success'}
                                    className={`group relative w-full overflow-hidden py-4 text-sm font-bold uppercase tracking-widest transition-all
                  ${status === 'success'
                                            ? 'cursor-default bg-green-600 text-white'
                                            : 'bg-tennis-navy text-white hover:text-tennis-navy'
                                        }`}
                                >
                                    {status !== 'success' && (
                                        <span className="absolute inset-0 -translate-x-full bg-tennis-gold transition-transform duration-300 ease-out group-hover:translate-x-0" />
                                    )}
                                    <span className="relative">
                                        {status === 'sending' ? t('booking.sending') : status === 'success' ? t('booking.success') : t('booking.submit')}
                                    </span>
                                </button>
                                {status === 'error' && (
                                    <p className="mt-2 text-center text-sm text-red-500">{t('booking.error')}</p>
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
