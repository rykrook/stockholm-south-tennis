import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { client } from '../lib/sanity';

interface Props {
  onVisibilityChange: (isVisible: boolean) => void;
}

const NotificationBanner = ({ onVisibilityChange }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const query = `*[_type == "siteSettings"][0]{
      bannerActive,
      bannerText,
      bannerLink
    }`;

    client.fetch(query).then((result) => {
      setData(result);
      if (result?.bannerActive) {
        setIsVisible(true);
        onVisibilityChange(true);
      } else {
        onVisibilityChange(false);
      }
    });
  }, [onVisibilityChange]);

  const handleClose = () => {
    setIsVisible(false);
    onVisibilityChange(false);
  };

  if (!data?.bannerActive || !isVisible) return null;

  return (
    <div className="fixed left-0 right-0 top-0 z-[100] flex h-10 items-center justify-between bg-tennis-gold px-4 text-tennis-navy shadow-md transition-all">
      
      <div className="w-6 md:w-8"></div>

      <div className="text-center text-xs font-bold uppercase tracking-widest md:text-sm truncate px-2">
        {data.bannerLink ? (
          <a href={data.bannerLink} className="hover:underline">
            {data.bannerText}
          </a>
        ) : (
          <span>{data.bannerText}</span>
        )}
      </div>

      <button 
        onClick={handleClose}
        className="flex w-6 items-center justify-end hover:opacity-70 md:w-8"
        aria-label="Stäng notis"
      >
        <X size={18} />
      </button>

    </div>
  );
};

export default NotificationBanner;