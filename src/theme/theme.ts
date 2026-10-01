import { createTheme, type MantineColorsTuple } from '@mantine/core'

const sage: MantineColorsTuple = [
  '#f2f7f4',
  '#e3ede7',
  '#c5dacb',
  '#a5c6b0',
  '#89b497',
  '#77a887',
  '#6ca27f',
  '#5a8e6c',
  '#4e7e5f',
  '#3f6d50',
]

const cream: MantineColorsTuple = [
  '#faf8f5',
  '#f2ede6',
  '#e5d9c8',
  '#d7c5aa',
  '#ccb390',
  '#c4a87d',
  '#c0a273',
  '#a98c60',
  '#967c54',
  '#826b44',
]

export const theme = createTheme({
  primaryColor: 'sage',
  colors: { sage, cream },
  fontFamily: '"Inter", "Segoe UI", sans-serif',
  headings: {
    fontFamily: '"Georgia", "Times New Roman", serif',
    fontWeight: '500',
  },
  defaultRadius: 'md',
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  components: {
    AppShell: {
      styles: {
        root: { backgroundColor: '#faf8f5' },
        main: { backgroundColor: '#faf8f5' },
      },
    },
  },
})
