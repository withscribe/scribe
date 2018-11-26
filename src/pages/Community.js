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
      console.log(communityStore)
      if (communityStore.community.members.filter(c => c.userName === userStore.me.userName)) {
        this.setState({ isMember: true })
      }
    })
  }

  joinCommunity = () => {
    const { isMember } = this.state
    const { userStore, userStore: { me }, communityStore: { community } } = this.props
    if (isMember) {
      userStore.leaveCommunity(me.id, community.id)
      return
    }
    userStore.joinCommunity(me.id, community.id)
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
            <div>
              <span>{communityStore.memberCount} members</span>
              <span>{communityStore.storyCount} stories</span>
            </div>
            <CommunitySeperator>
              <CommunityStorySection width={3 / 4}>
                <HomeGrid>
                  {community.stories.map(story => (
                    <StoryCard history={history} story={story} key={story.id} />
                  ))}
                </HomeGrid>
              </CommunityStorySection>
              <CommunityInfoSection width={1 / 4}>
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
