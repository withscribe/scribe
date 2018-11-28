import React from 'react'
import { inject, observer } from 'mobx-react'

import { Button } from '_system/Button'
import Hero, { HeroPrimaryText, HeroSpanText } from '_system/Hero'
import { HomeGrid } from '_system/Grid'
import StoryCard from 'Components/StoryCard'
import {
  CommunityWidthAdapter, CommunitySeperator,
  CommunityStorySection,
  CommunityInfoSection,
  CommunityInfoHeader,
} from 'Styled/Community'

@inject('communityStore', 'userStore')
@observer
class Community extends React.Component {
  state = {
    isMember: false,
    canJoin: true,
  }

  componentDidMount() {
    const { userStore, communityStore, match: { params: { name } } } = this.props
    communityStore.getCommunity(name).then(() => {
      if (communityStore.community.members.filter(c => c.userName === userStore.me.userName).length >= 1) {
        this.setState({ isMember: true })
      }
    })
  }

  joinCommunity = () => {
    const { isMember } = this.state
    const { userStore, userStore: { me }, communityStore: { community } } = this.props
    if (isMember) {
      userStore.leaveCommunity(me.id, community.id)
      this.setState({ isMember: false })
      return
    }
    userStore.joinCommunity(me.id, community.id)
    this.setState({ isMember: true })
  }

  render() {
    const { isMember } = this.state
    const { history, communityStore, communityStore: { community } } = this.props
    return (
      <CommunityWidthAdapter>
        {!communityStore.fetchingCommunity && community
          && <>
            <Hero appearance="grey">
              <HeroPrimaryText>{community.name}</HeroPrimaryText>
              <HeroSpanText>{community.description}</HeroSpanText>
            </Hero>
            <CommunitySeperator>
              <CommunityStorySection width={3 / 4}>
                <HomeGrid>
                  {community.stories.map(story => (
                    <StoryCard history={history} story={story} key={story.id} />
                  ))}
                </HomeGrid>
              </CommunityStorySection>
              <CommunityInfoSection width={1 / 4}>
                <CommunityInfoHeader>
                  Community Details
                </CommunityInfoHeader>
                <p><b>{communityStore.memberCount}</b> member(s)</p>
                <p><b>{communityStore.storyCount}</b> storie(s)</p>
                <Button
                  appearance="primary"
                  onClick={this.joinCommunity}>
                  {isMember
                    ? 'Leave Community'
                    : 'Join Community'
                  }
                </Button>
              </CommunityInfoSection>
            </CommunitySeperator>
          </>
        }
      </CommunityWidthAdapter>
    )
  }
}

export default Community
