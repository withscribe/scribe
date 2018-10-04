import React from 'react'
import { inject, observer } from 'mobx-react'

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
      <ChoiceWrapper flexWrap="wrap">
        <ChoiceBox width={[1, 1 / 2]}>
          <ChoiceLink to="/editor/create">WRITE YOUR OWN</ChoiceLink>
        </ChoiceBox>
        <ChoiceBox width={[1, 1 / 2]}>
          <ChoiceLink to="/home">LIBRARY</ChoiceLink>
        </ChoiceBox>
      </ChoiceWrapper>
    )
  }
}

export default Choose
