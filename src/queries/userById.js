import gql from 'graphql-tag'

const AccountByIdQuery = gql`
  query accountById($id: ID!) {
    accountById(id: $id) {
      id
      email
    }
  }
`

export default AccountByIdQuery
