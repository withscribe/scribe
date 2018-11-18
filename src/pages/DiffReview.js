import React, { PureComponent } from 'react'
import { inject, observer } from 'mobx-react'
import ReactDiffViewer from 'react-diff-viewer'

import { ButtonPrimary } from '_system/Button'

@inject('userStore', 'storyStore', 'contributionsStore', 'toastStore')
@observer
class DiffReview extends PureComponent {
  state = {}

  componentDidMount() {
    const { contributionsStore } = this.props
    const contributionId = this.props.match.params.id
    contributionsStore.getContribution(contributionId)
  }

  approveChanges = (contributionId) => {
    const { contributionsStore, toastStore } = this.props
    contributionsStore.approveContribution(contributionId)
    toastStore.addToast({
      id: '' + Math.random() + '',
      message: 'Contribution has been approved successfully',
      display: true,
    })
    this.props.history.push(`/profile`)
  }

  rejectChanges = (contributionId) => {
    const { contributionsStore, toastStore } = this.props
    contributionsStore.rejectContribution(contributionId)
    toastStore.addToast({
      id: '' + Math.random() + '',
      message: 'Contribution has been rejected successfully',
      display: true,
    })
    this.props.history.push(`/profile`)
  }

  render() {
    const { contributionsStore: { contribution }, contributionsStore } = this.props
    return (
      <>
        {contribution
          && <>
            <ReactDiffViewer
              oldValue={contributionsStore.deserializeContent(contribution.originalContent)}
              newValue={contributionsStore.deserializeContent(contribution.contributionContent)}
              splitView={true}
            />
            <ButtonPrimary type="button" onClick={() => this.approveChanges(contribution.id)}>Approve & Update Story</ButtonPrimary>
            <ButtonPrimary type="button" onClick={() => this.rejectChanges(contribution.id)}>Reject</ButtonPrimary>
        </>
        }
      </>
    )
  }
}

export default DiffReview
