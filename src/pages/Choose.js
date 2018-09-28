import React from 'react'
import { inject, observer } from 'mobx-react'

import Container from '_system/Container'
import { ChoiceBox, ChoiceWrapper, ChoiceLink } from 'Styled/Choose'

@inject('userStore', 'authStore')
@observer
class Choose extends React.Component {
  state = {
    chosen: 'yes',
  }

  render() {
    const { chosen } = this.state
    const { authStore } = this.props

    return (
      <Container>
        <ChoiceWrapper flexWrap="wrap">
          <ChoiceBox width={[1, 1 / 2]}>
            <ChoiceLink to="/editor" />
          </ChoiceBox>
          <ChoiceBox width={[1, 1 / 2]}>
            <ChoiceLink to="/home" />
          </ChoiceBox>
        </ChoiceWrapper>
      </Container>
    )
  }
}

export default Choose
