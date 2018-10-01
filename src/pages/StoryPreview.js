import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import Input, {
  Label, InlineLabel, InlineInput, TextArea, Button,
} from '_system/Input'


@inject('storyStore', 'userStore', 'profileStore')
@observer
class StoryPreview extends React.Component {
  componentDidMount() {
    const { storyStore, userStore, profileStore } = this.props
    const id = storyStore.selectedStory
    // refresh user -- we need this later to query user's profile
    userStore.refreshMeById(userStore.me.account_id)
    const { ...data } = userStore.me
    // refresh user's profile -- we'll need the id later to attach to the clone
    profileStore.importCurrentProfile(data)
    // find the story to display
    storyStore.getStory(id)
  }

  cloneStory = (parentStoryId) => {
    const { storyStore, profileStore } = this.props
    storyStore.clone(parentStoryId, profileStore.editedProfile.id)
  }

  render() {
    const { storyStore: { story } } = this.props
    console.log(story)
    return (
        <>
          {
            story && (
                <>
                  <Label> In Preview </Label>
                  <Label>
                    {story.title}
                  </Label>
                  <Label>
                    {story.description}
                  </Label>
                  <Label>
                    {story.content}
                  </Label>
                  <Button onClick={() => this.cloneStory(story.id)}>Clone Story</Button>
                </>
            )
          }
        </>
    )
  }
}

StoryPreview.propTypes = {
  storyStore: PropTypes.object.isRequired,
  userStore: PropTypes.object.isRequired,
  profileStore: PropTypes.object.isRequired,
}

export default StoryPreview
