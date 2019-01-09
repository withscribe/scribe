import styled from '@emotion/styled'

import { colors, typography, transitions } from 'system/Theme'

const Toolbar = styled('div')`
  position: relative;
  margin: 1em 1.5em 1em 0;
`

const ToolbarButton = styled('button')`
  border: none;
  font-family: Theinhardt-Bold;
  ${typography.text.medium};
  transition: ${transitions.default};
  border-radius: 4px;
  width: 2em;
  height: 2em;
  text-align: center;
  cursor: pointer;
  ${p => p.active
    ? `background-color: ${colors.n200};`
    : null
  };

  &:not(:last-of-type) {
    margin-right: .5em;
  }

  &:active {
    background-color: ${colors.n200};
  }

  &:hover {
    background-color: ${colors.n100};
  }
`

export default Toolbar

export {
  ToolbarButton,
}
