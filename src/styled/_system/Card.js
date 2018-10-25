import styled, { css } from 'react-emotion'

import {
  gradients, transitions, colors, typography,
} from '_system/Theme'

const randomColor = () => {
  let keys = Object.keys(gradients)
  const res = gradients[keys[keys.length * Math.random() << 0]]
  const style = css`${res}`
  return style
}

const baseStyles = css`
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  grid-column-start: auto;
  grid-row-start: auto;
  transition: ${transitions.default};

  a {
    display: block;
    width: 100%;
  }

  &:hover {
    cursor: pointer;
    h1 {
      /* color: ${colors.g300}; */
      text-decoration: underline;
    }
  }
`

const largeCardStyles = css`
  grid-column-end: auto;
  grid-column: 1 / -1;
  grid-row-end: span 2;
`

const Card = styled('div')`
  ${baseStyles};
  ${p => p.wide ? `${largeCardStyles}` : null};
`

const CardImage = styled('div')`
  display: flex;
  flex-direction: column;
  height: 10em;
  width: 100%;
  justify-content:  space-between;
  background-color: #efefef;
  align-items: flex-start;
`

const CardBadgeWrapper = styled('div')`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 0 1em;
  margin: 1em 0;
`

const CardLikeWrapper = styled('div')`
  display: inline-flex;
  background-color: ${colors.white};
  border-radius: 4px;
  justify-content: center;
  align-items: initial;
  padding: 0.25em;
  margin: 1em;
  cursor: pointer;
  transition: ${transitions.default};
  border: 1px solid ${colors.white};

  &:hover {
    border: 1px solid ${colors.g100};
  }
`

const CardLikeAction = styled('div')`
  display: inline;
  ${typography.text.xsmall};
`
const CardLikeText = styled('span')`
  ${typography.text.small};
`

export {
  Card,
  CardImage,
  CardBadgeWrapper,
  CardLikeWrapper,
  CardLikeAction,
  CardLikeText,
}
