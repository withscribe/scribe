import gql from 'graphql-tag'

const AllCommunities = gql`
  query {
    communities {
      name
      description
      privacy
    }
  }
`

export default AllCommunities
