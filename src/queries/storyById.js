import gql from 'graphql-tag'

const StoryByIdQuery = gql`
  query storyById($storyId: ID!) {
    storyById(storyID: $storyId) {
      id
      parentStoryId
      title
      author
      authorId
      nonAuthorId
      isCloned
      isForked
      description
      content
      contributionPending
      likes
      usersWhoLiked {
        id
        guid
      }
      revisions {
        id
        title
        description
        content
        createdAt
      }
    }
  }
`

export default StoryByIdQuery
