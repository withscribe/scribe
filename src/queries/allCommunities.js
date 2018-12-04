import gql from 'graphql-tag'

const AllCommunities = gql`
  query {
    communities {
      id
      name
      description
      members {
        userName
      }
      stories {
        id
      }
      privacy
      bannedMembersIds
    }
  }
`

export default AllCommunities
