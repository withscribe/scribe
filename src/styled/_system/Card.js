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

const gradOneStyle = css`
  ${gradients[1]};
`

const gradTwoStyle = css`
  ${gradients[2]};
`

const gradThreeStyle = css`
  ${gradients[3]};
`

const gradFourStyle = css`
  ${gradients[4]};
`

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

  ${p => p.grad == 1 ? `${gradOneStyle}` : null};
  ${p => p.grad == 2 ? `${gradTwoStyle}` : null};
  ${p => p.grad == 3 ? `${gradThreeStyle}` : null};
  ${p => p.grad == 4 ? `${gradFourStyle}` : null};
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
  /* background-color: ${colors.g100}; */
  background-color: rgba(0, 0, 0, .04);
  border-radius: 4px;
  justify-content: center;
  align-items: initial;
  padding: 0.25em;
  margin: 1em;
  cursor: pointer;
  transition: ${transitions.default};

  &:hover {
    background-color: ${colors.white};
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
