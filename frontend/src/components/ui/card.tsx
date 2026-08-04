import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('rounded-3xl border border-slate-800 bg-slate-900/80 shadow-soft', className)}
      {...props}
    />
  );
}
