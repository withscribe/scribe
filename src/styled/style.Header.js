import React from 'react'
import styled from 'react-emotion'

const HeaderWrapper = styled.header`
  /* padding: 2vh 10vw 2vh 10vw; */
  padding: 0 1vw 0 1vw;
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
  margin-right: ${props => props.spaceRight ? 'auto' : null}
`

const HeaderBar = styled.div`
  width: 80vw;
  height: 1px;
  background: #FFF;
  position: absolute;
  bottom: 2rem;
`

const HeaderLogo = styled.h1`
  font-size: 2rem;
  color: #fff;
  text-decoration: none;
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
  HeaderBar,
  HeaderLogo,
  HeaderUsername,
}
