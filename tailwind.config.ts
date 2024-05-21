import defaultTheme from 'tailwindcss/defaultTheme'
import formsPlugin from '@tailwindcss/forms'
import { type Config } from 'tailwindcss'

const config = {
  content: ['src/istemci/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['interregular', ...defaultTheme.fontFamily.sans],
      serif: ['domineregular', ...defaultTheme.fontFamily.serif],
      mono: ['ubuntu_sans_monoregular', ...defaultTheme.fontFamily.mono]
    }
  },
  plugins: [formsPlugin]
} satisfies Config

export default config
