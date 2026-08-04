import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Shield,
  Trophy,
  ChevronRight,
} from "lucide-react";

import Logo from "@/public/logos/transparant-logo.png";

const explore = [
  { title: "Live Matches", href: "/live-matches" },
  { title: "Upcoming Matches", href: "/matches" },
  { title: "Teams", href: "/teams" },
  { title: "Standings", href: "/group-standings" },
  { title: "Statistics", href: "/top-scorers" },
  { title: "News", href: "/news" },
];

const worldCup = [
  { title: "Groups", href: "/group-standings" },
  { title: "Fixtures", href: "/matches" },
  { title: "Bracket", href: "/bracket" },
  { title: "Table Standings", href: "/table-standing" },
  { title: "Top Scorers", href: "/top-scorers" },
  { title: "Teams", href: "/teams" },
];

const company = [
  { title: "About Us", href: "#" },
  { title: "Contact", href: "#" },
  { title: "Privacy Policy", href: "#" },
  { title: "Terms of Service", href: "#" },
];

const socials = [
  {
    icon: Facebook,
    href: "#",
  },
  {
    icon: Twitter,
    href: "#",
  },
  {
    icon: Instagram,
    href: "#",
  },
  {
    icon: Youtube,
    href: "#",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#030712] text-white">
      <div className=" px-10 py-5">

        {/* Top */}
        <div className="grid gap-14 lg:grid-cols-[320px_1fr]">

          {/* Brand */}
          <div className="flex flex-col items-center lg:items-start">

            <Link href="/">
              <Image
                src={Logo}
                alt="Score90X"
                width={180}
                height={180}
                className="w-44 h-auto"
              />
            </Link>

            <p className="mt-5 max-w-sm text-center text-sm leading-7 text-slate-400 lg:text-left">
              Your ultimate destination for FIFA World Cup 2026 live scores,
              fixtures, standings, statistics and breaking football news.
            </p>

            {/* Social */}
            <div className="mt-8">
              <h3 className="mb-4 text-center text-base font-semibold lg:text-left">
                Follow Us
              </h3>

              <div className="flex justify-center gap-3 lg:justify-start">
                {socials.map(({ icon: Icon, href }, index) => (
                  <Link
                    key={index}
                    href={href}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900 transition-all duration-300 hover:border-blue-500 hover:bg-blue-600 hover:scale-105"
                  >
                    <Icon size={18} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-3">

            {/* Explore */}
            <FooterSection
              title="Explore"
              links={explore}
            />

            {/* World Cup */}
            <FooterSection
              title="World Cup 2026"
              links={worldCup}
            />

            {/* Company */}
            <FooterSection
              title="Company"
              links={company}
            />

          </div>

        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-slate-800" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">

          <p className="text-sm text-slate-500">
            © 2026 <span className="font-semibold text-white">Score90X</span>.
            All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">

            <div className="flex items-center gap-2">
              <Shield size={16} />
              Secure Platform
            </div>

            <div className="flex items-center gap-2">
              <Trophy size={16} />
              FIFA World Cup 2026
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}

function FooterSection({
  title,
  links,
}: {
  title: string;
  links: {
    title: string;
    href: string;
  }[];
}) {
  return (
    <div>

      <h3 className="mb-5 border-b border-slate-700 pb-3 text-lg font-semibold">
        {title}
      </h3>

      <ul className="space-y-4">
        {links.map((item) => (
          <li key={item.title}>
            <Link
              href={item.href}
              className="group flex items-center gap-2 text-sm text-slate-400 transition-all duration-300 hover:text-blue-400"
            >
              <ChevronRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />

              {item.title}
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
}