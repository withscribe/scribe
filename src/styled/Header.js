import styled from 'react-emotion'
import { Link } from 'react-router-dom'

const HeaderWrapper = styled.header`
  padding: 0 10vw 0 10vw;
  display: flex;
  flex-align: center;
  justify-content: space-between;
  background: rgb(28, 36, 128);
  color: #FFF;
  position: relative;
`

const HeaderContainer = styled.nav`
  width: 100%;
  margin: 0 auto;
`

const NavList = styled.ul`
  display: flex;
  height: 69px;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`

const NavItem = styled.li`
  display: inline-block;
  flex: 0 0 auto;
  position: relative;
  margin-left: 2em;
  margin-right: ${props => props.spaceRight ? 'auto' : null};

  &:hover {
    text-decoration: underline;
  }

  &:first-of-type {
    margin-left: 0;
  }
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 1.25rem;
`

const HeaderBar = styled.div`
  width: 80vw;
  height: 1px;
  background: #FFF;
  position: absolute;
  bottom: 2rem;
`

const HeaderLogo = styled.span`
  font-size: 1.25rem;
  color: #fff;
  text-decoration: none;
  font-family: Theinhardt-Bold;
  font-weight: 300;
  margin: 0;
`

const HeaderUsername = styled.h1`
  font-size: 2rem;
  font-weight: 300;
`

export {
  HeaderWrapper,
  HeaderContainer,
  NavList,
  NavItem,
  NavLink,
  HeaderBar,
  HeaderLogo,
  HeaderUsername,
}
