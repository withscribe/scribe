import gql from 'graphql-tag'

const AllCommunities = gql`
  query {
    communities {
      id
      name
      description
      membersIds
      privacy
      bannedMembersIds
    }
  }
`

export default AllCommunities
