import React from 'react'
import { Link } from 'react-router-dom'

import { Card, CardImage } from '_system/Card'
import { ButtonPrimary } from '_system/Button'
import {  CardTitle, CardDesc } from '_system/Typography'
import Badge from '_system/Badge'

const StoryCard = ({ story, wide }) => (
  <Card wide={wide} key={story.id}>
    <Link to={`/story/preview/${story.id}`}>
      <CardImage>
        <Badge>New</Badge>
        <h5>Likes: {story.likes}</h5>
        {/* <ButtonPrimary> */}
        {/*   View */}
        {/* </ButtonPrimary> */}
      </CardImage>
    </Link>
    <CardTitle>{story.title}</CardTitle>
    <CardDesc>{story.description}</CardDesc>
  </Card>
)

export default StoryCard
