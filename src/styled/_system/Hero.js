import styled, { css } from 'react-emotion'

import { typography, colors, spacing } from '_system/Theme'

const baseHeroStyles = css`
  display: flex;
  flex-direction: column;
  background-color: ${colors.n200};
  border-radius: 6px;
  margin-top: 2em;
  margin-bottom: 2em;
  padding: 2em;
`

const Hero = styled('div')`
  ${baseHeroStyles};
`

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
