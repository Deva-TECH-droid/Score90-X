'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Facebook, Instagram, Menu, Shield, Trophy, Twitter, X, Youtube } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import Image from 'next/image';

import Logo from '@/public/logos/transparant-logo.png';

interface MobileNavbarProps {
  open: boolean;
  links: Array<{ label: string; href: string; icon: React.ReactNode }>;

  onClose: () => void;
}

export function MobileNavbar({ open, links, onClose }: MobileNavbarProps) {
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.25 }}
          className="
    fixed
    top-0
    left-0

    w-screen
    h-screen
    z-[9999]
    bg-slate-950
    md:hidden
    overflow-y-auto
  "
        >
          <div  className='flex justify-between items-center px-3 py-5'>


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
          </motion.div>{' '}
          <button
            type="button"
            aria-label="Open navigation"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800 text-slate-300 transition hover:border-slate-700 hover:text-white md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          </div>
          <div className="px-3 space-y-1  ">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="group flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-1 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="flex p-2 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition">
                    {item.icon}
                  </div>

                  <span className="text-sm font-medium text-white">{item.label}</span>
                </div>

                <svg
                  className="h-5 w-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
          <div className="px-3 py-3 space-y-1  ">
            <h3 className="mb-1   text-sm">Follow Us</h3>

            <div className="flex gap-3  ">
              <div className="rounded-full  border-slate-700 border hover:bg-indigo-700 hover:border-slate-300/50 transition-all duration-300 group p-2">
                <Facebook size={18} />
              </div>

              <div className="rounded-full  border-slate-700 border hover:bg-indigo-700 hover:border-slate-300/50 transition-all duration-300 group p-2">
                <Twitter size={18} />
              </div>

              <div className="rounded-full  border-slate-700 border hover:bg-indigo-700 hover:border-slate-300/50 transition-all duration-300 group p-2">
                <Instagram size={18} />
              </div>

              <div className="rounded-full  border-slate-700 border hover:bg-indigo-700 hover:border-slate-300/50 transition-all duration-300 group p-2">
                <Youtube size={18} />
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
