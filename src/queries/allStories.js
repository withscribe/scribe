import gql from 'graphql-tag'

const AllStories = gql`
  query allStories ($first: Int, $skip: Int) {
    allStories(first: $first, skip: $skip) {
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
      revisions {
        id
        title
        description
        content
      }
    }
  }
`

export default AllStories
