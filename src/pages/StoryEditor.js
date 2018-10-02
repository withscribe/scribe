import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import Input, {
  Label, InlineLabel, InlineInput, TextArea, Button,
} from '../styled/_system/Input'

@inject('storyEditorStore')
@observer
class StoryEditor extends React.Component {
  componentDidMount() {
    const { storyEditorStore, history } = this.props

    const id = history.location.pathname.split('/').pop()

    if (id !== 'new') {
      storyEditorStore.loadStory(id)
    }

    if (!storyEditorStore.isValid()) {
      storyEditorStore.init()
    }
  }

  handleSubmitClick = () => {
    const { storyEditorStore, userStore } = this.props

    if (storyEditorStore.isValid) {
      storyEditorStore.submitStory(userStore.me.id)
        .then((res) => {
          console.log(`SubmitStory Response: ${res}`)
        }).catch((err) => {
          console.log(`SubmitStory Error: ${err}`)
        })
    }
  }

  render() {
    const { storyEditorStore } = this.props
    return (
      <>
        <Label>Story Title</Label>
        <Input
          type="text"
          value={storyEditorStore.title}
          onChange={e => storyEditorStore.changeTitle(e.target.value)}
          style={{ width: '90%' }} />
        <Label>Story Description</Label>
        <Input
          type="text"
          value={storyEditorStore.description}
          onChange={e => storyEditorStore.changeDesc(e.target.value)} />
        <Label>Story Audience</Label>
        <InlineLabel>Min Age</InlineLabel>
        <InlineInput
          type="number"
          min="1"
          max={storyEditorStore.maxAge}
          step="1"
          value={storyEditorStore.minAge}
          onChange={e => storyEditorStore.changeMinAge(e.target.value)} />
        <InlineLabel>Max Age</InlineLabel>
        <InlineInput
          type="number"
          min={storyEditorStore.minAge}
          max="100"
          step="1"
          value={storyEditorStore.maxAge}
          onChange={e => storyEditorStore.changeMaxAge(e.target.value)} />
        <Label>Content</Label>
        <TextArea
          value={storyEditorStore.content}
          onChange={e => storyEditorStore.changeContent(e.target.value)} />

        {
          storyEditorStore.saveInProgress
            ? <Button type="button" onClick={(e) => { e.preventDefault() }}>Saving</Button>
            : <Button type="button" onClick={this.handleSubmitClick}>Submit</Button>
        }
      </>
    )
  }
}

StoryEditor.propTypes = {
  storyEditorStore: PropTypes.object.isRequired,
  userStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default StoryEditor
