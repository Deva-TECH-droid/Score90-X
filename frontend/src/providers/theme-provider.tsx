'use client';

import { useEffect } from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark';
}

export function ThemeProvider({ children, defaultTheme = 'dark' }: ThemeProviderProps) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(defaultTheme);
  }, [defaultTheme]);

  return <>{children}</>;
}
