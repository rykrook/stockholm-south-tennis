import { urlFor } from '../lib/sanity';

interface BackgroundSettings {
    image?: any;
    videoUrl?: string;
    overlayOpacity?: number;
}

interface Props {
    settings?: BackgroundSettings | null;
    children: React.ReactNode;           
    className?: string;                  
    fallbackColor?: string;               
    id?: string;                         
}

const BackgroundContainer = ({ settings, children, className = "", fallbackColor = "bg-white", id }: Props) => {
    // Har vi media?
    const hasMedia = settings?.videoUrl || settings?.image;

    // Räkna ut opacitet (default 60%)
    const opacity = settings?.overlayOpacity !== undefined ? settings.overlayOpacity / 100 : 0.6;

    return (
        <section id={id} className={`relative overflow-hidden ${className} ${!hasMedia ? fallbackColor : ''}`}>

            {/* --- MEDIA BAKGRUND --- */}
            {hasMedia && (
                <div className="absolute inset-0 z-0">
                    {settings?.videoUrl ? (
                        <video
                            src={settings.videoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <img
                            src={urlFor(settings!.image).url()}
                            alt="Section background"
                            className="h-full w-full object-cover"
                        />
                    )}

                    {/* Overlay (Styrs av opacity från Sanity) */}
                    <div
                        className="absolute inset-0 bg-tennis-navy"
                        style={{ opacity: opacity }}
                    ></div>
                </div>
            )}

            {/* --- INNEHÅLL --- */}
            <div className="relative z-10">
                {children}
            </div>
        </section>
    );
};

export default BackgroundContainer;