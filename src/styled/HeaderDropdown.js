import styled from '@emotion/styled'

import { colors } from '_system/Theme'

const DropdownMenu = styled.div`
  max-width: 225px;
  min-width: 225px;
  top: 100%;
  position: absolute;
  right: 1.5em;
  padding: 8px;
  z-index: 4;
  color: ${colors.intent.danger};
  background-color: transparent;
  user-select: none;
  display: none;

  & :hover {
    display: block;
  }
`

const DropdownWrapper = styled.div`
  width: 225px;
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
  user-select: none;
  color: ${colors.n300};

  &:hover {
    background-color: ${colors.b200};
    & ~ ${DropdownMenu} {
      display: block;
    }
  }

  &:active {
    background-color: hsla(0, 0%, 100%, .2);
  }
`

const DropdownContext = styled.div`
  width: 100%;
  padding: 5px;
  display: inline-flex;
  align-items: center;
  background-color: ${colors.b300};
  color: ${colors.white};
`

const DropdownLast = styled.section`
  /* border-top: 1px solid #dfdfdf; */
`

const DropdownItems = styled.ul`
  margin: 0;
  padding: 0;
  box-shadow: rgba(22, 23, 26, 0.15) 0px 8px 16px;
  overflow: hidden;
  border: 1px solid ${colors.border.default};
  border-top: none;
  border-radius: 8px;
`

const DropdownItem = styled.li`
  width: 100%;
  display: block;
  line-height: normal;
  list-style: none;
  padding: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.background.tint2};
  }
`

const ContextDetail = styled.span`
  display: block;
`

export {
  DropdownWrapper,
  DropdownMenu,
  DropdownContext,
  DropdownLast,
  DropdownItems,
  DropdownItem,
  ContextDetail,
}
