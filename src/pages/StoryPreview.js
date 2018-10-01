import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import Input, {
  Label, InlineLabel, InlineInput, TextArea, Button,
} from '_system/Input'


@inject('storyStore', 'userStore')
@observer
class StoryPreview extends React.Component {
  componentDidMount() {
    const { storyStore } = this.props
    const id = storyStore.selectedStory
    // find the story to display
    storyStore.getStory(id)
  }

  cloneStory = (parentStoryId) => {
    const { storyStore, userStore } = this.props
    storyStore.clone(parentStoryId, userStore.me.id)
  }

  render() {
    const { storyStore: { story } } = this.props
    return (
        <>
          {story && (
            <>
              <Label> I Preview</Label>
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
          )}
      </>
    )
  }
}

StoryPreview.propTypes = {
  storyStore: PropTypes.object.isRequired,
  userStore: PropTypes.object.isRequired,
}

export default StoryPreview
