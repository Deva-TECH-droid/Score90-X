import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-slate-950',
        className,
      )}
      {...props}
    />
  );
}
