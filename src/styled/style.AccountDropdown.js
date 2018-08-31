import styled from 'react-emotion'

const DropdownWrapper = styled.div`
  width: 274px;
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 -1vw 0 1em;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: hsla(0, 0% ,100%, .1);
  }
`

const DropdownMenu = styled.div`
  max-width: 274px;
  min-width: 274px;
  top: 69px;
  position: absolute;
  /* border: 1px solid #dfdfdf; */
  border-radius: 0 3px 0 3px;
  margin: 0;
  line-height: 1rem;
  right: 0vw;
  z-index: 4;
  color: #333;
  background-color: #fff;
  user-select: none;
  overflow: hidden;
`

const DropdownContext = styled.div`
  max-width: 274px;
  min-width: 274px;
  padding: 5px;
  display: inline-flex;
  align-items: center;
  background-color: rgb(28,36,128);
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
    background-color: rgb(220,220,220);
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
