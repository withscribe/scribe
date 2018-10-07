import gql from 'graphql-tag'

const AllStories = gql`
  query {
    allStories {
      id
      title
      description
      content
      profileId
      parentStoryId
      isCloned
      likes
      usersWhoLiked {
        profileId
      }
    } 
  }
`

export default AllStories
