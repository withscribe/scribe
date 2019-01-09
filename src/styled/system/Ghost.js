import React from 'react'
import styled from '@emotion/styled'

import { colors } from 'System/Theme'

const GhostSmall = styled('div')`
  height: 38px;
  padding: 0.5em 1em;
  background-color: hsla(0, 0%, 100%, .2);
  width: 150px;
  border-radius: 3px;
`

const GhostCard = styled('div')`
  height: 15vh;
  width: 100%;
  background-color: ${colors.n200};
  border-radius: 2px;
`

const GhostWrapper = ({ isDoneRendering, children, ...props }) => (
  <>
    {isDoneRendering
    && <>
        { children }
      </>
    }
  </>
)

export {
  GhostWrapper,
  GhostSmall,
  GhostCard,
}
