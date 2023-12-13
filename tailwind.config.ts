import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'officemap': ['var(--font-noto-sans)', 'sans-serif'],
        'officemap-icon': [
            'var(--font-material-icons-rounded), sans-serif', {
          fontVariationSettings: '"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24'
          }
        ],
				'icons': ['material', 'cursive'],
      },
      colors: {
        'officemap-black': '#000',
        'officemap-white': '#fff',
        'officemap-brown': {
          400: '#c46512'
        },
        'officemap-grey': {
          200: '#9aa0a6',
          400: '#5F6368'
        },
        'officemap-green': {
          400: '#33995f'
        },
        'officemap-blue': {
          400: '#1E90FF',
          700: '#4169E1'
        },
      },
    },
  },
  plugins: [],
}
export default config
