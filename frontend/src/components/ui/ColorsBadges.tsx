'use client';

import { Palette } from 'lucide-react';
import { ReactNode } from 'react';

type ColorBadgesProps = {
  colors?: string | null;
  title?: string;
  icon?: ReactNode;
  separator?: string;
  showNames?: boolean;

  className?: string;
  titleClassName?: string;
  colorsWrapperClassName?: string;
  dotClassName?: string;
};

const colorMap: Record<string, string> = {
  White: '#FFFFFF',
  Black: '#000000',
  Red: '#DC2626',
  Blue: '#2563EB',
  'Sky Blue': '#38BDF8',
  Green: '#16A34A',
  Yellow: '#FACC15',
  Orange: '#F97316',
  Purple: '#9333EA',
  Gold: '#FBBF24',
  Silver: '#94A3B8',
  Maroon: '#7F1D1D',
  Navy: '#1E3A8A',
  Pink: '#EC4899',
  Brown: '#92400E',
  Grey: '#6B7280',
};

export default function ColorBadges({
  colors,
  title = ' ',
  icon = '',
  separator = '/',
  showNames = false,

  className = '',
  titleClassName = '',
  colorsWrapperClassName = '',
  dotClassName = '',
}: ColorBadgesProps) {
  if (!colors) return null;

  const parsedColors = colors
    .split(separator)
    .map((color) => color.trim())
    .filter(Boolean);

  return (
    <div
      className={`flex items-center gap-2     ${className}`}
    >
      {icon}

      <span
        className={`text-sm text-slate-400 ${titleClassName}`}
      >
        {title}
      </span>

      <div
        className={`flex flex-wrap items-center gap-2 ${colorsWrapperClassName}`}
      >
        {parsedColors.map((color) => (
          <div
            key={color}
            className="flex items-center gap-1"
          >
            <div
              className={`h-4 w-4 rounded-full border border-white/20 ${dotClassName}`}
              style={{
                backgroundColor:
                  colorMap[color] || '#64748B',
              }}
            />

            {showNames && (
              <span className="text-xs text-slate-400">
                {color}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}