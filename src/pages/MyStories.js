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

  previewStory = (storyId) => {
    const { storyStore } = this.props
    console.log(storyId)
    this.props.history.push(`/story/preview/${storyId}`)
  }

  editStory = (storyId) => {
    const { storyStore } = this.props
    console.log(storyId)
    storyStore.setActiveStory(storyId)
    this.props.history.push(`/editor/${storyId}`)
  }

  render() {
    const { userStore, userStore: { me: { originalStories } } } = this.props
    return (
      <>
        <TitleText>My Library</TitleText>
        {userStore.updatingUser
          ? <span>Stories Loading</span>
          : <span>Stories Loaded</span>
        }
        <TitleSecondary>Original Stories</TitleSecondary>
        {originalStories && !userStore.updatingUser
          ? (
            <HomeGrid>
              {originalStories.map(story => (
                <ProfileStoryCard story={story} key={story.id} />
              ))}
            </HomeGrid>
          ) : 'no original stories'
        }
        <TitleSecondary>Cloned Stories</TitleSecondary>
        {userStore.clonedStories.length >= 1 && !userStore.updatingUser
          ? (
            <HomeGrid>
              {userStore.clonedStories.map(story => (
                <ProfileStoryCard story={story} key={story.id} />
              ))}
            </HomeGrid>
          ) : 'no cloned stories'
        }
        <TitleSecondary>Forked Stories</TitleSecondary>
        {userStore.forkedStories.length >= 1 && !userStore.updatingUser
          ? (
            <HomeGrid>
              {userStore.forkedStories.map(story => (
                <ProfileStoryCard story={story} key={story.id}/>
              ))}
            </HomeGrid>
          ) : 'no forked stories'
        }
        {/* {storyStore.stories.length > 0 ? ( */}
        {/*   <ul> */}
        {/*     {storyStore.usersStories(userStore.me.id).map(story => ( */}
        {/*       <div key={story.id}> */}
        {/*         {story.isCloned */}
        {/*           ? <> */}
        {/*             <li>{story.title}<small><b>CLONE</b></small></li> */}
        {/*             <Button onClick={() => this.previewStory(story.id)}> */}
        {/*                 View */}
        {/*             </Button> */}
        {/*             <Button onClick={() => this.editStory(story.id)}> */}
        {/*                 Edit */}
        {/*             </Button> */}
        {/*             <Label>Likes: {story.likes}</Label> */}
        {/*           </> */}
        {/*           : story.isForked ? <> */}
        {/*             <li>{story.title}<small><b>Fork</b></small></li> */}
        {/*             <Button onClick={() => this.previewStory(story.id)}> */}
        {/*                 View */}
        {/*             </Button> */}
        {/*             <Button onClick={() => this.editStory(story.id)}> */}
        {/*                 Edit */}
        {/*             </Button> */}
        {/*             <Label>Likes: {story.likes ?story.likes : 0}</Label> */}
        {/*           </> */}
        {/*           : <> */}
        {/*             <li>{story.title}</li> */}
        {/*             <Button onClick={() => this.previewStory(story.id)}> */}
        {/*                 View */}
        {/*             </Button> */}
        {/*             <Button onClick={() => this.editStory(story.id)}> */}
        {/*                 Edit */}
        {/*             </Button> */}
        {/*             <Label>Likes: {story.likes ?story.likes : 0}</Label> */}
        {/*           </> */}
        {/*         } */}
        {/*       </div> */}
        {/*     ))} */}
        {/*   </ul> */}
        {/* ) : <span>nothing to see here</span> */}
        {/* } */}
      </>
    )
  }
}

MyStories.propTypes = {
  userStore: PropTypes.object.isRequired,
  storyStore: PropTypes.object.isRequired,
}

export default MyStories
