import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import { EditorWrapper } from 'Styled/Editor'
import Input, {
  Label, LabelConstraint,
} from '_system/Input'
import { TitleText } from '_system/Typography'
import { ButtonPrimary } from '_system/Button'
import StoryViewer from 'Components/Papyrus/StoryViewer'

@inject('storyStore', 'userStore')
@observer
class ViewFork extends React.Component {
  state = {
    isAuthor: false,
  }

  componentDidMount() {
    const { userStore, storyStore } = this.props
    const storyId = this.props.match.params.id

    storyStore.getStory(storyId).then(() => {
      if (!storyStore.story.isForked) {
        return (
          <Redirect
            to={`/story/preview/${storyStore.story.id}`} />
        )
      }
      if (storyStore.story.authorId === userStore.me.id
      || storyStore.story.nonAuthorId === userStore.me.id) {
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
    const { storyEditorStore, userStore } = this.props

    storyEditorStore.sendContribution(userStore.me.userName)
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
          && (<>
            <TitleText>
              {storyStore.story.title}
            </TitleText>
            <Label>
              By: {storyStore.story.author ? storyStore.story.author : 'No Author Assigned.'}
            </Label>

            <StoryViewer content={storyStore.story.content} />
          </>)
        }
        {isAuthor && storyStore.story
          && (
            <Link to={`/story/edit/${storyStore.story.id}`}>Edit</Link>
          )
        }
      </EditorWrapper>
    )
  }
}

export default ViewFork
