'use client';

interface Props {
  query: string;
}

export default function SearchResults({ query }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-5">
        Search Results
      </h1>

      <p className="text-slate-400">
        Searching for: <span className="text-white">{query}</span>
      </p>
    </div>
  );
}