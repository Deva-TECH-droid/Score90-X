import Link from 'next/link';
import { ArrowLeft, Home, SearchX } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6">
     

      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 p-10 text-center shadow-2xl backdrop-blur-xl">
        {/* Icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10 ring-1 ring-blue-500/20">
          <SearchX className="h-10 w-10 text-blue-400" />
        </div>

        {/* 404 */}
        <h1 className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-8xl font-extrabold text-transparent">
          404
        </h1>

        <h2 className="mt-5 text-3xl font-bold text-white">
          Page Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-400">
          The page you're looking for doesn't exist or has been moved.
          Return to the Score90X homepage to continue following FIFA World Cup
          matches, standings, teams, and player statistics.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            <Home size={18} />
            Home
          </Link>

          <Link
            href="/matches"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 font-semibold text-slate-300 transition hover:border-slate-600 hover:bg-slate-700"
          >
            <ArrowLeft size={18} />
            Live Matches
          </Link>
        </div>

        {/* Bottom Info */}
        <div className="mt-10 border-t border-slate-800 pt-6">
          <p className="text-sm text-slate-500">
            Error Code: <span className="font-semibold text-slate-300">404</span>
          </p>
        </div>
      </div>
    </div>
  );
}