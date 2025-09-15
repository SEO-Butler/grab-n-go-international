/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef9f3',
          100: '#fef2e6',
          200: '#fde0c0',
          300: '#fccb9a',
          400: '#fbb647',
          500: '#f7931d', // Grab n Go primary orange
          600: '#ea7c0d',
          700: '#d4610a',
          800: '#ae4c08',
          900: '#8f3f07',
        },
        secondary: {
          50: '#f7f4f4',
          100: '#ede7e7',
          200: '#dccbcb',
          300: '#c3a3a3',
          400: '#a67777',
          500: '#773232', // Grab n Go secondary dark red-brown
          600: '#6b2d2d',
          700: '#5c2525',
          800: '#4d1f1f',
          900: '#3f1a1a',
        },
        // El Campo brand colors
        elCampo: {
          50: '#faf7f5',
          100: '#f5eee8',
          200: '#e8d4c6',
          300: '#d9b699',
          400: '#c7936a',
          500: '#b14724', // El Campo primary terracotta/orange-brown
          600: '#9e3f20',
          700: '#84341b',
          800: '#6b2a17',
          900: '#562213',
        },
        elCampoGreen: {
          50: '#f1f4f1',
          100: '#e0e7e0',
          200: '#c4d2c4',
          300: '#9db39e',
          400: '#708f71',
          500: '#193818', // El Campo secondary dark earthy green
          600: '#162f15',
          700: '#122612',
          800: '#0f1f0f',
          900: '#0d190c',
        },
        elCampoSupport: {
          50: '#f0f2f0',
          100: '#dde2dc',
          200: '#bbc8bb',
          300: '#91a391',
          400: '#657b65',
          500: '#10300f', // El Campo support deep forest green
          600: '#0e2b0d',
          700: '#0c230b',
          800: '#0a1c09',
          900: '#081607',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      perspective: {
        '1000': '1000px',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      }
    },
  },
  plugins: [],
};