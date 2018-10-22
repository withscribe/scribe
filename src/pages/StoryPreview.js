import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import Input, {
  Label, InlineLabel, InlineInput, TextArea,
} from '_system/Input'
import { Button } from '_system/Button'

@inject('storyStore', 'userStore')
@observer
class StoryPreview extends React.Component {
  state = {
    showCloneModal: false,
    liked: false
  }

  componentDidMount() {
    const { storyStore, userStore } = this.props
    const id = storyStore.selectedStory
    // check whether this story has been liked or not
    const hasLiked = userStore.hasUserLiked(id)
    this.setState({ liked: hasLiked })
  }

  closeModal = () => {
    this.setState({ showCloneModal: false })
  }

  cloneStory = (parentStoryId) => {
    const { storyStore, userStore } = this.props
    storyStore.clone(parentStoryId, userStore.me.id)
      .then(() => {
        this.setState({ showCloneModal: true })
      })
  }

  viewClone = () => {
    const { storyStore, history } = this.props
    const id = storyStore.currentCloneId

    this.closeModal()

    storyStore.setActiveStory(id)
    storyStore.getStory(id) // need to get this bc it doesn't mount again
    history.push(`/story/preview/${id}`)
  }

  editClone = () => {
    const { storyStore, history } = this.props
    const id = storyStore.currentCloneId

    this.closeModal()

    storyStore.setActiveStory(id)
    history.push(`/editor/${id}`)
  }

  likeStory = (storyId) => {
    const { storyStore } = this.props
    storyStore.likeStory(storyId)
    this.setState({ liked: true })
  }

  render() {
    const { storyStore: { story, cloningStory } } = this.props
    const { showCloneModal, liked } = this.state
    console.log(story)
    return (
        <>
          {story && (
            <>
              <Label>
                {story.title}
              </Label>
              <Label>
                
              </Label>
              <Label>
                {story.description}
              </Label>
              <Label>
                {story.author ? story.author : "No Author Assigned."}
              </Label>
              <p>
                {story.content}
              </p>
              {!cloningStory
                ? <Button onClick={() => this.cloneStory(story.id)}>Clone Story</Button>
                : <Button onClick={() => {}}>Cloning Story</Button>
              }
              {liked
                ? <Button onClick={() => {}}>Liked!</Button>
                : <Button onClick={() => this.likeStory(story.id)}>Like</Button>

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
            <button type="button" onClick={this.editClone}>Edit</button>
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
