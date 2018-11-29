import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import HeaderDropdown from 'Components/HeaderDropdown'
import { Button, ButtonInlay } from '_system/Button'
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
              <Link to="/home">
                <HeaderLogo>Scribe</HeaderLogo>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/home">
                <ButtonInlay>
                  Discover
                </ButtonInlay>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/story/create">
                <ButtonInlay>
                  Create
                </ButtonInlay>
              </Link>
            </NavItem>
            <NavItem spaceRight>
              <Link to="/profile">
                <ButtonInlay>
                  My Library
                </ButtonInlay>
              </Link>
            </NavItem>
            <GhostWrapper isDoneRendering={pullingLoginData}>
              <GhostSmall />
            </GhostWrapper>
            {!me && !pullingLoginData
            && <>
              <NavItem>
                <Link to="/login">
                  <ButtonInlay>
                    Login
                  </ButtonInlay>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/register">
                  <Button appearance="default">
                    Sign Up
                  </Button>
                </Link>
              </NavItem>
            </>
            }
            {me && !pullingLoginData
             && <HeaderDropdown />
            }
            {/* <HeaderBar /> */}
          </NavList>
        </HeaderContainer>
      </HeaderWrapper>
    )
  }
}

Header.propTypes /* remove-proptypes */ = {
  userStore: PropTypes.object.isRequired,
}

export default Header
