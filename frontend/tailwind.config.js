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
        // Sign Up Buddy custom colors
        charcoal: {
          DEFAULT: '#0B0F14',
          light: '#141A22',
          dark: '#070A0D',
        },
        violet: {
          soft: '#7C7CFF',
          glow: '#9D9DFF',
          dark: '#5C5CDF',
        },
        cyan: {
          accent: '#22D3EE',
          glow: '#67E8F9',
          dark: '#06B6D4',
        },
        orange: {
          accent: '#FF8C42',
          glow: '#FFB07C',
          dark: '#E07030',
          bright: '#FF6B2C',
        },
      },
      animation: {
        'glow-shift': 'glowShift 8s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'robot-breathe': 'robotBreathe 4s ease-in-out infinite',
        'eye-glow': 'eyeGlow 3s ease-in-out infinite',
        'chest-pulse': 'chestPulse 2s ease-in-out infinite',
        'bubble-float': 'bubbleFloat 3s ease-in-out infinite',
      },
      keyframes: {
        glowShift: {
          '0%, 100%': {
            boxShadow: '0 0 60px rgba(124, 124, 255, 0.4), 0 0 120px rgba(124, 124, 255, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 60px rgba(34, 211, 238, 0.4), 0 0 120px rgba(34, 211, 238, 0.2)',
          },
        },
        glowPulse: {
          '0%, 100%': {
            opacity: '0.6',
          },
          '50%': {
            opacity: '1',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        floatSlow: {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)',
          },
          '25%': {
            transform: 'translateY(-8px) rotate(2deg)',
          },
          '75%': {
            transform: 'translateY(-4px) rotate(-2deg)',
          },
        },
        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        robotBreathe: {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.02)',
          },
        },
        eyeGlow: {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 8px rgba(124, 124, 255, 0.8))',
          },
          '50%': {
            filter: 'drop-shadow(0 0 15px rgba(34, 211, 238, 0.9))',
          },
        },
        chestPulse: {
          '0%, 100%': {
            opacity: '0.7',
            boxShadow: '0 0 20px rgba(124, 124, 255, 0.5)',
          },
          '50%': {
            opacity: '1',
            boxShadow: '0 0 35px rgba(34, 211, 238, 0.7)',
          },
        },
        bubbleFloat: {
          '0%, 100%': {
            transform: 'translateY(0px) scale(1)',
          },
          '50%': {
            transform: 'translateY(-5px) scale(1.02)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
