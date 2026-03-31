import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import { ChevronLeft, Calendar, Clock, Trophy } from 'lucide-react';

interface ProgramData {
  title: string;
  image: any;
  content: any[];
  description: string;
}

const ProgramDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [program, setProgram] = useState<ProgramData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
      const query = `*[_type == "program" && slug.current == $slug][0]{
        title,
        image,
        content,
        description
      }`;
      try {
        const data = await client.fetch(query, { slug });
        setProgram(data);
      } catch (error) {
        console.error("Error fetching program:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-white pt-32 text-center">Laddar...</div>;
  if (!program) return <div className="min-h-screen bg-white pt-32 text-center">Programmet hittades inte.</div>;

  return (
    <div className="bg-white min-h-screen pb-20">
      
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden bg-tennis-navy">
        {program.image && (
          <img 
            src={urlFor(program.image).url()} 
            alt={program.title}
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
        )}
        
        <div className="absolute inset-0 flex items-center justify-center pt-24">
          <div className="text-center px-6">
            <Link 
              to="/#program" 
              className="inline-flex items-center text-tennis-gold uppercase text-xs font-bold tracking-widest mb-4 hover:text-white transition-colors"
            >
              <ChevronLeft size={16} className="mr-1" /> Tillbaka till alla program
            </Link>
            <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter">
              {program.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Vänster: Detaljerat innehåll (Schema/Upplägg) */}
          <div className="md:col-span-2 prose prose-lg max-w-none prose-headings:uppercase prose-headings:text-tennis-navy prose-strong:text-tennis-navy">
            <h2 className="text-2xl font-bold text-tennis-navy uppercase mb-6 pb-2 border-b-2 border-tennis-gold inline-block">
              Träningsupplägg & Detaljer
            </h2>
            {program.content ? (
              <PortableText value={program.content} />
            ) : (
              <p className="text-gray-600">{program.description}</p>
            )}
          </div>

          {/* Höger: Snabbinfo Sidebar */}
          <div className="bg-gray-50 p-8 rounded-sm h-fit border-t-4 border-tennis-navy">
            <h3 className="font-bold uppercase text-tennis-navy mb-6 tracking-wider text-sm">Snabbfakta</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Calendar className="text-tennis-gold shrink-0" size={20} />
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400">Period</p>
                  <p className="text-sm font-semibold text-tennis-navy">Terminsvis / Lov</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="text-tennis-gold shrink-0" size={20} />
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400">Passlängd</p>
                  <p className="text-sm font-semibold text-tennis-navy">60 - 90 minuter</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Trophy className="text-tennis-gold shrink-0" size={20} />
                <div>
                  <p className="text-xs font-bold uppercase text-gray-400">Nivå</p>
                  <p className="text-sm font-semibold text-tennis-navy">Alla nivåer välkomna</p>
                </div>
              </div>
            </div>
            
            <Link 
              to="/#kontakt"
              className="mt-10 block w-full bg-tennis-navy text-white text-center py-4 text-xs font-bold uppercase tracking-widest hover:bg-tennis-gold hover:text-tennis-navy transition-all"
            >
              Intresseanmälan
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;