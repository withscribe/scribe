import gql from 'graphql-tag'

const StoryByIdQuery = gql`
  query storyById($storyId: ID!) {
    storyById(storyID: $storyId) {
      id
      title
      description
      content
      author
      authorId
      nonAuthorId
      parentStoryId
      isCloned
      isForked
      contributionPending
      likes
      usersWhoLiked {
        id
        guid
      }
    }
  }
`

export default StoryByIdQuery
