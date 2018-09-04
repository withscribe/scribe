import gql from 'graphql-tag'

const registerMutation = gql`
  mutation registerAccountWithProfile($userName: String!, $email: String!, $password: String!) {
    registerAccountWithProfile(userName: $userName, email: $email, password: $password) {
      token
      account {
        id
      }
    }
  }
`

 export default registerMutation
