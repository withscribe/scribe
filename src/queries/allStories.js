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
