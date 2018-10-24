import styled, { css } from 'react-emotion'

import { colors } from '_system/Theme'

const defaultStyles = css`
  display: inline-block;
  padding-right: 0.8em;
  padding-left: 0.8em;
  border-radius: 2px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.8rem;
  background-color: ${colors.b100};
  font-family: Theinhardt-Bold;
  color: ${colors.white};
`

const Badge = styled('div')`
  ${defaultStyles};
`

export default Badge
