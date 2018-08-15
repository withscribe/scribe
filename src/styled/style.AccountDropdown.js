import styled from 'styled-components'

const DropdownMenu = styled.div`
  min-width: 150px;
  top: 9vh;
  position: absolute;
  border: 1px solid #dfdfdf;
  border-radius: 3px;
  margin: 0;
  line-height: 1rem;
  right: 1vw;
  z-index: 4;
  color: #333;
  background-color: #FFF;
`
const DropdownContext = styled.div`
  max-height: 310px;
  margin: 5px;
  display: inline-flex;
  align-items: center;
`

const DropdownLast = styled.section`
  border-top: 1px solid #dfdfdf;
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
`

const ContextDetail = styled.span`
  display: block;
`

export {
  DropdownMenu,
  DropdownContext,
  DropdownLast,
  DropdownItems,
  DropdownItem,
  ContextDetail,
}
