import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost';
}

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
        variant === 'default' && 'bg-brand-500 text-slate-950 hover:bg-brand-400',
        variant === 'ghost' && 'bg-slate-900/80 text-slate-100 hover:bg-slate-800',
        className,
      )}
      {...props}
    />
  );
}
