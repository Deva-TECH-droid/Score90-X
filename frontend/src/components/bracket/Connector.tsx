'use client';

interface Props {
  paths: { key: string; d: string }[];
  width: number;
  height: number;
}

export default function BracketConnectors({ paths, width, height }: Props) {
  return (
    <svg
      className="absolute left-0 top-0 pointer-events-none"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      {paths.map((p) => (
        <path key={p.key} d={p.d} fill="none" stroke="#5A6475" strokeWidth={2} />
      ))}
    </svg>
  );
}