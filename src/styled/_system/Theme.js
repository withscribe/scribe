const white = '#FFFFFF'
const black = '#0F131A'

const greys = {
  g100: '#DCDCDC',
  g200: '#ffff1a',
  g300: '#333333',
  g400: '#282828',
  g500: '#151515',
}

const blues = {
  b100: '#DAEAFF',
  b300: '#7FB5FF',
  b500: '#3388FF',
  b700: '#2567D8',
  b900: '#1641AC',
}

const yellows = {
  y100: '#FFC859',
}

const reds = {
  r100: '#FFAF9F',
}

export const colors = {
  white,
  black,
  ...greys,
  ...blues,
  ...yellows,
  ...reds,
}


export const transitions = {
  default: '200ms ease-in-out',
}

export const typography = {
  headings: {
    small: {
      fontSize: '1.2rem',
    },
    medium: {
      fontSize: '1.5rem',
    },
    large: {
      fontSize: '2rem',
    },
    xlarge: {
      fontSize: '4.25rem',
    },
  },
  text: {
    xsmall: {
      fontSize: '0.85rem',
    },
    small: {
      fontSize: '1rem',
    },
    medium: {
      fontSize: '1.2rem',
    },
    large: {
      fontSize: '1.5rem',
    },
  },
}
