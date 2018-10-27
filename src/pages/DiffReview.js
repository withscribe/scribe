import React from 'react'
import { inject, observer, } from 'mobx-react'
import Diff from 'react-stylable-diff';

import Input, {
    Label
} from '_system/Input'
import { ButtonPrimary } from '_system/Button'


@inject('userStore', 'storyStore', 'contributionsStore')
@observer
class DiffReview extends React.Component {
  state = {}

  componentDidMount() {
    const { contributionsStore, userStore, storyStore } = this.props
    const contributionId = this.props.match.params.id
    contributionsStore.getContribution(contributionId)
  }

  approveChanges(contributionId) {
    const { contributionsStore } = this.props
    contributionsStore.approveContribution(contributionId)
  }

  rejectChanges(contributionId) {
    const { contributionsStore } = this.props
    contributionsStore.rejectContribution(contributionId)
  }

  render() {
    const { contributionsStore: { contribution } } = this.props
    console.log(contribution)
    return (
      <>
      {contribution &&
        <>
          <Diff inputA={contribution.originalContent} inputB={contribution.contributionContent} />
          <ButtonPrimary type="button" onClick={this.approveChanges(contribution.id)}>Approve & Update Story</ButtonPrimary>
          <ButtonPrimary type="button" onClick={this.rejectChanges(contribution.id)}>Reject</ButtonPrimary>
        </>
      }
      </>
    )
  }
}

export default DiffReview