import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import StoryCard from 'Components/StoryCard'
import { HomeGrid } from '_system/Grid'
import { TitleText } from '_system/Typography'
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
    const { storyStore, history } = this.props
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
          {!storyStore.fetchingStories
            ? <>
              {storyStore.nonClonedStories.map(story => (
                /* we pass the history prop down to each card so we avoid a ton of
                  unnecessary working..
                  (not sure if it would even be a performance problem)
                */
                <StoryCard history={history} story={story} key={story.id} />
              ))}
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
