import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { clone, getSnapshot, applySnapshot } from 'mobx-state-tree'
import { Flex, Box } from 'grid-styled/emotion'

import Input, { Label, LabelTip, LabelConstraint } from '_system/Input'
import { Button } from '_system/Button'
import { ProfileWrapper } from 'Styled/Profile'
import Hero, { HeroPrimaryText, HeroSpanText } from '_system/Hero'

@inject('userStore')
@observer
class Choose extends React.Component {
  state = {
    dataclone: null,
  }

  componentDidMount() {
    const { userStore } = this.props

    userStore.refreshMeById(userStore.me.account_id)
    this.setState({ dataclone: clone(userStore) })
  }

  saveChanges = () => {
    const { userStore } = this.props
    const { dataclone } = this.state

    /*
      We want to make sure that no error is thrown before we apply
      the snapshot to the userStore
    */
    if (dataclone.saveProfileChanges()) {
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
            <Hero
              appearance="black">
              <HeroPrimaryText>Profile Info</HeroPrimaryText>
              <HeroSpanText>Change your Profile Info</HeroSpanText>
            </Hero>
            <Flex width={1}>
              <Box width={0.7 / 2} pr="2em">
                <Label>First Name <LabelTip>optional</LabelTip></Label>
                <Input
                  optional
                  placeholder="First Name"
                  type="text"
                  value={dataclone.me.firstName}
                  onChange={e => dataclone.changefirstName(e.target.value)} />
              </Box>
              <Box width={0.7 / 2}>
                <Label>Last Name <LabelTip>optional</LabelTip></Label>
                <Input
                  optional
                  placeholder="Last Name"
                  type="text"
                  value={dataclone.me.lastName}
                  onChange={e => dataclone.changelastName(e.target.value)} />
              </Box>
            </Flex>
            <Box width={1 / 2}>
              <Label>Email <LabelConstraint>required</LabelConstraint></Label>
              <Input
                type="email"
                value={dataclone.me.email}
                onChange={e => dataclone.changeEmail(e.target.value)} />
            </Box>
            <Box width={1 / 2}>
              <Label>Username <LabelConstraint>required</LabelConstraint></Label>
              <Input
                type="text"
                value={dataclone.me.userName}
                onChange={e => dataclone.changeuserName(e.target.value)} />
            </Box>
            <div>
              <Button
                appearance="minimal"
                intent="success"
                onClick={this.saveChanges}>
                Save Changes
              </Button>
              <Button
                appearance="default"
                intent="danger"
                onClick={this.discardChanges}>
                Cancel
              </Button>
            </div>
          </ProfileWrapper>
        )}
      </>
    )
  }
}

export default Choose
