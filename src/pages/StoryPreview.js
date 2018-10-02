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

    this.state = {
      modalIsOpen: false,
    }

    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
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
      .then((res) => {
        console.log(`CloneStory Response: ${res}`)
      }).catch((err) => {
        console.log(`CloneStory Error: ${err}`)
      })
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  viewStory = () => {
    // redirect to Story preview with the cloned story id
    console.log('Cloned Story Success Model: View')
  }

  editStory = () => {
    // redirect to Story editor with the cloned story id
    console.log('Cloned Story Success Model: Edit')
  }

  render() {
    const { storyStore: { story } } = this.props
    const { modalIsOpen } = this.state
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

          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Clone Success Modal">

            <h2>Story Cloned!</h2>
            <button type="button" onClick={this.closeModal}>close</button>
            <button type="button" onClick={this.viewStory}>View</button>
            <button type="button" onClick={this.editStory}>Edit</button>
          </Modal>
          
      </>
    )
  }
}

StoryPreview.propTypes = {
  storyStore: PropTypes.object.isRequired,
  userStore: PropTypes.object.isRequired,
}

export default StoryPreview
