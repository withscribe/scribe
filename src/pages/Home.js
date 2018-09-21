import React from 'react'
import { inject, observer } from 'mobx-react'

import Input, {
  Label, InlineLabel, InlineInput, TextArea, Button,
} from '../styled/_system/Input'

@inject('storyEditorStore')
@observer
class Home extends React.Component {
  componentDidMount() {
    const { storiesStore } = this.props
    console.log('in component did mount home')
    console.log(storiesStore.getAllStories())
  }

  render() {
    return (
        <>
          <Label> We are HOME </Label>
          <Label> We are HOME </Label>
          <Label> We are HOME </Label>
          <Label> We are HOME </Label>
          <Label> We are HOME </Label>
          <Label> We are HOME </Label>
        </>
    )
  }
}

export default Home
