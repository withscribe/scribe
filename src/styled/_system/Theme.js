const white = '#FFFFFF'
const black = '#0F131A'


const border = {
  default: '#E4E7EB',
  muted: '#EDF0F2',
}

const background = {
  tint1: '#F9F9FB',
  tint2: '#F5F6F7',
}

const neutrals = {
  n100: '#F9F9FB',
  n200: '#E4E7EB',
  n300: '#425A70',
  n400: '#234361',
}

const blues = {
  b100: '#F7F9FD',
  b200: '#DDEBF7',
  b300: '#1070CA',
  b400: '#084B8A',
}

const yellows = {
  y100: '#FEF8E7',
  y200: '#FBE6A2',
  y300: '#F7D154',
  y400: '#7E6514',
}

const reds = {
  r100: '#FEF6F6',
  r200: '#FAE2E2',
  r300: '#EC4C47',
  r400: '#BF0E08',
}

const greens = {
  g100: '#F1FAF5',
  g200: '#D4EEE2',
  g300: '#47B881',
  g400: '#00783E',
}

const intent = {
  none: blues.b300,
  success: greens.g300,
  danger: reds.r300,
  warning: yellows.y300,
}

export const colors = {
  white,
  black,
  border,
  background,
  intent,
  ...neutrals,
  ...blues,
  ...yellows,
  ...reds,
  ...greens,
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

export const spacing = {
  m1: 'margin: 1em',
  m2: 'margin: 2em',
  m3: 'margin: 3em',
  m5: 'margin: 5em',
  mb1: 'margin-bottom: 1em',
}
