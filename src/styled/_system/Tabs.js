import styled, { css } from 'react-emotion'

import { colors, transitions } from '_system/Theme'

const baseHoverStyles = css`
  background-color: ${colors.g100};
`

const selectedHoverStyles = css`
  background-color: ${colors.b300};
`

const baseTabStyles = css`
  display: inline-flex;
  font-weight: 300;
  padding: 0.7em;
  margin: 0.7em;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${colors.black};
  cursor: pointer;
  transition: ${transitions.default};
`

const selectedTabStyles = css`
  color: ${colors.b700};
  background-color: ${colors.b100};
`

const TabButton = styled('span')`
  ${baseTabStyles};
  ${p => p.selected ? `${selectedTabStyles}` : null};

  :hover {
    ${p => p.selected ? null : `${baseHoverStyles}`};
  }
`


const baseTabListStyles = css`
  display: flex;
  flex-direction: row;
  background-color: #fbfbfb;
  border-radius: 4px;
  width: 100%;
`

const TabList = styled('div')`
  ${baseTabListStyles};
`

export default TabButton

export {
  TabList,
}
