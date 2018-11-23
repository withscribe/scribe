import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import { Button } from '_system/Button'
import Input, {
  Label, InlineLabel, InlineInput, TextArea,
} from '_system/Input'
import { HomeGrid } from '_system/Grid'
import { TitleText, TitleSecondary } from '_system/Typography'
import { ProfileStoryCard } from 'Components/StoryCard'

@inject('userStore')
@observer
class MyStories extends React.Component {
  componentDidMount() {
    const { userStore } = this.props
    userStore.refreshMeById(userStore.me.account_id)
  }

  render() {
    const { history, userStore, userStore: { me: { originalStories } } } = this.props
    return (
      <>
        <TitleText>My Library</TitleText>
        {userStore.updatingUser
          ? <span>Stories Loading</span>
          : <span>Stories Loaded</span>
        }
        <TitleSecondary>Original Stories</TitleSecondary>
        {originalStories.length >= 1 && !userStore.updatingUser
          ? (
            <HomeGrid>
              {originalStories.map(story => (
                <ProfileStoryCard story={story} key={story.id} history={history} />
              ))}
            </HomeGrid>
          ) : 'no original stories'
        }
        <TitleSecondary>Cloned Stories</TitleSecondary>
        {userStore.clonedStories.length >= 1 && !userStore.updatingUser
          ? (
            <HomeGrid>
              {userStore.clonedStories.map(story => (
                <ProfileStoryCard story={story} key={story.id} history={history} />
              ))}
            </HomeGrid>
          ) : 'no cloned stories'
        }
        <TitleSecondary>Forked Stories</TitleSecondary>
        {userStore.forkedStories.length >= 1 && !userStore.updatingUser
          ? (
            <HomeGrid>
              {userStore.forkedStories.map(story => (
                <ProfileStoryCard story={story} key={story.id} history={history} />
              ))}
            </HomeGrid>
          ) : 'no forked stories'
        }
      </>
    )
  }
}

MyStories.propTypes = {
  userStore: PropTypes.object.isRequired,
}

export default MyStories
