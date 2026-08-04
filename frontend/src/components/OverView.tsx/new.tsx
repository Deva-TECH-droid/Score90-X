'use client';

import { Newspaper, Clock, ArrowUpRight } from 'lucide-react';

interface NewsItem {
  pageid: number;
  title: string;
  snippet: string;
  timestamp: string;
}

interface Props {
  news: NewsItem[];
}

export default function WorldCupNews({ news }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-2">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-medium text-white">
            News & Updates
          </h2>

          <p className="text-sm text-slate-400">
            Latest FIFA World Cup headlines
          </p>
        </div>

        <div className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
          {news.length} Articles
        </div>
      </div>

      {/* News List */}
      <div className="h-[400px] md:h-[290px]  space-y-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {news.map((item, index) => (
          <a
            key={item.pageid}
            href={`https://en.wikipedia.org/?curid=${item.pageid}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              block
              overflow-hidden
              rounded-2xl
              border
              border-slate-800
              bg-slate-900/70
              p-2
              transition-all
              duration-300
              hover:border-blue-500/40
              hover:bg-slate-800
              hover:shadow-lg
              hover:shadow-blue-500/10
            "
          >
            {/* Top Row */}
            <div className="mb-1 flex items-center justify-between">
              <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-sm font-medium text-blue-400">
                Breaking News #{index + 1}
              </span>

              <ArrowUpRight
                size={16}
                className="text-slate-500 transition group-hover:text-blue-400"
              />
            </div>

            {/* Title */}
            <h3
              className="
                line-clamp-2
                !text-sm
                font-semibold
                text-white
                transition
                group-hover:text-blue-300
              "
            >
              {item.title}
            </h3>

            {/* Snippet */}
            <p
              className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400"
              dangerouslySetInnerHTML={{
                __html: item.snippet.replace(/<\/?span[^>]*>/g, ''),
              }}
            />

            {/* Footer */}
            <div className=" flex items-center justify-between border-t border-slate-800 pt-2">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock size={14} />
                {new Date(item.timestamp).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>

              <span className="text-sm font-medium text-blue-400 transition group-hover:text-blue-300">
                Read Story →
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}