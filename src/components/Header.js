import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import HeaderDropdown from 'Components/HeaderDropdown'
import { Button } from '_system/Button'
import { GhostWrapper, GhostSmall } from '_system/Ghost'
import {
  HeaderWrapper,
  HeaderContainer,
  NavList,
  NavItem,
  NavLink,
  HeaderBar,
  HeaderLogo,
  HeaderUsername,
} from 'Styled/Header'

@inject('userStore')
@observer
class Header extends React.Component {
  render() {
    const { userStore: { me, pullingLoginData } } = this.props
    return (
      <HeaderWrapper>
        <HeaderContainer>
          <NavList>
            <NavItem>
              <Link to="/">
                <HeaderLogo>Unravl</HeaderLogo>
              </Link>
            </NavItem>
            <NavItem>
              <NavLink to="/start">
                Discover
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/start">
                Create
              </NavLink>
            </NavItem>
            <NavItem spaceRight>
              <NavLink to="/start">
                My Stories
              </NavLink>
            </NavItem>
            <GhostWrapper isDoneRendering={pullingLoginData}>
              <GhostSmall />
            </GhostWrapper>
            {!me && !pullingLoginData
            && <>
              <NavItem>
                <Link to="/login">
                  <Button border>
                    Login
                  </Button>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/register">
                  <Button fillWhite>
                    Sign Up
                  </Button>
                </Link>
              </NavItem>
            </>
            }
            {me && !pullingLoginData
             && <HeaderDropdown logout={this.logout} />
            }
            {/* <HeaderBar /> */}
          </NavList>
        </HeaderContainer>
      </HeaderWrapper>
    )
  }
}

Header.propTypes = {
  history: PropTypes.shape({}).isRequired,
}

Header.wrappedComponent.propTypes /* remove-proptypes */ = {
  userStore: PropTypes.object.isRequired,
}

export default withRouter(Header)
