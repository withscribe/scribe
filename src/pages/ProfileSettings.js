import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import Input, { Label } from '_system/Input'

@inject('userStore', 'profileStore')
@observer
class Choose extends React.Component {
  state = {
    loaded: false,
  }

  componentDidMount() {
    const { userStore, profileStore } = this.props
    userStore.refreshMeById(userStore.me.account_id)
    /**
     * 'data' is the current .me model
     * we can reuse this because the structure is the same
     */
    const { ...data } = userStore.me
    profileStore.importCurrentProfile(data)
  }

  render() {
    const { userStore: { me } } = this.props
    const { profileStore } = this.props
    return (
      <>
        {profileStore.editedProfile && (<>
        <span>User Info Dump</span>
        <Label>Username</Label>
        <Input
          // placeholder={me.userName}
          type="text"
          value={profileStore.editedProfile.userName}
          onChange={e => profileStore.changeuserName(e.target.value)} />
        <Input
          // placeholder={me.email}
          type="text"
          value={profileStore.editedProfile.email}
          onChange={e => profileStore.changeEmail(e.target.value)} />
        <h3>id: {me.id}</h3>
        <h3>account_id: {me.account_id}</h3>
        <h3>last name: {me.lastName}</h3>
        <h3>first name: {me.firstName}</h3>
        <h3>occupation: {me.occupation}</h3>
        </>)}
      </>
    )
  }
}

export default Choose
