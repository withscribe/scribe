import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import Input, {
  Label, InlineLabel, InlineInput, TextArea, Button,
} from '../styled/_system/Input'

@inject('storyEditorStore', 'userStore', 'profileStore')
@observer
class StoryEditor extends React.Component {
  componentDidMount() {
    const { storyEditorStore, userStore, profileStore } = this.props
    userStore.refreshMeById(userStore.me.account_id)
    /**
     * 'data' is the current .me model
     * we can reuse this because the structure is the same
     */
    const { ...data } = userStore.me
    profileStore.importCurrentProfile(data)
    if (!storyEditorStore.isValid()) { storyEditorStore.init() }
  }

  handleSubmitClick = () => {
    const { storyEditorStore, profileStore } = this.props

    if (storyEditorStore.isValid) {
      storyEditorStore.submitStory(profileStore.editedProfile.id)
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
  profileStore: PropTypes.object.isRequired,
}

export default StoryEditor
