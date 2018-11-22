import styled, { css } from 'react-emotion'

import { colors } from '_system/Theme'

const defaultStyles = css`
  display: inline-block;
  padding: 0.25em 0.8em 0.25em 0.8em;
  border-radius: 2px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.8rem;
  background-color: ${colors.b200};
  font-family: Theinhardt-Bold;
  color: ${colors.white};
`

const Badge = styled('span')`
  ${defaultStyles};
`

export default Badge
