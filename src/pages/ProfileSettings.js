import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Flex, Box } from 'grid-styled/emotion'

import Input, { Label } from '_system/Input'
import { Button } from '_system/Button'
import { ProfileSettingsHeader, ProfileWrapper } from 'Styled/ProfileSettings.js'

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

  saveChanges = () => {
    const { profileStore } = this.props
    profileStore.saveProfileChanges()
  }

  render() {
    const { userStore: { me } } = this.props
    const { profileStore } = this.props
    return (
      <>
        {profileStore.editedProfile && (
          <ProfileWrapper>
            <ProfileSettingsHeader>Profile Settings</ProfileSettingsHeader>
            <Flex>
              <Box width={0.7 / 2} pr="2em">
                <Label>First Name</Label>
                <Input
                  type="text"
                  value={profileStore.editedProfile.firstName}
                  onChange={e => profileStore.changeLastName(e.target.value)} />
              </Box>
              <Box width={0.7 / 2}>
                <Label>Last Name</Label>
                <Input
                  type="text"
                  value={profileStore.editedProfile.lastName}
                  onChange={e => profileStore.changeLastName(e.target.value)} />
              </Box>
            </Flex>
            <Box width={1 / 2}>
              <Label>Email</Label>
              <Input
                // placeholder={me.email}
                type="text"
                value={profileStore.editedProfile.email}
                onChange={e => profileStore.changeEmail(e.target.value)} />
            </Box>
            <Box width={ 1 / 2}>
              <Label>Username</Label>
              <Input
                // placeholder={me.userName}
                type="text"
                value={profileStore.editedProfile.userName}
                onChange={e => profileStore.changeuserName(e.target.value)} />
            </Box>
            <h3>id: {me.id}</h3>
            <h3>account_id: {me.account_id}</h3>
            <h3>occupation: {me.occupation}</h3>
            <Button
              border
              withHeight
              onClick={this.saveChanges}>Save Changes</Button>
          </ProfileWrapper>
        )}
      </>
    )
  }
}

export default Choose
