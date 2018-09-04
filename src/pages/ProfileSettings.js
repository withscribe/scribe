import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import Container from '_system/Container'
import { ChoiceBox, ChoiceWrapper, ChoiceLink } from 'Styled/style.Choose'

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
            <ChoiceLink to="/asd">

            </ChoiceLink>
          </ChoiceBox>
          <ChoiceBox width={[1, 1 / 2]}>
            <ChoiceLink to="/asg"></ChoiceLink>
          </ChoiceBox>
        </ChoiceWrapper>
      </Container>
    )
  }
}

export default Choose
