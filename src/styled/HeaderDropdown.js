import styled from 'react-emotion'

import { colors } from '_system/Theme'

const DropdownWrapper = styled.div`
  width: 274px;
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
  user-select: none;
  /* background-color: ${colors.g100}; */

  &:hover {
    /* background-color: hsla(0, 0% ,100%, .1); */
    background-color: ${colors.g100};
  }

  &:active {
    background-color: hsla(0, 0%, 100%, .2);
  }
`

const DropdownMenu = styled.div`
  max-width: 274px;
  min-width: 274px;
  top: 60px;
  position: absolute;
  margin: 0;
  line-height: 1rem;
  right: 0;
  z-index: 4;
  color: ${colors.g300};
  background-color: ${colors.white};
  user-select: none;
  overflow: hidden;
  /* box-shadow: 0px -3px 20px 4px #efefef; */
  box-shadow: 0 3px 12px rgba(27,31,35,.15)
`

const DropdownContext = styled.div`
  max-width: 274px;
  min-width: 274px;
  padding: 5px;
  display: inline-flex;
  align-items: center;
  background-color: ${colors.g400};
  color: #fff;
`

const DropdownLast = styled.section`
  /* border-top: 1px solid #dfdfdf; */
`

const DropdownItems = styled.ul`
  margin: 0;
  padding: 0;
`

const DropdownItem = styled.li`
  min-width: 210px;
  width: 100%;
  display: block;
  line-height: normal;
  list-style: none;
  padding: 1em;
  cursor: pointer;

  &:hover {
    background-color: ${colors.g100};
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
