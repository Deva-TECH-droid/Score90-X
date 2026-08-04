'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent SSR/client markup mismatch
  if (!mounted) return null;

  // multipule paths
  // const hiddenRoutes = ['/', '/login', '/signup'];

  // Hide on home page
  if (pathname === '/') {
    return null;
  }

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center bg-slate-900/90  border border-color p-2 !text-sm rounded-lg text-white/50 hover:text-white transition-all duration-300 hover:bg-slate-950"
    >
      <ChevronLeft size={16} />
      Back
    </button>
  );
}
