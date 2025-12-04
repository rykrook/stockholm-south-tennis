import { motion } from 'framer-motion';
import heroImage from '../assets/tennis.jpg';
const Hero = () => {
    return (

        <section className="relative h-screen w-full overflow-hidden bg-tennis-navy">

            <div className="absolute inset-0">
                <img
                    src={heroImage}
                    alt="Image missing"
                    className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="max-w-4xl"
                >
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-tennis-gold md:text-base">
                        Stockholm South Tennis Academy • Tumba, Stockholm
                    </p>

                    <h1 className="mb-6 text-5xl font-extrabold uppercase leading-tight tracking-tight text-white md:text-7xl">
                        Utveckla ditt spel <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-tennis-gold">
                            till nästa nivå
                        </span>
                    </h1>

                    <p className="mb-8 text-lg leading-relaxed text-gray-200 md:text-xl mx-auto max-w-2xl">
                        Professionell träning i Tumba för juniorer och vuxna som vill mer än bara slå bollar. Vi bygger spelare med rätt teknik, fysik och mentalitet.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <button className="rounded-none bg-tennis-gold px-8 py-4 text-sm font-bold uppercase tracking-wider text-tennis-navy transition-all hover:bg-white hover:text-tennis-navy md:text-base">
                            Boka Provträning
                        </button>

                        <button className="rounded-none border-2 border-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-tennis-navy md:text-base">
                            Våra Program
                        </button>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default Hero;