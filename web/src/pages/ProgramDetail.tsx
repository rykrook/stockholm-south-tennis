import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { client, urlFor } from '../lib/sanity';
import { useLocalize } from '../lib/locale';
import { PortableText } from '@portabletext/react';
import { ChevronLeft, Calendar, Clock, Trophy } from 'lucide-react';

interface ProgramData {
  title: string;
  image: any;
  content: any[];
  description: string;
}

const ProgramDetail = () => {
  const { t } = useTranslation();
  const localize = useLocalize();
  const { slug } = useParams<{ slug: string }>();
  const [program, setProgram] = useState<ProgramData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
      const query = `*[_type == "program" && slug.current == $slug][0]{
        title,
        "image": mainImage,
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

  if (loading) return <div className="min-h-screen bg-white pt-40 text-center text-gray-500">{t('program.loading')}</div>;
  if (!program) return <div className="min-h-screen bg-white pt-40 text-center text-gray-500">{t('program.notfound')}</div>;

  const title = localize(program.title);
  const content = localize(program.content);

  const facts = [
    { icon: Calendar, label: t('program.period_label'), value: t('program.period_value') },
    { icon: Clock, label: t('program.length_label'), value: t('program.length_value') },
    { icon: Trophy, label: t('program.level_label'), value: t('program.level_value') },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero header */}
      <div className="relative h-[45vh] w-full overflow-hidden bg-navy-950 md:h-[55vh]">
        {program.image && (
          <img
            src={urlFor(program.image).width(2000).url()}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
        )}
        {/* Keep header dark at top (navbar) and center (title) regardless of image brightness */}
        <div className="absolute inset-0 bg-navy-950/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-950/30 to-navy-950" />

        <div className="absolute inset-0 flex items-center justify-center pt-24">
          <div className="px-6 text-center">
            <Link
              to="/#program"
              className="mb-5 inline-flex items-center text-xs font-bold uppercase tracking-widest text-tennis-gold transition-colors hover:text-white"
            >
              <ChevronLeft size={16} className="mr-1" /> {t('program.back')}
            </Link>
            <h1 className="font-display text-5xl uppercase leading-[0.95] tracking-tight text-white md:text-7xl">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto mt-14 max-w-4xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Content */}
          <div className="prose prose-lg max-w-none md:col-span-2 prose-headings:uppercase prose-headings:text-tennis-navy prose-strong:text-tennis-navy">
            <h2 className="mb-6 inline-block border-b-2 border-tennis-gold pb-2 font-display text-2xl uppercase tracking-wide text-tennis-navy">
              {t('program.details_title')}
            </h2>
            {Array.isArray(content) && content.length > 0 ? (
              <PortableText value={content} />
            ) : (
              <p className="text-gray-600">{localize(program.description)}</p>
            )}
          </div>

          {/* Sidebar */}
          <div className="h-fit border-t-4 border-tennis-gold bg-tennis-cream p-8 shadow-card">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-tennis-navy">{t('program.quickfacts')}</h3>
            <div className="space-y-6">
              {facts.map((fact) => (
                <div key={fact.label} className="flex items-start gap-4">
                  <fact.icon className="shrink-0 text-tennis-gold" size={20} />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">{fact.label}</p>
                    <p className="text-sm font-semibold text-tennis-navy">{fact.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/#kontakt"
              className="group relative mt-10 block w-full overflow-hidden bg-tennis-navy py-4 text-center text-xs font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:text-tennis-navy"
            >
              <span className="absolute inset-0 -translate-x-full bg-tennis-gold transition-transform duration-300 ease-out group-hover:translate-x-0" />
              <span className="relative">{t('program.cta')}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;
