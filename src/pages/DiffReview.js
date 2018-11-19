import React from 'react'
import { inject, observer } from 'mobx-react'
import ReactDiffViewer from 'react-diff-viewer'

import { ButtonPrimary } from '_system/Button'

@inject('userStore', 'storyStore', 'contributionsStore')
@observer
class DiffReview extends React.Component {
  state = {}

  componentDidMount() {
    const { contributionsStore } = this.props
    const contributionId = this.props.match.params.id
    contributionsStore.getContribution(contributionId)
  }

  approveChanges = (contributionId) => {
    const { contributionsStore } = this.props
    contributionsStore.approveContribution(contributionId)
    this.props.history.push(`/profile`)
  }

  rejectChanges = (contributionId) => {
    const { contributionsStore } = this.props
    contributionsStore.rejectContribution(contributionId)
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
