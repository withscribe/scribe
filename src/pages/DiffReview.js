import React from 'react'
import { inject, observer } from 'mobx-react'
import ReactDiffViewer from 'react-diff-viewer'

import Button from 'System/Button'
import Hero, { HeroPrimaryText, HeroSpanText } from 'System/Hero'
import { ViewStoryWidthAdapter } from 'Styled/ViewStory'

@inject('contributionsStore')
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
      <ViewStoryWidthAdapter>
        {contribution
          && <>
            <Hero
              appearance="grey">
              <HeroPrimaryText>Contribution Difference Viewer</HeroPrimaryText>
              <HeroSpanText>An overview of the proposed changes.</HeroSpanText>
            </Hero>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2em', width: '100%' }}>
              <Button
                appearance="primary"
                intent="success"
                type="button"
                onClick={() => this.approveChanges(contribution.id)}>
                Approve & Update Story
              </Button>
              <Button
                appearance="default"
                intent="danger"
                type="button"
                onClick={() => this.rejectChanges(contribution.id)}>
                Reject
              </Button>
            </div>
            <ReactDiffViewer
              oldValue={contributionsStore.deserializeContent(contribution.originalContent)}
              newValue={contributionsStore.deserializeContent(contribution.contributionContent)}
              splitView />
          </>
        }
      </ViewStoryWidthAdapter>
    )
  }
}

export default DiffReview
