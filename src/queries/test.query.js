import gql from 'graphql-tag'

export default gql`
  query queryAll {
    allUsers {
      email
    }
  }
`
