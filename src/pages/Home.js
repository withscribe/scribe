import React from 'react'
import { inject, observer } from 'mobx-react'
import { Link, withRouter } from 'react-router-dom'

import Input, {
  Label, InlineLabel, InlineInput, TextArea, Button,
} from '../styled/_system/Input'


@inject('storiesStore')
@observer
class Home extends React.Component {
  state = {}

  componentDidMount() {
    const { storiesStore } = this.props
    storiesStore.getAllStories()
  }

  setActiveStory = (storyId) => {
    const { storiesStore } = this.props
    console.log(storyId)
    storiesStore.setActiveStory(storyId)
    this.props.history.push('/StoryPreview')
  }

  render() {
    const { storiesStore } = this.props
    return (
        <>
          {
            storiesStore.loadingStoryData
              ? <span>Stories Loaded</span>
              : <span>Stories Loading</span>
          }
          {storiesStore.stories.length > 0
            ? (
              <ul>
                {
                  storiesStore.stories.map(story => (
                    <div key={story.id}>
                      <li>{story.title}</li>
                      <Button onClick={() => this.setActiveStory(story.id)}> View  </Button>
                    </div>
                  ))
                }
              </ul>
            )
            : <span>nothing to see here</span>
          }
    
        </>
    )
  }
}

export default Home
