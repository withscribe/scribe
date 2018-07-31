import React from 'react'
import { inject, observer } from 'mobx-react'

import Container from '_system/Container'
import { ChoiceBox, ChoiceWrapper, ChoiceLink } from 'Styled/style.Choose'

@inject('user', 'auth')
@observer
class Choose extends React.Component {
  state = {
    chosen: 'yes',
  }

  onRegister = () => {
    const { auth } = this.props
    auth.registerUser()
  }

  onLogin = () => {
    const { auth } = this.props
    auth.loginUser()
  }

  render() {
    const { chosen } = this.state
    const { auth } = this.props

    return (
      <Container>
        <ChoiceWrapper flexWrap="wrap">
          <ChoiceBox width={[1, 1 / 2]}>
            <ChoiceLink to="/asd">

            </ChoiceLink>
          </ChoiceBox>
          <ChoiceBox width={[1, 1 / 2]}>
            <ChoiceLink to="/asg"></ChoiceLink>
          </ChoiceBox>
        </ChoiceWrapper>
        <h1>state: { chosen }</h1>
      </Container>
    )
  }
}

export default Choose
