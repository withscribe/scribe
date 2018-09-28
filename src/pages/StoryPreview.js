import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import Input, {
  Label, InlineLabel, InlineInput, TextArea, Button,
} from '_system/Input'


@inject('storyStore')
@observer
class StoryPreview extends React.Component {
  componentDidMount() {
    const { storyStore } = this.props
    console.log('in component did mount story preview')
    const id = storyStore.selectedStory
    console.log(`Story ID ----> ${id}`)
    storyStore.getStory(id)
    console.log(storyStore.story)
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
                </>
            )
          }
        </>
    )
  }
}

StoryPreview.propTypes = {
  storyStore: PropTypes.object.isRequired,
}

export default StoryPreview
