/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f6fb',
          100: '#e8edf6',
          200: '#d5dff0',
          300: '#b8c8e4',
          400: '#96aed6',
          500: '#7a96cb',
          600: '#6680be',
          700: '#5a6eae',
          800: '#4c5c8f',
          900: '#0c3065',
        },
        secondary: {
          50: '#f0f8ff',
          100: '#e0f1fe',
          200: '#bae2fd',
          300: '#7dcbfc',
          400: '#38b1f8',
          500: '#247dbc',
          600: '#1e6ba1',
          700: '#1a5682',
          800: '#154766',
          900: '#0f3651',
        },
        neutral: {
          50: '#f9f9f9',
          100: '#f3f3f3',
          200: '#e6e6e6',
          300: '#d9d9d9',
          400: '#cccccc',
          500: '#b3b3b3',
          600: '#999999',
          700: '#808080',
          800: '#666666',
          900: '#4d4d4d',
        }
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
        athelas: ['Athelas Bold', 'serif'],
        primary: ['Athelas Bold', 'var(--font-inter)', 'Inter', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
