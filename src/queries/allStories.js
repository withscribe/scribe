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
    } 
  }
`

export default AllStories
