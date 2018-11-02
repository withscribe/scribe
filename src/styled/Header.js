import styled from 'react-emotion'
import { Link } from 'react-router-dom'

import { colors } from '_system/Theme'

const HeaderWrapper = styled.header`
  display: flex;
  flex-align: center;
  justify-content: space-between;
  /* background: ${colors.g500}; */
  background: ${colors.white};
  color: ${colors.g300};
  position: relative;
  width: 100vw;
  justify-content: center;
  box-shadow: 0px -3px 20px 4px #efefef;
`

const HeaderContainer = styled.nav`
  width: 70em;
`

const NavList = styled.ul`
  display: flex;
  height: 60px;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
`

const NavItem = styled.li`
  display: inline-block;
  flex: 0 0 auto;
  position: relative;
  margin-left: 1em;
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
  color: ${colors.g300};
  font-size: 1.25rem;
`

const HeaderBar = styled.div`
  /* width: 80vw; */
  height: 1px;
  background: ${colors.white};
  position: absolute;
  bottom: 2rem;
`

const HeaderLogo = styled.span`
  font-size: 1.25rem;
  color: ${colors.g500};
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
