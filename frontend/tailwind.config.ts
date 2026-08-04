import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#4f46e5',
          700: '#3730a3',
        },
      },
      boxShadow: {
        soft: '0 20px 60px rgba(15, 23, 42, 0.18)',
      },
       fontSize: {
        xs: ['12px', '16px'],
      },
    },
  },
  plugins: [],
};

export default config;
