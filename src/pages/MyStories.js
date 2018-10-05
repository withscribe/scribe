import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import { Button } from '_system/Button'

@inject("userStore", "storyStore")
@observer
class MyStories extends React.Component {

    componentDidMount() {
        const { storyStore, userStore } = this.props
        storyStore.getAllStories()
    }

    previewStory(storyId) {
        const { storyStore } = this.props
        console.log(storyId)
        storyStore.setActiveStory(storyId)
        this.props.history.push(`/story/preview/${storyId}`)
    }

    render() {
        const { storyStore, userStore } = this.props
        return (
            <>
              {storyStore.fetchingStories ? 
                <span>Stories Loading</span> :
                <span>Stories Loaded</span>
              }
              {storyStore.stories.length > 0 ? (
                <ul>
                    {storyStore.usersStories(userStore.me.id).map(story => (
                        <div key={story.id}>
                            <li>{story.title}</li>
                            <Button primary onClick={() => this.previewStory(story.id)}>
                                View
                            </Button>
                        </div>
                    ))}
                </ul>
              ) : 
                <span>nothing to see here</span>
              }
          </>
        )
      }
}

MyStories.propTypes = {
    userStore: PropTypes.object.isRequired,
    storyStore: PropTypes.object.isRequired
}

export default MyStories