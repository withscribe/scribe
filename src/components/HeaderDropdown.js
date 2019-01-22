import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Transition } from 'react-spring'
import { withRouter, Link } from 'react-router-dom'

import AvatarBox from 'System/Avatar'
import { colors } from 'System/Theme'
import {
  DropdownWrapper, DropdownMenu, DropdownContext, DropdownLast,
  DropdownItems, DropdownItem, ContextDetail,
} from 'Styled/HeaderDropdown'


const DropdownArrow = ({ flipped }) => (
  <figure
    style={{
      margin: '0 1em 0 0',
      display: 'inline-flex',
      justifyContent: 'flex-end',
      width: '100%',
    }}>
    <svg
      style={{
        fill: `${colors.n300}`,
        transform: flipped ? 'rotate(180deg)' : 'none',
        transition: 'all .2s ease-in',
      }}
      width="20px"
      height="20px"
      version="1.1"
      viewBox="0 0 20 20"
      x="0px"
      y="0px">
      <path
        d="M 5.054 7.463 A 0.714 0.714 0 0 1 5.714 7 h 8.572 c 0.289 0 0.55 0.183 0.66 0.463 c 0.11 0.28 0.05 0.603 -0.155 0.817 l -4.286 4.5 A 0.696 0.696 0 0 1 10 13 a 0.696 0.696 0 0 1 -0.505 -0.22 L 5.21 8.28 a 0.777 0.777 0 0 1 -0.155 -0.817" />
    </svg>
  </figure>
)

@inject('userStore', 'authStore')
@observer
class HeaderDropdown extends React.Component {
  state = {
    showMenu: false,
    initials: '',
  }

  componentWillMount() {
    const initials = this.getInitials()
    this.setState({ initials })
  }

  // TODO: rewrite this and the logout system..?
  logout = () => {
    const { userStore, authStore } = this.props
    const success = authStore.logoutUser()
    if (success) {
      userStore.removeMe(success)
      this.props.history.push('/login')
    }
  }

  // TODO: Make this into a util instead of a class property
  getInitials = (fallback = '?') => {
    const { userStore } = this.props
    // TODO: Get this from userStore.me
    // or send down as a prop from the Header component...
    // this doesnt really need to be state aware
    const name = userStore.concatenatedName || userStore.me.userName
    if (!name || typeof name !== 'string' || name === null) return fallback
    return name
      .replace(/\s+/, ' ')
      .split(' ')
      .slice(0, 2)
      .map(v => v && v[0].toUpperCase())
      .join('')
  }

  openMenu = (event) => {
    event.preventDefault()
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu)
    })
  }

  closeMenu = () => {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu)
    })
  }

  hoverMenu = () => {
    this.setState(prevState => ({
      showMenu: !prevState.showMenu,
    }))
  }

  hoverMenuLeage = () => {
    this.setState({ showMenu: false })
  }

  render() {
    const { showMenu } = this.state
    const { userStore, userStore: { me } } = this.props
    const { initials } = this.state
    return (
      <>
        <DropdownWrapper
          onPointerEnter={this.hoverMenu}
          onPointerLeave={this.hoverMenuLeage}>
          <AvatarBox>
            <span>{ initials }</span>
          </AvatarBox>
          {me.firstName && me.lastName
            ? `${userStore.concatenatedName}`
            : `${userStore.me.userName}`
          }
          <DropdownArrow flipped={showMenu} />
        </DropdownWrapper>
        <DropdownMenu>
          <DropdownItems>
            <DropdownContext>
              <span>
                <ContextDetail>{me.userName}</ContextDetail>
                <ContextDetail>{me.email}</ContextDetail>
              </span>
            </DropdownContext>
            <DropdownLast>
              <Link to="/profile/contributions">
                <DropdownItem>
                  Contributions
                </DropdownItem>
              </Link>
              <Link to="/profile">
                <DropdownItem>
                  Profile
                </DropdownItem>
              </Link>
              <Link to="/profile/settings">
                <DropdownItem>
                  Settings
                </DropdownItem>
              </Link>
              <DropdownItem onClick={this.logout}>Logout</DropdownItem>
            </DropdownLast>
          </DropdownItems>
        </DropdownMenu>
      </>
    )
  }
}

HeaderDropdown.wrappedComponent.propTypes /* remove-proptypes */ = {
  userStore: PropTypes.object.isRequired,
  authStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

HeaderDropdown.propTypes = {
  history: PropTypes.shape({}).isRequired,
}

export default withRouter(HeaderDropdown)
