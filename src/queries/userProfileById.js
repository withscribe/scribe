import gql from 'graphql-tag'

const ProfileByIdQuery = gql`
  query accountById($id: ID!) {
    accountById(id: $id) {
      id
      email
      profile {
        id
        account_id
        userName
        firstName
        lastName
        occupation
        storiesLiked {
          id
          guid
        }
        nonOriginalStories {
          id
          title
          description
          isForked
          isCloned
        }
        originalStories {
          id
          title
          description
        }
      }
    }
  }
`

export default ProfileByIdQuery
