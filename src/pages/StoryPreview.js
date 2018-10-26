import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import Input, {
  Label, InlineLabel, InlineInput, TextArea,
} from '_system/Input'
import { Button } from '_system/Button'
import Typography, { TitleText, StoryText } from '_system/Typography'
import { storeKeyNameFromField } from 'apollo-utilities';

@inject('storyStore', 'userStore')
@observer
class StoryPreview extends React.Component {
  state = {
    showCloneModal: false,
    liked: false,
    forked: false
  }

  componentDidMount() {
    const { storyStore, userStore } = this.props
    const storyId = this.props.match.params.id
    storyStore.getStory(storyId)
    // check whether this story has been liked or not
    // story.usersWhoLiked.map(like => {
    //   if(like.guid == storyId+userStore.me.id) {
    //     this.setState({ liked: true })
    //   }
    // })

    const hasForked = storyStore.isForked
    this.setState({ forked: hasForked })
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

  forkStory = (parentStoryId) => {
    const { storyStore, userStore } = this.props
    storyStore.forkStory(parentStoryId, userStore.me.id)
    this.setState({ forked: true})
  }

  render() {
    const { storyStore: { story, cloningStory }, storyStore, userStore } = this.props
    const { showCloneModal, liked, forked } = this.state
    console.log(story)
    return (
        <>
          {story && (!storyStore.isAuthor(userStore.me.id) || !forked
            ?
            <>
              <TitleText>
                {story.title}
              </TitleText>
              <Label>
                By: {story.author ? story.author : 'No Author Assigned.'}
              </Label>
              <StoryText>
                {story.content}
              </StoryText>
              {!cloningStory
                  ? <Button onClick={() => this.cloneStory(story.id)}>Clone Story</Button>
                  : <Button onClick={() => {}}>Cloning Story</Button>
              }
              {liked
                  ? <Button onClick={() => {}}>Liked!</Button>
                  : <Button onClick={() => this.likeStory(story.id)}>Like</Button>
              }
              {forked
                ? <Button onClick={() => {}}>Contributed!</Button>
                : <Button onClick={() => this.forkStory(story.id)}>Contribute</Button>
              }
            </>
            :
            <>
              <TitleText>
                {story.title}
              </TitleText>
              <Label>
                By: {story.author ? story.author : 'No Author Assigned.'}
              </Label>
              <StoryText>
                {story.content}
              </StoryText>
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
