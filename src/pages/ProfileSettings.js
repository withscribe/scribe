import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { clone, getSnapshot, applySnapshot } from 'mobx-state-tree'
import { Flex, Box } from 'grid-styled/emotion'

import Input, { Label } from '_system/Input'
import { Button } from '_system/Button'
import { ProfileSettingsHeader, ProfileWrapper } from 'Styled/ProfileSettings.js'

@inject('userStore', 'profileStore')
@observer
class Choose extends React.Component {
  state = {
    dataclone: null,
    changes: null,
  }

  componentDidMount() {
    const { userStore } = this.props

    userStore.refreshMeById(userStore.me.account_id)
    this.setState({ dataclone: clone(userStore) })
  }

  saveChanges = () => {
    const { userStore } = this.props
    const { dataclone } = this.state

    if (userStore.saveProfileChanges()) {
      applySnapshot(userStore, getSnapshot(dataclone))
    }
  }

  render() {
    const { userStore } = this.props
    const { dataclone } = this.state
    return (
      <>
        {dataclone && (
          <ProfileWrapper>
            <ProfileSettingsHeader>Profile Settings</ProfileSettingsHeader>
            <Flex>
              <Box width={0.7 / 2} pr="2em">
                <Label>First Name</Label>
                <Input
                  type="text"
                  value={dataclone.me.firstName}
                  onChange={e => dataclone.changefirstName(e.target.value)} />
              </Box>
              <Box width={0.7 / 2}>
                <Label>Last Name</Label>
                <Input
                  type="text"
                  value={dataclone.me.lastName}
                  onChange={e => dataclone.changelastName(e.target.value)} />
              </Box>
            </Flex>
            <Box width={1 / 2}>
              <Label>Email</Label>
              <Input
                // placeholder={me.email}
                type="text"
                value={dataclone.me.email}
                onChange={e => dataclone.changeEmail(e.target.value)} />
            </Box>
            <Box width={1 / 2}>
              <Label>Username</Label>
              <Input
                // placeholder={me.userName}
                type="text"
                value={dataclone.me.userName}
                onChange={e => dataclone.changeuserName(e.target.value)} />
            </Box>
            <h3>id: {userStore.me.id}</h3>
            <h3>account_id: {userStore.me.account_id}</h3>
            <h3>occupation: {userStore.me.occupation}</h3>
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
