import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'

import ContributionCard from 'Components/ContributionCard'
import { HomeGrid } from '_system/Grid'
import Hero, { HeroPrimaryText, HeroSpanText } from '_system/Hero'
import { ContributionWrapper } from 'Styled/Contributions'

@inject('userStore', 'storyStore', 'contributionsStore')
@observer
class Contributions extends React.Component {
  state = {}

  componentDidMount() {
    const { contributionsStore, userStore, storyStore } = this.props
    contributionsStore.getContributionRequests(userStore.me.id)
    storyStore.getAllStories()
  }

  render() {
    const { contributionsStore, storyStore, history } = this.props
    return (
      <ContributionWrapper>
        {!contributionsStore.isLoadingContributions && !storyStore.fetchingStories
        && (contributionsStore.contributions.length >= 1 ? (
          <>
            <Hero appearance="green">
              <HeroPrimaryText>Contribution Requests</HeroPrimaryText>
              <HeroSpanText>Contributions people would like to make to your stories!</HeroSpanText>
            </Hero>
            <HomeGrid>
              {contributionsStore.contributions.map(contribution => (
                <ContributionCard
                  contribution={contribution}
                  story={storyStore.stories.find(s => s.id === contribution.originalStoryId)}
                  key={contribution.id}
                  history={history} />
              ))}
            </HomeGrid>
          </>) : '*crickets*')
        }
      </ContributionWrapper>
    )
  }
}

Contributions.propTypes = {
  history: PropTypes.object.isRequired,
  contributionsStore: PropTypes.object.isRequired,
  userStore: PropTypes.object.isRequired,
  storyStore: PropTypes.object.isRequired,
}

export default Contributions
