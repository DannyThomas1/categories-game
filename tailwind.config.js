/** @type {import('tailwindcss').Config} */
import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme'

export const content = ['./src/**/*.{js,ts,jsx,tsx}']
export const theme = {
  extend: {
    fontFamily: {
      commissioner: ['Commissioner', ..._fontFamily.sans]
    }
  }
}
export const plugins = [require('tailwindcss-animated')]
