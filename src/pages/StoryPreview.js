import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import Input, {
  Label, InlineLabel, InlineInput, TextArea, Button,
} from '_system/Input'


@inject('storyStore', 'userStore')
@observer
class StoryPreview extends React.Component {
  constructor() {
    super()
    this.closeModal = this.closeModal.bind(this)
  }

  state = {
    showCloneModal: false,
  }
  
  componentDidMount() {
    const { storyStore } = this.props
    const id = storyStore.selectedStory
    // find the story to display
    storyStore.getStory(id)
  }

  cloneStory = (parentStoryId) => {
    const { storyStore, userStore } = this.props
    storyStore.clone(parentStoryId, userStore.me.id)
      .then(() => {
        this.setState({ showCloneModal: true })
      })
  }

  closeModal = () => {
    this.setState({ showCloneModal: false })
  }

  viewClone = () => {

    const { storyStore, history } = this.props
    const id = storyStore.currentCloneId

    history.push(`/story/preview/${id}`)
    storyStore.setActiveStory(id)

    storyStore.getStory(id)
    this.closeModal()
  }

  editStory = () => {
    // redirect to Story editor with the cloned story id
    console.log('Cloned Story Success Model: Edit')
    this.closeModal()
  }

  render() {
    const { storyStore: { story, cloningStory } } = this.props
    const { showCloneModal } = this.state
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
              {!cloningStory
                ? <Button onClick={() => this.cloneStory(story.id)}>Clone Story</Button>
                : <Button onClick={() => {}}>Cloning Story</Button>
              }

            </>
          )}

          <Modal
            isOpen={showCloneModal}
            onRequestClose={this.closeModal}
            contentLabel="Clone Success Modal">

            <h2>Story Cloned!</h2>
            <button type="button" onClick={this.closeModal}>close</button>
            <button type="button" onClick={this.viewClone}>View</button>
            <button type="button" onClick={this.editStory}>Edit</button>
          </Modal>
          
      </>
    )
  }
}

StoryPreview.propTypes = {
  storyStore: PropTypes.object.isRequired,
  userStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default StoryPreview
