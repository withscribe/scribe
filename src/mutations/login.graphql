import gql from 'graphql-tag'

const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password, rememberMe: false) {
      token
      account {
        email,
        id
      }
    }
  }
`

export default loginMutation
