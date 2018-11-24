import styled, { css } from 'react-emotion'

import { typography, colors, spacing } from '_system/Theme'

const types = {
  purple: {
    text: colors.white,
    bg: colors.p300,
  },
  teal: {
    text: colors.white,
    bg: colors.t300,
  },
  blue: {
    text: colors.white,
    bg: colors.b300,
  },
  green: {
    text: colors.white,
    bg: colors.g300,
  },
  red: {
    text: colors.white,
    bg: colors.r300,
  },
  grey: {
    text: colors.black,
    bg: colors.background.tint2,
  },
}

const baseHeroStyles = css`
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  margin-top: 2em;
  margin-bottom: 2em;
  padding: 2em;
  width: 100%;
`

const Hero = styled('div')(
  baseHeroStyles,
  ({ appearance }) => `
    background-color: ${types[appearance].bg};
    color: ${types[appearance].text};
  `,
)

const heroPrimaryStyles = css`
  font-family: Theinhardt-Bold;
  ${typography.headings.large};
  margin: 0 0 0.5em 0;
`

const HeroPrimaryText = styled('h1')`
  ${heroPrimaryStyles};
`

const heroSpanStyles = css`
  ${typography.text.medium};
`

const heroSpanWithAction = css`
  margin: ${spacing.mb1};
`

const HeroSpanText = styled('span')`
  ${heroSpanStyles};
  ${p => p.withAction ? `${heroSpanWithAction}` : null}
`


export default Hero

export {
  HeroPrimaryText,
  HeroSpanText,
}
