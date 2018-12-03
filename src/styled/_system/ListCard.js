import styled, { css } from 'react-emotion'

import {
  gradients, transitions, colors, typography,
} from '_system/Theme'

const baseStyles = css`
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  grid-column-end: auto;
  grid-column: 1 / -1;
  grid-row-end: span 2;
  border: 1px solid lightgrey;
  height: 15vh;
  border-radius: 4px;
  transition: ${transitions.default};

  a {
    display: block;
    width: 100%;
  }

  &:active {
    background-color: ${colors.g100};
  }

  &:hover {
    background-color: ${colors.n400};
    cursor: pointer;
    h1 {
      text-decoration: underline;
    }
  }
`


const largeCardStyles = css`
  grid-column-end: auto;
  grid-column: 1 / -1;
  grid-row-end: span 2;
`

const ListCard = styled('div')`
  ${baseStyles};
  ${p => p.wide ? `${largeCardStyles}` : null};
`

export {
  ListCard,
}