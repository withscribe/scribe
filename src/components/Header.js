import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import HeaderDropdown from 'Components/HeaderDropdown'
import Button from 'System/Button'
import { GhostWrapper, GhostSmall } from 'System/Ghost'
import {
  HeaderWrapper,
  HeaderContainer,
  HeaderLogo,
  DiscoverTab,
  CreateTab,
  LibraryTab,
  ProfileTab,
  LoginTab,
  SignupTab,
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
          <Link to="/home">
            <HeaderLogo src={ScribeLogo} />
          </Link>
          <DiscoverTab to="/home">
            <Button
              appearance="minimal">
                Discover
            </Button>
          </DiscoverTab>
          <CreateTab to="/story/create">
            <Button
              appearance="minimal">
                Create
            </Button>
          </CreateTab>
          <LibraryTab to="/profile">
            <Button appearance="minimal">
              My Library
            </Button>
          </LibraryTab>
          <GhostWrapper isDoneRendering={pullingLoginData}>
            <GhostSmall />
          </GhostWrapper>
          {!me && !pullingLoginData
          && <>
            <LoginTab to="/login">
              <Button appearance="link">
                Login
              </Button>
            </LoginTab>
            <SignupTab to="/register">
              <Button appearance="default" intent="none">
                Sign Up
              </Button>
            </SignupTab>
          </>
          }
          {me && !pullingLoginData
          && <>
            <ProfileTab>
              <HeaderDropdown />
            </ProfileTab>
            </>
          }
        </HeaderContainer>
      </HeaderWrapper>
    )
  }
}

Header.propTypes /* remove-proptypes */ = {
  userStore: PropTypes.object.isRequired,
}

export default Header
