import React from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import { Button } from '_system/Button'
import Input, {
  Label,
} from '_system/Input'
import { ContributionWrapper } from 'Styled/Contributions'
import { ListCard } from '_system/ListCard'
import { ContributionsGrid } from '_system/Grid'

@inject('userStore', 'storyStore', 'contributionsStore')
@observer
class Contributions extends React.Component {
  state = {}

  componentDidMount() {
    const { contributionsStore, userStore } = this.props
    contributionsStore.getContributionRequests(userStore.me.id)
  }

  render() {
    const { contributionsStore, storyStore } = this.props
    return (
      <ContributionWrapper>
        <Label>Your Contribution Requests</Label>
        {contributionsStore.contributions.length > 0 ? (
          <ContributionsGrid>
            {contributionsStore.contributions.map(contribution => (
              <ListCard key={contribution.id}>
                <Link to={`/profile/contributions/diff/${contribution.id}`}>
                  <div style={{ width: '100%', height: '15vh' }}>
                    {contribution.id}
                  </div>
                </Link>
              </ListCard>
            ))}
          </ContributionsGrid>
        ) : <span>Nothing to see here.</span>
        }
      </ContributionWrapper>
    )
  }
}

export default Contributions
