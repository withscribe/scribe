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

@inject('userStore', 'storyStore')
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
            <StoryViewer content={storyStore.story.content} get={this.serializedStoryUpdateCallback} />
          </>)
        }
        {isAuthor
          && (
            <Link to={`/story/edit/${storyStore.story.id}`}>Edit</Link>
          )
        }
      </EditorWrapper>
    )
  }
}

export default ViewClone
