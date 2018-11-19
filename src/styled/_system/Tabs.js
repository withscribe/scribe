import styled, { css } from 'react-emotion'

import { colors } from '_system/Theme'

const baseTabStyles = css`
  display: inline-flex;
  font-weight: 300;
  padding: 0.7em;
  margin: 0.7em;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${colors.g500};
  cursor: pointer;
`

const selectedTabStyles = css`
  color: ${colors.b700};
  background-color: ${colors.b100};
`

const TabButton = styled('span')`
  ${baseTabStyles};
  ${p => p.selected ? `${selectedTabStyles}` : null};
`

// const TabContainer

export default TabButton
