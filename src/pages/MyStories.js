import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import Tab from 'Components/Tabs/Tab'
import { TabList } from '_system/Tabs'
import { Button } from '_system/Button'
import Input, {
  Label, InlineLabel, InlineInput, TextArea,
} from '_system/Input'
import { HomeGrid } from '_system/Grid'
import Hero, { HeroPrimaryText, HeroSpanText } from '_system/Hero'
import { ProfileStoryCard } from 'Components/StoryCard'

@inject('userStore')
@observer
class MyStories extends React.Component {
  state = {
    selectedIndex: 0,
    tabs: ['Original', 'Cloned', 'Forked', 'Contribute'],
  }

  componentDidMount() {
    const { userStore } = this.props
    userStore.refreshMeById(userStore.me.account_id)
  }

  render() {
    const { tabs, selectedIndex } = this.state
    const { history, userStore, userStore: { me: { originalStories } } } = this.props
    return (
      <>
        <Hero appearance="teal">
          <HeroPrimaryText>My Library</HeroPrimaryText>
          <HeroSpanText>All your stories in one place.</HeroSpanText>
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
        {!userStore.updatingUser && selectedIndex === 0
          && (originalStories.length >= 1 ? (<>
            <Hero appearance="green">
              <HeroPrimaryText>Original Stories</HeroPrimaryText>
              <HeroSpanText>Things you've written yourself</HeroSpanText>
            </Hero>
            <HomeGrid>
              {originalStories.map(story => (
                <ProfileStoryCard
                  story={story}
                  key={story.id}
                  history={history} />
              ))}
            </HomeGrid>
          </>) : '*crickets*')
        }
        {!userStore.updatingUser && selectedIndex === 1
          && (userStore.clonedStories.length >= 1 ? (<>
            <Hero appearance="blue">
              <HeroPrimaryText>Cloned Stories</HeroPrimaryText>
              <HeroSpanText>Things you've cloned</HeroSpanText>
            </Hero>
            <HomeGrid>
              {userStore.clonedStories.map(story => (
                <ProfileStoryCard
                  story={story}
                  key={story.id}
                  history={history} />
              ))}
            </HomeGrid>
          </>) : '*more crickets*')
        }
        {!userStore.updatingUser && selectedIndex === 2
          && (userStore.forkedStories.length >= 1 ? (<>
            <Hero appearance="red">
              <HeroPrimaryText>Forked Stories</HeroPrimaryText>
              <HeroSpanText>Things you've forked</HeroSpanText>
            </Hero>
            <HomeGrid>
              {userStore.forkedStories.map(story => (
                <ProfileStoryCard
                  story={story}
                  key={story.id}
                  history={history} />
              ))}
            </HomeGrid>
          </>) : '*too many crickets*')
        }
      </>
    )
  }
}

MyStories.propTypes = {
  userStore: PropTypes.object.isRequired,
}

export default MyStories
