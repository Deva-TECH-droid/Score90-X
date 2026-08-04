'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from '@/public/logos/navlogo-removebg.png';
import {
  Home,
  Clock,
  Calendar,
  User,
  Newspaper,
  ArrowRight,
  LayoutGrid,
  Shield,
} from 'lucide-react';
import Image from 'next/image';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  badgeColor?: 'red' | 'purple';
  href: string;
}

export default function SideNavBar() {
  const [activeItem, setActiveItem] = useState('home');

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: <Home size={20} />, href: '/' },
    {
      id: 'live-matches',
      label: 'Live Matches',
      icon: <Clock size={20} />,
      href: '/live-matches',
    },
    {
      id: 'upcoming',
      label: 'Upcoming',
      icon: <Calendar size={20} />,
      href: '/upcoming',
    },
    // {
    //   id: 'world-cup',
    //   label: 'World Cup 2026',
    //   icon: <Trophy size={20} />,
    //   badge: 'HOT',
    //   badgeColor: 'purple',
    //   href: '/world-cup-2026',
    // },
    {
      id: 'standings',
      label: 'Standings',
      icon: <LayoutGrid size={20} />,
      href: '/standings',
    },
    {
      id: 'teams',
      label: 'Teams',
      icon: <Shield size={20} />,
      href: '/teams',
    },
    {
      id: 'players',
      label: 'Players',
      icon: <User size={20} />,
      href: '/players',
    },
    // {
    //   id: 'top-scorers',
    //   label: 'Top Scorers',
    //   icon: <Target size={20} />,
    //   href: '/top-scorers',
    // },
    {
      id: 'news',
      label: 'News',
      icon: <Newspaper size={20} />,
      badgeColor: 'red',
      badge: 'Soon',
      href: '/news',
    },
    // {
    //   id: 'stats',
    //   label: 'Stats',
    //   icon: <TrendingUp size={20} />,
    //   href: '/stats',
    // },
    // {
    //   id: 'favorites',
    //   label: 'Favorites',
    //   icon: <Star size={20} />,
    //   href: '/favorites',
    // },
    // {
    //   id: 'settings',
    //   label: 'Settings',
    //   icon: <Settings size={20} />,
    //   href: '/settings',
    // },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut' as const,
      },
    },
  } as const;

  const badgeVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 10,
      },
    },
  } as const;

  return (
    <div className="w-60 min-h-screen   border-r border-slate-800 flex flex-col overflow-hidden">
      {/* Header */}
      <motion.div
        className="relative p-4  "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/" className="  text-center  flex items-center justify-center ">
          <span className="text-3xl flex justify-center items-center font-black text-white tracking-tight">
            <Image src={Logo} alt="Score90X Logo" width={50} height={50} />
            Score
          </span>
          <span className="text-3xl font-black bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            90X
          </span>
        </Link>
        <p className="text-[10px] text-center text-slate-400  ">WORLD CUP 2026</p>
      </motion.div>

      {/* Navigation Items */}
      <motion.nav
        className="flex-1 overflow-y-auto py-0 px-3 space-y-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {navItems.map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <Link
              href={item.href}
              onClick={() => setActiveItem(item.id)}
              className={`w-full relative block rounded-xl transition-all duration-300 group ${
                activeItem === item.id
                  ? ' bg-indigo-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <motion.div
                className="w-full flex items-center gap-4 px-4 py-2.5"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  className={`shrink-0 ${
                    activeItem === item.id
                      ? 'text-white'
                      : 'text-slate-400 group-hover:text-blue-400'
                  } transition-colors`}
                >
                  {item.icon}
                </span>
                <span className="flex-1 text-left font-medium text-sm">{item.label}</span>

                {item.badge && (
                  <motion.div
                    variants={badgeVariants}
                    initial="hidden"
                    animate="visible"
                    className={`shrink-0 flex items-center justify-center px-2  rounded-full text-xs ${
                      item.badgeColor === 'red'
                        ? 'bg-red-500 text-white'
                        : 'bg-purple-500 text-white'
                    }`}
                  >
                    {item.badge}
                  </motion.div>
                )}
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.nav>

      {/* Promotional Banner */}
      <motion.div
        className="relative sidenavbar-banner !h-[35vh]  mx-2 mb-3 p-4 rounded-2xl  overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full items-center text-start">
          <div className="mb-3  ">
            <p className="text-yellow-300 text-lg font-bold mb-1">FIFA WORLD CUP</p>
            <p className="text-white text-2xl font-black">2026</p>
          </div>

          <p className="text-white font-medium text-sm leading-snug mb-4">
            11 JUNE - 19 JULY
            <br />
            USA • CANADA • MEXICO
          </p>

          <motion.a
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-400/30 text-slate-200 text-sm font-semibold backdrop-blur-xs hover:bg-slate-800/50 hover:border-slate-300/50 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026"
          >
            View Details
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}
