/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: '#050814',
        deep: '#0A0F1F',
        sidebar: '#0B1020',
        surface: '#111A28',
        line: '#1D2939',
        ink: '#F3F4F6',
        mist: '#99A3B3',
        mint: { DEFAULT: '#34D399', dark: '#2FA584', light: '#45F0B0' },
        teal: '#2DD4BF',
        sky: '#40B5F5',
        violet: '#A78BFA',
        amber: '#FBBF24',
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', '"Space Grotesk"', 'Inter', 'sans-serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        base: '14px',
      },
      maxWidth: {
        page: '76rem',
      },
    },
  },
  plugins: [],
};
