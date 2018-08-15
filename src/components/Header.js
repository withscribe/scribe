import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import HeaderDropdown from 'Components/AccountDropdown'

import { ButtonLink, Button } from '_system/Button'
import {
  HeaderWrapper,
  HeaderContainer,
  NavList,
  NavItem,
  HeaderBar,
  HeaderLogo,
  HeaderUsername,
} from 'Styled/style.Header'

@inject('userStore', 'authStore')
@observer
class Header extends React.Component {
  // TODO: rewrite this and the logout system..?
  logout = () => {
    const { userStore, authStore } = this.props
    const success = authStore.logoutUser()
    if (success) {
      userStore.removeMe(success)
      this.props.history.push('/login')
    }
  }

  // TODO: conditionally render... etc
  render() {
    const { userStore: { me } } = this.props
    return (
      <HeaderWrapper>
        <HeaderContainer>
          <NavList>
            <Link to="/">
              <HeaderLogo>Unravel</HeaderLogo>
            </Link>
            <NavItem spaceRight>
              <ButtonLink border to="/start">
                start
              </ButtonLink>
            </NavItem>
            {!me && (
              <NavItem>
                <ButtonLink border to="/login">
                  login
                </ButtonLink>
              </NavItem>
            )}
            {me && (
              <NavItem>
                <Button
                  fillWhite
                  onClick={this.logout}>
                  logout
                </Button>
              </NavItem>
            )}
            <HeaderDropdown />
            <HeaderBar />
          </NavList>
        </HeaderContainer>
      </HeaderWrapper>
    )
  }
}

export default withRouter(Header)
