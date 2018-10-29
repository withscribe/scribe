import styled from 'react-emotion'

import { colors, typography, transitions } from '_system/Theme'

const Toolbar = styled('div')`
  position: relative;
  border-bottom: 2px solid #efefef;
  margin-bottom: .5em;
`

const ToolbarButton = styled('button')`
  border: none;
  font-family: Theinhardt-Bold;
  ${typography.text.medium};
  transition: ${transitions.default};
  border-radius: 4px;
  width: 2em;
  text-align: center;
  cursor: pointer;

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
