import styled from 'react-emotion'

import { colors, typography, transitions } from '_system/Theme'

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
    ? `background-color: ${colors.g100};`
    : null
  };

  &:not(:last-of-type) {
    margin-right: .5em;
  }

  &:active {
    background-color: ${colors.g200};
  }

  &:hover {
    background-color: ${colors.g100};
  }
`

export default Toolbar

export {
  ToolbarButton,
}
