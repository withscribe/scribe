import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import Tab from 'Components/Tabs/Tab'
import StoryCard from 'Components/StoryCard'
import { TabList } from '_system/Tabs'
import { HomeGrid } from '_system/Grid'
import { ButtonPrimary, ButtonSecondary } from '_system/Button'
import { GhostWrapper, GhostSmall } from '_system/Ghost'
import Hero, { HeroPrimaryText, HeroSpanText } from '_system/Hero'

@inject('storyStore', 'communityStore')
@observer
class Home extends React.Component {
  state = {
    selectedIndex: 0,
    tabs: ['Stories', 'Communities'],
  }

  componentDidMount() {
    const { storyStore, communityStore } = this.props
    storyStore.getAllStories()
    communityStore.getAllCommunities()
  }

  render() {
    const { tabs, selectedIndex } = this.state
    const { storyStore, communityStore, history } = this.props
    return (
      <>
        <div
          style={{
            width: '50vw',
            display: 'flex',
            alignSelf: 'center',
            flexDirection: 'column',
          }}>
          <Hero>
            <HeroPrimaryText>Discover</HeroPrimaryText>
            <HeroSpanText>Find Content and Communities on Scribe.</HeroSpanText>
          </Hero>
          <TabList>
            {tabs.map((tab, index) => (
              <Tab
                key={tab}
                id={tab}
                onSelect={() => this.setState({ selectedIndex: index })}
                isSelected={index === selectedIndex}>
                {tab}
              </Tab>
            ))}
          </TabList>
        </div>
        <HomeGrid>
          {!storyStore.fetchingStories && selectedIndex === 0
            ? <>
              <div>
                <h1>New Stories</h1>
              </div>
              {storyStore.nonClonedStories.map(story => (
                /* we pass the history prop down to each card so we avoid a ton of
                  unnecessary working..
                  (not sure if it would even be a performance problem)
                */
                <StoryCard history={history} story={story} key={story.id} />
              ))}
            </>
            : (
              <GhostWrapper isDoneRendering={storyStore.fetchingStories}>
                <HomeGrid>
                  <GhostSmall style={{ backgroundColor: '#efefef' }} />
                  <GhostSmall style={{ backgroundColor: '#efefef' }} />
                  <GhostSmall style={{ backgroundColor: '#efefef' }} />
                  <GhostSmall style={{ backgroundColor: '#efefef' }} />
                </HomeGrid>
              </GhostWrapper>
            )
          }
        </HomeGrid>
        <HomeGrid>
          {!communityStore.fetchingCommunities && selectedIndex === 1
            ? <>
              <Hero>
                <HeroPrimaryText>Can't find a community?</HeroPrimaryText>
                <Link to="/community/create">
                  <ButtonSecondary>Create it yourself</ButtonSecondary>
                </Link>
              </Hero>
              {communityStore.communities.map(community => (
                <div key={community.id}>
                  {community.name}
                </div>
              ))}
            </>
            : (
              <GhostWrapper isDoneRendering={communityStore.fetchingCommunities}>
                <HomeGrid>
                  <GhostSmall style={{ backgroundColor: '#efefef' }} />
                  <GhostSmall style={{ backgroundColor: '#efefef' }} />
                  <GhostSmall style={{ backgroundColor: '#efefef' }} />
                  <GhostSmall style={{ backgroundColor: '#efefef' }} />
                </HomeGrid>
              </GhostWrapper>
            )
          }
        </HomeGrid>
      </>
    )
  }
}

Home.propTypes = {
  storyStore: PropTypes.object.isRequired,
  communityStore: PropTypes.object.isRequired,
}

export default Home
