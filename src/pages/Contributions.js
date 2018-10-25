import React from 'react'
import { inject, observer } from 'mobx-react'

import Input, {
    Label
} from '_system/Input'

@inject('userStore', 'storyStore', 'contributionsStore')
@observer
class Contributions extends React.Component {
  state = {}

  componentDidMount() {
    
    
  }

  render() {
    const { contributionsStore } = this.props
    return (
      <>
        <Label>Your Contribution Requests</Label>
        {contributionsStore.contributions.length > 0 ? (
            <ul>
              {contributionsStore.getContributionRequests(userStore.me.id).map(contribution => (
                <div key={contribution.id}>
                  {contribution.content}
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