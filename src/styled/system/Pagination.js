import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { colors, transitions } from 'System/Theme'

const baseHoverStyles = css`
  background-color: ${colors.n200};
`

const selectedHoverStyles = css`
  background-color: ${colors.b300};
`

const basePaginationStyles = css`
  display: inline-flex;
  font-weight: 300;
  padding: 0.7em;
  margin: 0.35em;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${colors.black};
  cursor: pointer;
  transition: ${transitions.default};
`

const selectedPageStyles = css`
  color: ${colors.b300};
  background-color: ${colors.b200};
  font-family: Theinhardt-Bold;
`

const PageButton = styled.a`
  ${basePaginationStyles};
  ${p => p.selected ? css`${selectedPageStyles}` : null};

  :hover {
    ${p => p.selected ? null : css`${baseHoverStyles}`};
  }
`


const basePageListStyles = css`
  display: flex;
  flex-direction: row;
  background-color: ${colors.background.tint2};
  border-radius: 4px;
  width: 100%;
  margin-top: 0;
  list-style: none;
  user-select: none;
  padding: 0;
  justify-content: center;
`

const TabList = styled.ul`
  ${basePageListStyles};
`

const TabContainer = styled.nav`
  width: 100%;
`

export default PageButton

export {
  TabList,
  TabContainer,
}
