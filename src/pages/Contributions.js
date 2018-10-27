import React from 'react'
import { inject, observer } from 'mobx-react'

import { Button } from '_system/Button'
import Input, {
    Label
} from '_system/Input'

@inject('userStore', 'storyStore', 'contributionsStore')
@observer
class Contributions extends React.Component {
  state = {}

  componentDidMount() {
    const { contributionsStore, userStore } = this.props
    contributionsStore.getContributionRequests(userStore.me.id)
  }

  reviewContribution = (contributionId) => {
    this.props.history.push(`/profile/contributions/diff/${contributionId}`)
  }

  render() {
    const { contributionsStore } = this.props
    return (
      <>
        <Label>Your Contribution Requests</Label>
        {contributionsStore.contributions.length > 0 ? (
            <ul>
              {contributionsStore.contributions.map(contribution => (
                <div key={contribution.id}>
                  {contribution.id}
                  <Button onClick={() => {this.reviewContribution(contribution.id)}}>Review</Button>
                </div>
              ))}
            </ul>
          ) : <span>nothing to see here</span>
          }
      </>
    )
  }
}

export default Contributions