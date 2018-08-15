import React from 'react'
import { inject, observer } from 'mobx-react'

import AvatarBox from '_system/Avatar'
import {
  DropdownMenu, DropdownContext, DropdownLast,
  DropdownItems, DropdownItem, ContextDetail,
} from 'Styled/style.AccountDropdown'

@inject('userStore')
@observer
class Dropdown extends React.Component {
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
    const { userStore: { me } } = this.props
    const initials = this.getInitials()
    return (
      <>
        <AvatarBox
          onClick={this.openMenu}>
          <span>{ initials }</span>
        </AvatarBox>
        { showMenu && (
          <DropdownMenu>
            <DropdownItems>
              <DropdownContext>
                <AvatarBox inline size={24}>{ initials }</AvatarBox>
                <span>
                <ContextDetail>{me.email}</ContextDetail>
                <ContextDetail>{me.id}</ContextDetail>
                </span>
              </DropdownContext>
              <DropdownLast>
                <DropdownItem>Create a Story</DropdownItem>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem>Account</DropdownItem>
                <DropdownItem>Logout</DropdownItem>
              </DropdownLast>
            </DropdownItems>
          </DropdownMenu>
        )}
      </>
    )
  }
}

export default Dropdown
