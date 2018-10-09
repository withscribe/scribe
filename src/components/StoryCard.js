import React from 'react'
import { Link } from 'react-router-dom'

import { Card } from '_system/Card'
import { ButtonPrimary } from '_system/Button'

const StoryCard = ({ story }) => (
  <Card key={story.id}>
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

export default StoryCard
