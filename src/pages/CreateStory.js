import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Box } from 'grid-styled/emotion'

import Input, {
  Label, LabelConstraint, LabelTip,
} from '_system/Input'
import { Button } from '_system/Button'
import Select from '_system/Select'
import { EditorWrapper } from 'Styled/Editor'
import Hero, { HeroPrimaryText, HeroSpanText } from '_system/Hero'
import TextEditor from 'Components/Papyrus/TextEditor'

@inject('storyEditorStore', 'userStore')
@observer
class CreateStory extends React.Component {
  state = {
    test: ['option', 'another', 'another2'],
    selectedCommunity: undefined,
  }
  componentDidMount() {
    const { storyEditorStore } = this.props

    if (storyEditorStore.isValid()) {
      // do something to ask the user if they would like to reset
    } else {
      // should init on all runs since this component is made for create only
      storyEditorStore.init()
    }
  }

  componentWillUnmount() {
    // TODO: replace with proper destroy
    const { storyEditorStore } = this.props
    storyEditorStore.init()
  }

  handleSubmitClick = () => {
    const { storyEditorStore, userStore, history } = this.props

    if (storyEditorStore.isValid) {
      const author = this.getAuthorName(
        userStore.me.firstName,
        userStore.me.lastName,
        userStore.me.userName,
      )
      storyEditorStore.submitStory(userStore.me.id, author)
        .then(() => {
          this.setState({ submitted: true })
          history.push(`/story/preview/${storyEditorStore.storyId}`)
        }).catch((err) => {
          console.log(`SubmitStory Error: ${err}`)
        })
    }
  }

  getAuthorName = (firstName, lastName, userName) => {
    if (firstName != null && lastName != null) {
      return firstName + " " + lastName
    }
    return userName
  }

  getSerializedStoryContent = (som) => {
    const { storyEditorStore } = this.props
    console.log(som)
    storyEditorStore.changeContent(som)
  }

  handleSelectChange = (e) => {
    console.log(e.target.value)
    this.setState({ selectedCommunity: e.target.value })
  }

  render() {
    const { storyEditorStore, userStore: { me } } = this.props
    return (
      <>
        <Hero appearance="black">
          <HeroPrimaryText>Create a new Story</HeroPrimaryText>
          <HeroSpanText>Share your ideas with the Scribe community.</HeroSpanText>
        </Hero>
        <Label>Story Title</Label>
        <Box width={1 / 2}>
          <Input
            type="text"
            value={storyEditorStore.title}
            onChange={e => storyEditorStore.changeTitle(e.target.value)} />
        </Box>
        <Label>Story Description <LabelConstraint>Max 140 characters</LabelConstraint></Label>
        <Box width={3 / 4}>
          <Input
            type="text"
            maxLength="140"
            value={storyEditorStore.description}
            onChange={e => storyEditorStore.changeDesc(e.target.value)} />
        </Box>
        <Label>Share your Story with a community you belong to <LabelTip>Optional</LabelTip></Label>
        <Select
          onChange={this.handleSelectChange}>
          <option value="none">no community</option>
          {me.communities.map(community => (
            <option key={community.name} value={community.name}>{community.name}</option>
          ))}
        </Select>
        <Label>Content</Label>
        <TextEditor get={this.getSerializedStoryContent} />
        <Button
          appearance="primary"
          onClick={this.handleSubmitClick}>
          {storyEditorStore.saveInProgress
            ? 'Submitting'
            : 'Submit'
          }
        </Button>
      </>
    )
  }
}

CreateStory.propTypes = {
  storyEditorStore: PropTypes.object.isRequired,
  userStore: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default CreateStory
