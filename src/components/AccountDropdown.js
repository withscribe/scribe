import React from 'react'
import { inject, observer } from 'mobx-react'
import { Transition } from 'react-spring'

import AvatarBox from '_system/Avatar'
import {
  DropdownWrapper, DropdownMenu, DropdownContext, DropdownLast,
  DropdownItems, DropdownItem, ContextDetail,
} from 'Styled/style.AccountDropdown'


const DropdownArrow = ({ flipped }) => (
  <figure style={{ margin: '0 0 0 1em', display: 'inline-flex', color: 'rgb(218, 216, 222)' }}>
    <svg
      style={{ fill: '#fff' }}
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

@inject('userStore')
@observer
class HeaderDropdown extends React.Component {
  state = {
    showMenu: false,
  }

  // TODO: Make this into a util instead of a class property
  getInitials = (fallback = '?') => {
    // TODO: Get this from userStore.me
    // or send down as a prop from the Header component...
    // this doesnt really need to be state aware
    const name = 'Evan Kysley'
    if (!name || typeof name != 'string') return fallback
    return name
      .replace(/\s+/, ' ')
      .split(' ')
      .slice(0, 2)
      .map(v => v && v[0].toUpperCase())
      .join('')
  }

  hashCode = (s) => {
    const str = String(s)
    let hash = 0
    let char
    if (str.trim().length === 0) return hash
    for (let i = 0; i < str.length; i++) {
      char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash &= hash
    }
    return Math.abs(hash)
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

  render() {
    const { showMenu } = this.state
    console.log(showMenu)
    const { logout, userStore: { me } } = this.props
    const initials = this.getInitials()
    return (
      <>
      <DropdownWrapper
        onClick={this.openMenu}>
        <AvatarBox>
          <span>{ initials }</span>
        </AvatarBox>
        Evan Kysley
        <DropdownArrow />
      </DropdownWrapper>
        {/* { showMenu && ( */}
          <Transition from={{ height: 0 }} enter={{ height: 'auto' }} leave={{ height: 0 }}>
            { showMenu && (styles =>
          <DropdownMenu style={styles}>
            <DropdownItems>
              <DropdownContext>
                {/* <AvatarBox size={24}>{ initials }</AvatarBox> */}
                <span>
                  <ContextDetail>{me.email}</ContextDetail>
                  <ContextDetail>{me.id}</ContextDetail>
                </span>
              </DropdownContext>
              <DropdownLast>
                <DropdownItem>Create a Story</DropdownItem>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem>Account</DropdownItem>
                <DropdownItem onClick={logout}>Logout</DropdownItem>
              </DropdownLast>
            </DropdownItems>
          </DropdownMenu>
          )}
          </Transition>
        {/* )} */}
      </>
    )
  }
}

export default HeaderDropdown
