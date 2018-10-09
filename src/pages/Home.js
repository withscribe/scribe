import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import StoryCard from 'Components/StoryCard'
import { HomeGrid } from '_system/Grid'
import { Card } from '_system/Card'
import { TitleText } from '_system/Typography'
import { ButtonPrimary } from '_system/Button'
import { GhostWrapper, GhostSmall } from '_system/Ghost'

@inject('storyStore')
@observer
class Home extends React.Component {
  state = {}

  componentDidMount() {
    const { storyStore } = this.props
    storyStore.getAllStories()
  }

  render() {
    const { storyStore } = this.props
    return (
      <>
        <TitleText>Discover</TitleText>
        <GhostWrapper isDoneRendering={storyStore.fetchingStories}>
          <HomeGrid>
            <GhostSmall style={{ backgroundColor: '#efefef' }} />
            <GhostSmall style={{ backgroundColor: '#efefef' }} />
            <GhostSmall style={{ backgroundColor: '#efefef' }} />
            <GhostSmall style={{ backgroundColor: '#efefef' }} />
          </HomeGrid>
        </GhostWrapper>
        <HomeGrid>
          {storyStore.stories && !storyStore.fetchingStories
            ? <>
              {storyStore.nonClonedStories.map((story) => {
                // <StoryCard story={story} key={story.id} />
                // ^^^ this makes mst bitch
                // You are trying to read or write to an object that is no longer part of a state tree.
                // Putting the contents of the function (instead of the function) seems to fix it....
                // https://github.com/mobxjs/mobx-state-tree/issues/912
                const wide = story.id.includes('q4')
                return (
                  <Card wide={wide} key={story.id}>
                    <span>{story.title}</span>
                    <span>{story.id}</span>
                    <h5>Likes: {story.likes}</h5>
                    <Link to={`/story/preview/${story.id}`}>
                      <ButtonPrimary>
                        View
                      </ButtonPrimary>
                    </Link>
                  </Card>
                )
              })}
            </>
            : <span>nothing to see here</span>
          }
        </HomeGrid>
      </>
    )
  }
}

Home.propTypes = {
  storyStore: PropTypes.object.isRequired,
}

export default Home
