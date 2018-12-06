import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import HeaderDropdown from 'Components/HeaderDropdown'
import Button from '_system/Button'
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

import ScribeLogo from '../assets/ScribeLogo.svg'

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
                <HeaderLogo src={ScribeLogo} />
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/home">
                <Button appearance="minimal">
                  Discover
                </Button>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/story/create">
                <Button appearance="minimal">
                  Create
                </Button>
              </Link>
            </NavItem>
            <NavItem spaceRight>
              <Link to="/profile">
                <Button appearance="minimal">
                  My Library
                </Button>
              </Link>
            </NavItem>
            <GhostWrapper isDoneRendering={pullingLoginData}>
              <GhostSmall />
            </GhostWrapper>
            {!me && !pullingLoginData
            && <>
              <NavItem>
                <Link to="/login">
                  <Button appearance="minimal" intent="none">
                    Login
                  </Button>
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
