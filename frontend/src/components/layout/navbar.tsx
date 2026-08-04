'use client';

import Link from 'next/link';
import { Info, Menu, Search, X } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { MobileNavbar } from '@/components/layout/mobile-navbar';
import BackButton from '../ui/BackButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/public/logos/transparant-logo.png';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  House,
  Radio,
  CalendarDays,
  Users,
  Trophy,
  Table2,
  BarChart3,
  Goal,
} from "lucide-react";

const navLinks = [
  {
    label: "Home",
    href: "/",
    icon: <House size={18} />,
  },
  {
    label: "Live",
    href: "/live-matches",
    icon: <Radio size={18} />,
  },
  {
    label: "Matches",
    href: "/matches",
    icon: <CalendarDays size={18} />,
  },
  {
    label: "Teams",
    href: "/teams",
    icon: <Users size={18} />,
  },
  {
    label: "Bracket",
    href: "/bracket",
    icon: <Trophy size={18} />,
  },
  {
    label: "Table Standings",
    href: "/table-standing",
    icon: <Table2 size={18} />,
  },
  {
    label: "Group Standings",
    href: "/group-standings",
    icon: <BarChart3 size={18} />,
  },
  {
    label: "Top Scorers",
    href: "/top-scorers",
    icon: <Goal size={18} />,
  },
  {
    label: "About",
    href: "/about",
    icon: <Info size={18} />,
  },

];

export function Navbar() {
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const router = useRouter();
  const [search, setSearch] = useState('');
  return (
   <header className="sticky top-0 z-[60] border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="  ">
          <motion.div
            className="relative   md:hidden md:p-4 flex items-center justify-center gap-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
               <Image src={Logo} alt="Score90X Logo" width={50} height={50} />
            <Link href="/" className="  text-center  flex flex-col items-center justify-center ">
              <span className="text-3xl flex   justify-center items-center font-black text-white tracking-tight">

                Score
                 <span className="text-3xl font-black bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                90X
              </span>
              </span>

              <p className="text-[10px] md:hidden text-center text-slate-400  ">WORLD CUP 2026</p>
            </Link>

          </motion.div>
          <div className='hidden md:block'>

          <BackButton  />
          </div>
        </div>
        {/* <div className="relative w-full max-w-xs">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && search.trim()) {
                router.push(`/search?q=${search}`);
              }
            }}
            placeholder="Search players, teams, matches"
            className="..."
          />
        </div> */}

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Open navigation"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800 text-slate-300 transition hover:border-slate-700 hover:text-white md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <MobileNavbar
        open={mobileMenuOpen}
        links={navLinks}
        onClose={() => setMobileMenuOpen(false)}

      />
    </header>
  );
}
