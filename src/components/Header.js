import React from 'react'
import { Link } from 'react-router-dom'

import {
  HeaderWrapper,
  HeaderBar,
  HeaderLogo,
  HeaderUsername,
} from 'Styled/style.Header'

const Header = () => (
  <HeaderWrapper>
    <Link to="/">
      <HeaderLogo>Unravel</HeaderLogo>
    </Link>
    <Link to="/start">
      <HeaderLogo>start</HeaderLogo>
    </Link>
    <HeaderUsername>Evan</HeaderUsername>
    <HeaderBar />
  </HeaderWrapper>
)

export default Header
