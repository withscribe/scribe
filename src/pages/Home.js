import React from 'react'
import { inject, observer } from 'mobx-react'

import Input, {
  Label, InlineLabel, InlineInput, TextArea, Button,
} from '../styled/_system/Input'

@inject('storiesStore')
@observer
class Home extends React.Component {
  state = {
    storiesLoaded: false,
    data: [],
  }

  componentDidMount() {
    const { storiesStore } = this.props
    console.log('in component did mount home')
    this.getAllStories(storiesStore)
  }

  getAllStories = async (storiesStore) => {
    await storiesStore.getAllStories()
    console.log('after async call')
    console.log(storiesStore.stories[0].title)
    await this.setState({ storiesLoaded: true, data: storiesStore.stories })  
    console.log(storiesStore.stories[2].title);
    
  }

  renderList() {
     const storyList = this.state.data.map(story => {  <li> { story.title } </li> })   
     return <ul> {storyList} </ul>
  }


  render() {
    const StoryList = this.state.data.map(story => {  <li> { story.title } </li> })   

    return (
        <>
          {
            this.state.storiesLoaded
              ? <Label> Stories Loaded </Label>
              : <Label> Stories Not Loaded </Label>
          }

          {
            this.state.data.length > 0 
            ? this.state.data.map(function(d, idx) {
                return (<li key={idx}> {d.title} </li>)
            })
            : <Label> no data </Label>
          }
    
        </>
    )
  }
}

export default Home
