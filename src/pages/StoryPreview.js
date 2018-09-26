import React from 'react'
import { inject, observer } from 'mobx-react'

import Input, {
  Label, InlineLabel, InlineInput, TextArea, Button,
} from '../styled/_system/Input'

import { Link } from 'react-router-dom'

@inject('storiesStore', 'storyStore')
@observer
class StoryPreview extends React.Component {
  state = {
    storyLoaded: false,
    story: {},
  }

  componentDidMount() {
    const { storiesStore } = this.props;   
    console.log("in component did mount story preview"); 
    const id = storiesStore.selectedStory
    console.log("Story ID ----> " + id)
    const { storyStore } = this.props
    const { result } = storyStore.getStory(id)

    // this.setState({
    //   story: store.getStory(id)
    // })

    console.log(result)
  }

  render() {
    return (
        <>
         <Label> In Preview </Label>
        </>
    )
  }
}

export default StoryPreview
