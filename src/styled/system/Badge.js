import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { colors } from 'system/Theme'

const defaultStyles = css`
  display: block;
  margin-bottom: 0.25em;
  padding: 0.25em 0.8em 0.25em 0.8em;
  border-radius: 2px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.8rem;
  background-color: ${colors.b400};
  font-family: Theinhardt-Bold;
  color: ${colors.white};
`

const Badge = styled('span')`
  ${defaultStyles};
`

export default Badge
