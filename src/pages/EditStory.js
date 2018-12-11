import React from 'react'
import { Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import { EditorWrapper } from 'Styled/Editor'
import { TitleText } from '_system/Typography'
import Hero, { HeroPrimaryText, HeroSpanText } from '_system/Hero'
import Button from '_system/Button'
import TextEditor from 'Components/Papyrus/TextEditor'
import {
  ViewStoryGrid, ViewStoryWidthAdapter,
  SecondaryTitleGridPosition, CloneGridPosition, ContributeGridPosition,
} from 'styled/ViewStory'

@inject('storyEditorStore', 'userStore', 'toastStore')
@observer
class EditStory extends React.Component {
  state = {
    permission: false,
    showForkDetails: false,
  }

  componentDidMount() {
    const { storyEditorStore, userStore } = this.props
    const storyId = this.props.match.params.id

    storyEditorStore.loadStory(storyId).then(() => {
      if (storyEditorStore.authorId === userStore.me.id
      || storyEditorStore.nonAuthorId === userStore.me.id) {
        console.log('we are allowed to be here')
        this.setState({ permission: true })
      } else {
        console.log('we are not allowed to be here')
        // return (
        //   <Redirect to={`/story/preview/${storyId}`} />
        // )
      }

      if (storyEditorStore.isForked) {
        console.log('hello')
        this.setState({ showForkDetails: true })
      }
    })
  }

  componentWillUnmount() {
    // TODO: Fix this monkeypatch with an action using destroy()
    const { storyEditorStore } = this.props
    storyEditorStore.init()
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

  handleUpdateClick = () => {
    const { storyEditorStore } = this.props

    storyEditorStore.updateStory()
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
    const { storyEditorStore } = this.props
    const { showForkDetails } = this.state
    return (
      <ViewStoryWidthAdapter>
        <Hero
          appearance="grey">
          <HeroPrimaryText>{storyEditorStore.title}</HeroPrimaryText>
          <HeroSpanText>Currently Editing</HeroSpanText>
        </Hero>
        {storyEditorStore.content
          && <TextEditor content={storyEditorStore.content} get={this.serializedStoryUpdateCallback} />
        }
        <div>
          <Button appearance="default" intent="success" type="button" disabled={storyEditorStore.saveInProgress} onClick={this.handleUpdateClick}>
            {storyEditorStore.saveInProgress ? 'Saving Changed' : 'Save Changes'}
          </Button>
          {showForkDetails
            && (
              <Button
                appearance="primary"
                intent="warning"
                type="button"
                onClick={this.sendContributionRequest}>
                Send Contribution Request
              </Button>
            )
          }
        </div>
      </ViewStoryWidthAdapter>
    )
  }
}

export default EditStory
