import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import { EditorWrapper } from 'Styled/Editor'
import Input, {
  Label, LabelConstraint,
} from '_system/Input'
import { TitleText } from '_system/Typography'
import { ButtonPrimary } from '_system/Button'
import TextEditor from 'Components/Papyrus/TextEditor'

@inject('storyEditorStore', 'userStore', 'storyStore')
@observer
class ViewClone extends React.Component {
  state = {
    isAuthor: false,
  }

  componentDidMount() {
    const { storyStore, userStore } = this.props
    const storyId = this.props.match.params.id

    storyStore.getStory(storyId).then(() => {
      if (!storyStore.story.isCloned) {
        return (
          <Redirect
            to={`/story/preview/${storyStore.story.id}`} />
        )
      }

      if (userStore.me.id === storyStore.story.nonAuthorId) {
        this.setState({ isAuthor: true })
      }
    })
  }

  // componentWillUnmount() {
  //   // TODO: Fix this monkeypatch with an action using destroy()
  //   const { storyEditorStore } = this.props
  //   storyEditorStore.init()
  // }

  handleSubmitClick = () => {
    const { storyEditorStore, userStore } = this.props

    const author = this.getAuthorName(
      userStore.me.firstName,
      userStore.me.lastName,
      userStore.me.userName,
    )
    storyEditorStore.submitStory(userStore.me.id, author)
      .then((res) => {
        console.log(`SubmitStory Response: ${res}`)
      }).catch((err) => {
        console.log(`SubmitStory Error: ${err}`)
      })
  }

  handleUpdateClick = () => {
    const { storyEditorStore } = this.props

    storyEditorStore.updateStory()
      .then((res) => {
        console.log(`UpdateStory Response: ${res}`)
      }).catch((err) => {
        console.log(`UpdateStory Error: ${err}`)
      })
  }

  sendContributionRequest = () => {
    const { storyEditorStore } = this.props

    storyEditorStore.sendContribution(storyEditorStore.storyId)
      .then((res) => {
        console.log(`UpdateStory Response: ${res}`)
      }).catch((err) => {
        console.log(`UpdateStory Error: ${err}`)
      })
  }

  serializedStoryUpdateCallback = (update) => {
    const { storyEditorStore } = this.props
    storyEditorStore.changeContent(update)
  }

  render() {
    const { storyStore } = this.props
    const { isAuthor } = this.state
    return (
      <EditorWrapper>
        {storyStore.story
          && <TextEditor content={storyStore.story.content} get={this.serializedStoryUpdateCallback} />
        }
        {isAuthor
          && (
            <Link to={`/story/edit/${storyStore.story.id}`}>Edit</Link>
          )
        }
        {/* <ButtonPrimary type="button" disabled={storyEditorStore.saveInProgress} onClick={this.handleUpdateClick}> */}
        {/*   {storyEditorStore.saveInProgress ? 'Saving' : 'Update'} */}
        {/* </ButtonPrimary> */}
      </EditorWrapper>
    )
  }
}

export default ViewClone
