import React from 'react'
import { Link } from 'react-router-dom'

import {
  Card, CardImage, CardBadgeWrapper, CardLikeWrapper, CardLikeAction, CardLikeText,
} from '_system/Card'
import { CardTitle, CardDesc } from '_system/Typography'
import Badge from '_system/Badge'

const StoryCard = ({ story, wide, grad }) => (
  <Card wide={wide} key={story.id}>
    <Link to={`/story/preview/${story.id}`}>
      <CardImage grad={grad}>
        <CardBadgeWrapper>
          <Badge>New</Badge>
        </CardBadgeWrapper>
        <CardLikeWrapper>
          <CardLikeAction>+</CardLikeAction>
          <CardLikeText>Like {story.likes}</CardLikeText>
        </CardLikeWrapper>
      </CardImage>
    </Link>
    <CardTitle>{story.title}</CardTitle>
    <CardDesc>{story.description}</CardDesc>
  </Card>
)

const ProfileStoryCard = ({ story }) => {
  let generatedLink = `/story/preview/${story.id}`
  if (story.isForked) {
    generatedLink = `/story/preview/fork/${story.id}`
  } else if (story.isCloned) {
    generatedLink = `story/preview/clone/${story.id}`
  }
  return (
    <Card>
      <Link to={generatedLink}>
        <CardImage>
          <CardBadgeWrapper>
            {story.isForked
              && <Badge>Fork</Badge>
            }
            {story.isCloned
              && <Badge>Clone</Badge>
            }
          </CardBadgeWrapper>
        </CardImage>
      </Link>
      <CardTitle>{story.title}</CardTitle>
      <CardDesc>{story.description}</CardDesc>
    </Card>
  )
}

export default StoryCard

export {
  ProfileStoryCard,
}
