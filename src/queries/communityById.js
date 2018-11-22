import gql from 'graphql-tag'

const CommunityById = gql`
  query communityById($id: ID!) {
    communityById(id: $id) {
      id
      name
      description
      members {
        userName
      }
      privacy
      bannedMembersIds
    }
  }
`

export default CommunityById
