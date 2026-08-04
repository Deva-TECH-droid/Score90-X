import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import WorldCupNews from './new';
import { useWorldCupNews } from '@/hooks/use-worldcup-news';
export default function MinNewsUpdates() {
    const { data: news = [] } = useWorldCupNews();
  return (
    <div className=''>
    <WorldCupNews news={news} />
    </div>
  );
}
