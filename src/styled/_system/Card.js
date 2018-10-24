import styled, { css } from 'react-emotion'
import { gradients, transitions, colors } from '_system/Theme'

const randomColor = () => {
  let keys = Object.keys(gradients)
  const res = gradients[keys[keys.length * Math.random() << 0]]
  const style = css`${res}`
  return style
}

const baseStyles = css`
  display: flex;
  align-items: flex-start;
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
  align-items: flex-start;
  background-color: #efefef;
`

export {
  Card,
  CardImage,
}
