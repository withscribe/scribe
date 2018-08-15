import gql from 'graphql-tag'

export default gql`
  query queryId($id: ID!) {
    findUserById(id: $id) {
      id
      email
    }
  }
`
