import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import Container from '_system/Container'
import { ChoiceBox, ChoiceWrapper, ChoiceLink } from 'Styled/style.Choose'

@inject('userStore')
@observer
class Choose extends React.Component {
  state = {
    loaded: false,
  }

  componentDidMount() {
    const { userStore } = this.props
    userStore.refreshMeById(userStore.me.account_id)
  }

  render() {
    const { userStore: { me } } = this.props
    return (
      <>
        <span>User Info Dump</span>
        <h3>username: {me.userName}</h3>
        <h3>email: {me.email}</h3>
        <h3>id: {me.id}</h3>
        <h3>account_id: {me.account_id}</h3>
        <h3>last name: {me.lastName}</h3>
        <h3>first name: {me.firstName}</h3>
        <h3>occupation: {me.occupation}</h3>
      </>
    )
  }
}

export default Choose
