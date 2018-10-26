import React from 'react'
import { inject, observer } from 'mobx-react'
import Diff from 'react-stylable-diff';

import Input, {
    Label
} from '_system/Input'

@inject('userStore', 'storyStore', 'contributionsStore')
@observer
class DiffReview extends React.Component {
  state = {}

  componentDidMount() {
    const { contributionsStore, userStore } = this.props
    contributionsStore.getContributionRequests(userStore.me.id)
  }

  render() {
    const { contributionsStore, userStore } = this.props
    return (
      <>
        <Diff inputA="worst" inputB="blurst" />
      </>
    )
  }
}

export default DiffReview