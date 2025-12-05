// web/src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  sv: {
    translation: {
      nav: {
        home: "Hem",
        programs: "Program",
        academy: "Akademin",
        contact: "Kontakt",
        book: "Boka"
      },
      hero: {
        subtitle: "Professionell träning i Tumba för juniorer och vuxna.",
        cta_book: "Boka Provträning",
        cta_programs: "Våra Program"
      },
    }
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        programs: "Programs",
        academy: "The Academy",
        contact: "Contact",
        book: "Book"
      },
      hero: {
        subtitle: "Professional training in Tumba for juniors and adults.",
        cta_book: "Book Trial Session",
        cta_programs: "Our Programs"
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: "Inicio",
        programs: "Programas",
        academy: "La Academia",
        contact: "Contacto",
        book: "Reserva"
      },
      hero: {
        subtitle: "Entrenamiento profesional en Tumba para juniors y adultos.",
        cta_book: "Reserva Prueba",
        cta_programs: "Nuestros Programas"
      }
    }
  },
  fr: {
    translation: {
      nav: {
        home: "Accueil",
        programs: "Programmes",
        academy: "L'Académie",
        contact: "Contact",
        book: "Réserver"
      },
      hero: {
        subtitle: "Entraînement professionnel à Tumba pour juniors et adultes.",
        cta_book: "Réserver un Essai",
        cta_programs: "Nos Programmes"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;