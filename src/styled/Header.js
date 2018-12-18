import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import { ScribeLogo } from '../assets/ScribeLogo.svg'
import { colors } from '_system/Theme'

const HeaderWrapper = styled.header`
  display: flex;
  flex-align: center;
  justify-content: space-between;
  background: ${colors.white};
  color: ${colors.n300};
  position: relative;
  width: 100vw;
  justify-content: center;
  box-shadow: 0px -3px 20px 4px #efefef;
  /* border-bottom: 1px solid #dad8de; */ // twitch border color
  border-bottom: 1px solid ${colors.border.default};
`

const HeaderContainer = styled.nav`
  width: 95vw;
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
  color: ${colors.n300};
  font-size: 1.25rem;
`

const HeaderBar = styled.div`
  /* width: 80vw; */
  height: 1px;
  background: ${colors.white};
  position: absolute;
  bottom: 2rem;
`

const HeaderLogo = styled('img')`
  height: 45px;
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
