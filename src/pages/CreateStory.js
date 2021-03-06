import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Box } from '@rebass/grid/emotion'

import Input, {
  Label, LabelConstraint, LabelTip,
} from 'System/Input'
import Button from 'System/Button'
import Select from 'System/Select'
import { EditorWrapper } from 'Styled/Editor'
import Hero, { HeroPrimaryText, HeroSpanText } from 'System/Hero'
import TextEditor from 'Components/Papyrus/TextEditor'

@inject('storyEditorStore', 'userStore')
@observer
class CreateStory extends React.Component {
  state = {
    selectedCommunity: null,
  }

  componentDidMount() {
    const { storyEditorStore, userStore } = this.props

    if (storyEditorStore.isValid) {
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
    const { selectedCommunity } = this.state
    if (storyEditorStore.isValid) {
      const author = this.getAuthorName(
        userStore.me.firstName,
        userStore.me.lastName,
        userStore.me.userName,
      )

      const communityIdFromList = userStore.me.communities.filter(c => c.name === selectedCommunity)
      const communityId = communityIdFromList.length > 0 ? communityIdFromList[0].id : null
      storyEditorStore.submitStory(userStore.me.id, author, communityId)
        .then(() => {
          const { storyEditorStore: { storyId, saveInProgress } } = this.props
          // history.push(`/story/preview/${storyEditorStore.storyId}`)
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
          <HeroSpanText>Share your tale with the Scribe community.</HeroSpanText>
        </Hero>
        <Label>Story Title <LabelConstraint>required</LabelConstraint></Label>
        <Box width={1 / 2}>
          <Input
            type="text"
            value={storyEditorStore.title}
            onChange={e => storyEditorStore.changeTitle(e.target.value)} />
        </Box>
        <Label>Story Description <LabelConstraint>max 140 characters</LabelConstraint></Label>
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
          <option value={null}>no community</option>
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
