import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import Input, {
  Label, InlineLabel, InlineInput, TextArea,
} from '_system/Input'
import { ButtonPrimary } from '_system/Button'

@inject('storyEditorStore', 'userStore')
@observer
class StoryEditor extends React.Component {
  componentDidMount() {
    const { storyEditorStore, history } = this.props

    const id = history.location.pathname.split('/').pop()

    if (id !== 'create') {
      storyEditorStore.loadStory(id)
    }

    if (!storyEditorStore.isValid()) {
      storyEditorStore.init()
    }
  }

  handleSubmitClick = () => {
    const { storyEditorStore, userStore } = this.props

    if (storyEditorStore.isValid) {
      // TODO: remove console logs and use username as author if
      // firstname and lastname == null
      console.log(`First Name: ${userStore.me.firstName}`)
      console.log(`Last Name: ${userStore.me.lastName}`)
      const author = userStore.me.firstName + " " + userStore.me.lastName
      console.log(`Author: ${author}`)
      storyEditorStore.submitStory(userStore.me.id, author)
        .then((res) => {
          console.log(`SubmitStory Response: ${res}`)
        }).catch((err) => {
          console.log(`SubmitStory Error: ${err}`)
        })
    }
  }

  handleUpdateClick = () => {
    const { storyEditorStore } = this.props

    if (storyEditorStore.isValid) {
      storyEditorStore.updateStory()
        .then((res) => {
          console.log(`UpdateStory Response: ${res}`)
        }).catch((err) => {
          console.log(`UpdateStory Error: ${err}`)
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
        <Input
          type="number"
          min="1"
          max={storyEditorStore.maxAge}
          step="1"
          value={storyEditorStore.minAge}
          onChange={e => storyEditorStore.changeMinAge(e.target.value)} />
        <InlineLabel>Max Age</InlineLabel>
        <Input
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

        {storyEditorStore.saveInProgress
          && <ButtonPrimary type="button" onClick={(e) => { e.preventDefault() }}>Saving</ButtonPrimary>
        }
        {!storyEditorStore.saveInProgress && storyEditorStore.storyId === ''
          ? <ButtonPrimary type="button" onClick={this.handleSubmitClick}>Submit</ButtonPrimary>
          : <ButtonPrimary type="button" onClick={this.handleUpdateClick}>Update</ButtonPrimary>
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
