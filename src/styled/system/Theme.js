import facepaint from 'facepaint'

const white = '#FFFFFF'
const black = '#16171a'

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

const teals = {
  t100: '#F1FBFC',
  t200: '#D2EEF3',
  t300: '#14B5D0',
  t400: '#007489',
}

const purples = {
  p100: '#F8F7FC',
  p200: '#EAE7F8',
  p300: '#735DD0',
  p400: '#37248F',
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

const oranges = {
  o100: '#FDF8F3',
  o200: '#FAE3CD',
  o300: '#D9822B',
  o400: '#95591E',
}

const intent = {
  none: blues.p300,
  success: greens.g300,
  danger: reds.r300,
  warning: oranges.o300,
}

export const colors = {
  white,
  black,
  border,
  background,
  intent,
  ...neutrals,
  ...teals,
  ...purples,
  ...blues,
  ...yellows,
  ...reds,
  ...greens,
  ...oranges,
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

export const mq = facepaint([
  '@media(max-width: 420px)',
  '@media(max-width: 920px)',
  '@media(max-width: 1120px)',
])
