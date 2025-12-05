import { useEffect, useState } from 'react';
import { client } from '../lib/sanity';
import BackgroundContainer from './BackgroundContainer';

const SponsorsSection = () => {
    const [bgSettings, setBgSettings] = useState<any>(null);

    useEffect(() => {
        // Hämta inställningarna för sponsorer
        const query = `*[_type == "siteSettings"][0].sponsorsBackground{
      image,
      "videoUrl": video.asset->url, // Man kan ha video om man vill, men oftast bild här
      overlayOpacity
    }`;

        client.fetch(query).then(setBgSettings).catch(console.error);
    }, []);

    // Om ingen bild/video är uppladdad i Sanity, visa ingenting alls.
    // Då slipper vi en tom grå ruta om akademin inte har sponsorer än.
    if (!bgSettings?.image && !bgSettings?.videoUrl) {
        return null;
    }

    return (
        <BackgroundContainer
            id="sponsorer"
            settings={bgSettings}
            fallbackColor="bg-white"
            className="h-48 w-full md:h-80"
        >

            <span className="sr-only">Våra sponsorer</span>
        </BackgroundContainer>
    );
};

export default SponsorsSection;