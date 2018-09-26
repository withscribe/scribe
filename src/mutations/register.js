import gql from 'graphql-tag'

const registerMutation = gql`
  mutation register($userName: String!, $email: String!, $password: String!) {
    register(userName: $userName, email: $email, password: $password) {
      token
      account {
        id
      }
    }
  }
`

 export default registerMutation
