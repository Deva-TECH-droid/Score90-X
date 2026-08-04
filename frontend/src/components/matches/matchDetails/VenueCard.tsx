import { Landmark, LandPlot } from 'lucide-react';
import Image from 'next/image';
import stadiumicon from '@/public/assets/Images/stadium-icon.png';

interface VenueCardProps {
  venue?: string | null;
}

export default function VenueCard({ venue }: VenueCardProps) {
  return (
    <div className="  w-1/2 border border-slate-800 rounded-xl    p-2 bg-navy-blue">
      {/* Header */}
      <div className=" flex items-center gap-1">
        <div className='flex p-2 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition'>
          <LandPlot size={17} />
        </div>

        <h3 className="flex items-center gap-2 text-lg font-medium text-white">Venue</h3>
      </div>

      {/* Watermark */}
      <div className='flex items-center px-5 gap-4'>
        <div className=" opacity-[10%] ">
          <Image
            src={stadiumicon}
            alt="Watermark"
            width={70}
            height={70}
            style={{
              filter: 'brightness(0) invert(1)',
            }}
                className='h-15 w-15 sm:h-24 sm:w-24'
          />
        </div>
        {/* Content */}
        <div className=" ">
          <p className="  text-sm text-slate-400">Venue</p>

          <h4 className="text-sm font-medium text-blue-400">{venue || 'TBA'}</h4>
        </div>
      </div>
    </div>
  );
}
