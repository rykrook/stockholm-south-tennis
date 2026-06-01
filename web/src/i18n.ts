// web/src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

/**
 * Static UI strings for the whole site, in Swedish (source), English,
 * Spanish and French. CMS-authored content (program descriptions, coach
 * bios, camp text, banner text) still comes from Sanity in whatever
 * language it was written — see the README note on document i18n.
 */
const resources = {
  sv: {
    translation: {
      nav: { home: "Hem", programs: "Program", academy: "Akademin", camps: "Läger", contact: "Kontakt", book: "Boka" },
      hero: {
        subtitle: "Professionell träning i Tumba för juniorer och vuxna.",
        cta_book: "Boka Provträning",
        cta_camp: "Se vårt läger",
        cta_programs: "Våra Program",
        scroll: "Scrolla",
      },
      programs: {
        eyebrow: "Träning",
        title: "Våra Program",
        subtitle: "Från första bollen till elitnivå — hitta upplägget som passar dig.",
        cta: "Läs mer om upplägg & schema",
        missing_slug: "Saknar slug i Sanity",
        age_kids: "Barn 4–10", age_junior: "Junior 11–18", age_adults: "Vuxna", age_all: "Alla åldrar",
      },
      coach: { eyebrow: "Vårt team", contact: "Kontakta mig", prev: "Föregående", next: "Nästa" },
      gallery: { eyebrow: "Livet på akademin", title: "I aktion", instagram: "Följ oss på Instagram" },
      booking: {
        eyebrow: "Kom igång",
        title_1: "Boka din", title_2: "träning",
        subtitle: "Fyll i formuläret så återkommer vi med tider och upplägg som passar dig.",
        name: "Namn", name_ph: "Ditt för- och efternamn",
        email: "E-post", phone: "Telefon",
        interest: "Jag är intresserad av",
        message: "Meddelande", message_ph: "Berätta lite om din nivå eller önskemål...",
        opt_trial: "Provträning", opt_private: "Privatlektion", opt_junior: "Juniorakademi",
        opt_mini: "Miniakademi", opt_camp: "Läger", opt_other: "Annat",
        submit: "Skicka Förfrågan", sending: "Skickar...", success: "Tack för din förfrågan!",
        error: "Något gick fel. Försök igen eller maila oss direkt.",
      },
      footer: {
        tagline: "Vi utvecklar framtidens tennisspelare i södra Stockholm. Professionell träning med passion och kvalitet.",
        quicklinks: "Hitta snabbt", about: "Om Akademin",
        contact: "Kontakt", newsletter: "Nyhetsbrev",
        newsletter_text: "Få de senaste nyheterna och inbjudningar till läger.",
        newsletter_ph: "Din e-post", subscribe: "Prenumerera", subscribing: "Registrerar...",
        newsletter_success: "Tack! Du är nu tillagd i vårt nyhetsbrev.",
        newsletter_error: "Ett fel uppstod, försök igen senare.",
        rights: "Alla rättigheter reserverade.",
      },
      camp: {
        title: "Våra Läger", back: "Tillbaka till startsidan",
        upcoming: "Kommande Läger", past: "Tidigare Läger",
        empty: "Just nu har vi inga inplanerade läger. Håll utkik eller anmäl dig till vårt nyhetsbrev!",
        no_date: "Datum ej satt",
      },
      program: {
        back: "Tillbaka till alla program", loading: "Laddar...", notfound: "Programmet hittades inte.",
        details_title: "Träningsupplägg & Detaljer", quickfacts: "Snabbfakta",
        period_label: "Period", period_value: "Terminsvis / Lov",
        length_label: "Passlängd", length_value: "60 - 90 minuter",
        level_label: "Nivå", level_value: "Alla nivåer välkomna",
        cta: "Intresseanmälan",
      },
    },
  },
  en: {
    translation: {
      nav: { home: "Home", programs: "Programs", academy: "The Academy", camps: "Camps", contact: "Contact", book: "Book" },
      hero: {
        subtitle: "Professional training in Tumba for juniors and adults.",
        cta_book: "Book Trial Session",
        cta_camp: "See our camp",
        cta_programs: "Our Programs",
        scroll: "Scroll",
      },
      programs: {
        eyebrow: "Training",
        title: "Our Programs",
        subtitle: "From the first ball to elite level — find the program that fits you.",
        cta: "Read more about setup & schedule",
        missing_slug: "Missing slug in Sanity",
        age_kids: "Kids 4–10", age_junior: "Junior 11–18", age_adults: "Adults", age_all: "All ages",
      },
      coach: { eyebrow: "Our team", contact: "Contact me", prev: "Previous", next: "Next" },
      gallery: { eyebrow: "Life at the academy", title: "In Action", instagram: "Follow us on Instagram" },
      booking: {
        eyebrow: "Get started",
        title_1: "Book your", title_2: "session",
        subtitle: "Fill in the form and we'll get back to you with times and a setup that fits.",
        name: "Name", name_ph: "Your full name",
        email: "Email", phone: "Phone",
        interest: "I'm interested in",
        message: "Message", message_ph: "Tell us about your level or any wishes...",
        opt_trial: "Trial session", opt_private: "Private lesson", opt_junior: "Junior academy",
        opt_mini: "Mini academy", opt_camp: "Camp", opt_other: "Other",
        submit: "Send Request", sending: "Sending...", success: "Thanks for your request!",
        error: "Something went wrong. Try again or email us directly.",
      },
      footer: {
        tagline: "We develop the tennis players of tomorrow in southern Stockholm. Professional training with passion and quality.",
        quicklinks: "Quick links", about: "About the Academy",
        contact: "Contact", newsletter: "Newsletter",
        newsletter_text: "Get the latest news and invitations to camps.",
        newsletter_ph: "Your email", subscribe: "Subscribe", subscribing: "Subscribing...",
        newsletter_success: "Thanks! You're now on our newsletter list.",
        newsletter_error: "An error occurred, please try again later.",
        rights: "All rights reserved.",
      },
      camp: {
        title: "Our Camps", back: "Back to home",
        upcoming: "Upcoming Camps", past: "Past Camps",
        empty: "We have no scheduled camps right now. Stay tuned or sign up for our newsletter!",
        no_date: "Date not set",
      },
      program: {
        back: "Back to all programs", loading: "Loading...", notfound: "Program not found.",
        details_title: "Training & Details", quickfacts: "Quick facts",
        period_label: "Period", period_value: "Termly / breaks",
        length_label: "Session length", length_value: "60 - 90 minutes",
        level_label: "Level", level_value: "All levels welcome",
        cta: "Register interest",
      },
    },
  },
  es: {
    translation: {
      nav: { home: "Inicio", programs: "Programas", academy: "La Academia", camps: "Campamentos", contact: "Contacto", book: "Reservar" },
      hero: {
        subtitle: "Entrenamiento profesional en Tumba para jóvenes y adultos.",
        cta_book: "Reservar Prueba",
        cta_camp: "Ver nuestro campamento",
        cta_programs: "Nuestros Programas",
        scroll: "Desliza",
      },
      programs: {
        eyebrow: "Entrenamiento",
        title: "Nuestros Programas",
        subtitle: "Desde la primera bola hasta el nivel élite — encuentra el programa que se ajusta a ti.",
        cta: "Saber más sobre el plan y horario",
        missing_slug: "Falta el slug en Sanity",
        age_kids: "Niños 4–10", age_junior: "Junior 11–18", age_adults: "Adultos", age_all: "Todas las edades",
      },
      coach: { eyebrow: "Nuestro equipo", contact: "Contáctame", prev: "Anterior", next: "Siguiente" },
      gallery: { eyebrow: "La vida en la academia", title: "En acción", instagram: "Síguenos en Instagram" },
      booking: {
        eyebrow: "Empieza",
        title_1: "Reserva tu", title_2: "entrenamiento",
        subtitle: "Rellena el formulario y te responderemos con horarios y un plan que se adapte a ti.",
        name: "Nombre", name_ph: "Tu nombre y apellido",
        email: "Correo", phone: "Teléfono",
        interest: "Me interesa",
        message: "Mensaje", message_ph: "Cuéntanos sobre tu nivel o tus deseos...",
        opt_trial: "Sesión de prueba", opt_private: "Clase privada", opt_junior: "Academia junior",
        opt_mini: "Mini academia", opt_camp: "Campamento", opt_other: "Otro",
        submit: "Enviar Solicitud", sending: "Enviando...", success: "¡Gracias por tu solicitud!",
        error: "Algo salió mal. Inténtalo de nuevo o escríbenos directamente.",
      },
      footer: {
        tagline: "Formamos a los tenistas del mañana en el sur de Estocolmo. Entrenamiento profesional con pasión y calidad.",
        quicklinks: "Enlaces rápidos", about: "Sobre la Academia",
        contact: "Contacto", newsletter: "Boletín",
        newsletter_text: "Recibe las últimas noticias e invitaciones a campamentos.",
        newsletter_ph: "Tu correo", subscribe: "Suscríbete", subscribing: "Registrando...",
        newsletter_success: "¡Gracias! Ya estás en nuestra lista de correo.",
        newsletter_error: "Se produjo un error, inténtalo más tarde.",
        rights: "Todos los derechos reservados.",
      },
      camp: {
        title: "Nuestros Campamentos", back: "Volver al inicio",
        upcoming: "Próximos Campamentos", past: "Campamentos Anteriores",
        empty: "Ahora mismo no tenemos campamentos programados. ¡Mantente atento o suscríbete a nuestro boletín!",
        no_date: "Fecha por confirmar",
      },
      program: {
        back: "Volver a todos los programas", loading: "Cargando...", notfound: "Programa no encontrado.",
        details_title: "Entrenamiento y Detalles", quickfacts: "Datos rápidos",
        period_label: "Periodo", period_value: "Por trimestre / vacaciones",
        length_label: "Duración", length_value: "60 - 90 minutos",
        level_label: "Nivel", level_value: "Todos los niveles bienvenidos",
        cta: "Solicitar información",
      },
    },
  },
  fr: {
    translation: {
      nav: { home: "Accueil", programs: "Programmes", academy: "L'Académie", camps: "Stages", contact: "Contact", book: "Réserver" },
      hero: {
        subtitle: "Entraînement professionnel à Tumba pour juniors et adultes.",
        cta_book: "Réserver un Essai",
        cta_camp: "Voir notre stage",
        cta_programs: "Nos Programmes",
        scroll: "Défiler",
      },
      programs: {
        eyebrow: "Entraînement",
        title: "Nos Programmes",
        subtitle: "De la première balle au niveau élite — trouvez le programme qui vous convient.",
        cta: "En savoir plus sur le programme & l'horaire",
        missing_slug: "Slug manquant dans Sanity",
        age_kids: "Enfants 4–10", age_junior: "Junior 11–18", age_adults: "Adultes", age_all: "Tous âges",
      },
      coach: { eyebrow: "Notre équipe", contact: "Me contacter", prev: "Précédent", next: "Suivant" },
      gallery: { eyebrow: "La vie à l'académie", title: "En action", instagram: "Suivez-nous sur Instagram" },
      booking: {
        eyebrow: "Commencer",
        title_1: "Réservez votre", title_2: "séance",
        subtitle: "Remplissez le formulaire et nous reviendrons vers vous avec des horaires et un programme adaptés.",
        name: "Nom", name_ph: "Vos nom et prénom",
        email: "E-mail", phone: "Téléphone",
        interest: "Je suis intéressé par",
        message: "Message", message_ph: "Parlez-nous de votre niveau ou de vos souhaits...",
        opt_trial: "Séance d'essai", opt_private: "Cours privé", opt_junior: "Académie junior",
        opt_mini: "Mini-académie", opt_camp: "Stage", opt_other: "Autre",
        submit: "Envoyer la Demande", sending: "Envoi...", success: "Merci pour votre demande !",
        error: "Une erreur est survenue. Réessayez ou écrivez-nous directement.",
      },
      footer: {
        tagline: "Nous formons les joueurs de tennis de demain au sud de Stockholm. Un entraînement professionnel avec passion et qualité.",
        quicklinks: "Liens rapides", about: "À propos de l'Académie",
        contact: "Contact", newsletter: "Newsletter",
        newsletter_text: "Recevez les dernières nouvelles et invitations aux stages.",
        newsletter_ph: "Votre e-mail", subscribe: "S'abonner", subscribing: "Inscription...",
        newsletter_success: "Merci ! Vous êtes inscrit à notre newsletter.",
        newsletter_error: "Une erreur est survenue, réessayez plus tard.",
        rights: "Tous droits réservés.",
      },
      camp: {
        title: "Nos Stages", back: "Retour à l'accueil",
        upcoming: "Stages à venir", past: "Stages passés",
        empty: "Nous n'avons aucun stage programmé pour le moment. Restez à l'affût ou inscrivez-vous à notre newsletter !",
        no_date: "Date à confirmer",
      },
      program: {
        back: "Retour à tous les programmes", loading: "Chargement...", notfound: "Programme introuvable.",
        details_title: "Programme & Détails", quickfacts: "Infos clés",
        period_label: "Période", period_value: "Par trimestre / vacances",
        length_label: "Durée de séance", length_value: "60 - 90 minutes",
        level_label: "Niveau", level_value: "Tous niveaux bienvenus",
        cta: "Manifester son intérêt",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'sv',
    supportedLngs: ['sv', 'en', 'es', 'fr'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
