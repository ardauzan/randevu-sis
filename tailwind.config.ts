import formsPlugin from '@tailwindcss/forms'
import type { Config } from 'tailwindcss'

const config = {
  content: ['src/istemci/**/*.{html,js,jsx,ts,tsx}'],
  theme: {},
  plugins: [formsPlugin]
} satisfies Config

export default config
