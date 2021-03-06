import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import Tab from 'Components/Tabs/Tab'
import Pagination from 'Components/Pagination'
import StoryCard from 'Components/StoryCard'
import CommunityCard from 'Components/CommunityCard'
import { TabList } from 'System/Tabs'
import { HomeGrid } from 'System/Grid'
import Button from 'System/Button'
import { GhostWrapper, GhostCard } from 'System/Ghost'
import Hero, { HeroPrimaryText, HeroSpanText } from 'System/Hero'

@inject('storyStore', 'communityStore')
@observer
class Home extends React.Component {
  state = {
    selectedIndex: 0,
    tabs: ['Stories', 'Communities'],
  }

  componentDidMount() {
    const { storyStore, communityStore } = this.props
    communityStore.getAllCommunities()
  }

  onPageChanged = (data) => {
    const { storyStore } = this.props
    const { currentPage, totalPages, pageLimit } = data

    /* We don't need to skip anything if the current page is (1)
     * otherwise, we take the current page, subtract 1 and take the 10 next stories...
     * ex. `page 2 = skip 10 (the contents of page 1)` = `currentPage - 1`
    */
    const skip = (currentPage === 1 ? 0 : currentPage - 1) * 10

    storyStore.getAllStories(skip)
  }

  render() {
    const { tabs, selectedIndex } = this.state
    const { storyStore, communityStore, history } = this.props
    return (
      <>
        <Hero appearance="purple">
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
        <Pagination
          onPageChanged={this.onPageChanged}
          totalRecords={100} />
        <HomeGrid>
          {!storyStore.fetchingStories && selectedIndex === 0
            ? (
              <>
                {storyStore.nonClonedStories.map((story, idx) => {
                  if (idx === 3) {
                    return (
                      <Hero appearance="green" key="hero_2018aabda">
                        <HeroPrimaryText>Feeling Creative?</HeroPrimaryText>
                        <Link to="/story/create">
                          <Button
                            appearance="default"
                            intent="success">
                            Write your own Story
                          </Button>
                        </Link>
                      </Hero>
                    )
                  }
                  return (
                    /* we pass the history prop down to each card so we avoid a ton of
                      unnecessary working..
                      (not sure if it would even be a performance problem)
                    */
                    <StoryCard history={history} story={story} key={story.id} />
                  )
                })}
              </>
            )
            : (
              <GhostWrapper isDoneRendering={storyStore.fetchingStories}>
                <HomeGrid>
                  <GhostCard />
                  <GhostCard />
                  <GhostCard />
                  <GhostCard />
                </HomeGrid>
              </GhostWrapper>
            )
          }
        </HomeGrid>
        <HomeGrid>
          {!communityStore.fetchingCommunities && selectedIndex === 1
            ? (
              <>
                <Hero appearance="teal">
                  <HeroPrimaryText>Can't find a community?</HeroPrimaryText>
                  {/* <Link to="/community/create"> */}
                  {/* <Button appearance="default">Create it yourself</Button> */}
                  <HeroSpanText>Let Scribe know! We create user requested communities all the time.</HeroSpanText>
                  {/* </Link> */}
                </Hero>
                {communityStore.communities.map(community => (
                  <CommunityCard history={history} community={community} key={community.id} />
                ))}
              </>
            )
            : (
              <GhostWrapper isDoneRendering={communityStore.fetchingCommunities}>
                <HomeGrid>
                  <GhostCard />
                  <GhostCard />
                  <GhostCard />
                  <GhostCard />
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
