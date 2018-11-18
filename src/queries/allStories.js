import gql from 'graphql-tag'

const AllStories = gql`
  query {
    allStories {
      id
      title
      description
      content
      author
      authorId
      authorProfile {
        userName
      }
      nonAuthorId
      parentStoryId
      isCloned
      isForked
      likes
      usersWhoLiked {
          id
          guid
      }
    }
  }
`

export default AllStories
