import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Link, withRouter } from 'react-router-dom'

import Input, {
  Label, InlineLabel, InlineInput, TextArea, Button,
} from '../styled/_system/Input'


@inject('storyStore')
@observer
class Home extends React.Component {
  state = {}

  componentDidMount() {
    const { storyStore } = this.props
    storyStore.getAllStories()
  }

  setActiveStory = (storyId) => {
    const { storyStore } = this.props
    console.log(storyId)
    storyStore.setActiveStory(storyId)
    this.props.history.push(`/story/preview/${storyId}`)
  }

  render() {
    const { storyStore } = this.props
    console.log(storyStore.nonClonedStories)
    return (
        <>
          {storyStore.fetchingStories
            ? <span>Stories Loading</span>
            : <span>Stories Loaded</span>
          }
          {storyStore.stories.length > 0
            ? (
              <ul>
                {
                  storyStore.nonClonedStories.map(story => (
                    <div key={story.id}>
                      <li>{story.title}</li>
                      <Button onClick={() => this.setActiveStory(story.id)}>View</Button>
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

Home.propTypes = {
  storyStore: PropTypes.object.isRequired,
}

export default Home
