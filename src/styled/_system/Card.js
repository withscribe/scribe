import styled, { css } from 'react-emotion'

const baseStyles = css`
  display: flex;
  align-items: flex-start;
  padding: 1em;
  background-color: #efefef;
  flex-direction: column;
  border-radius: 6px;
  grid-row-end: span 2;
  grid-column-start: auto;
  grid-row-start: auto;
  box-shadow: 0px 3px 6px rgba(8, 35, 51, 0.05);
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

export {
  Card,
}
