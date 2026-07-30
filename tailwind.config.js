/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom palette provided by user
        palette: {
          navy: '#22223B',      // Deep Dark / Text Primary
          slate: '#4A4E69',     // Slate Indigo / Primary Accent
          mauve: '#9A8C98',     // Dusty Lavender / Secondary Accent
          nude: '#C9ADA7',      // Rose Beige / Card Border & Highlights
          cream: '#F2E9E4',     // Off-White Cream / Main Light Background
        },
        cyan: {
          primary: '#00D9FF',
          glow: '#00D9FF40',
        },
        dark: {
          bg: '#0D1117',
          card: '#161B22',
          border: '#30363D',
          hover: '#21262D',
        },
        accent: {
          blue: '#58A6FF',
          orange: '#F78166',
          green: '#238636',
        },
        text: {
          primary: '#E6EDF3',
          secondary: '#8B949E',
          muted: '#6E7681',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(20px)' },
          '50%': { opacity: '0.8', filter: 'blur(25px)' },
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
