import gql from 'graphql-tag'

const UpdateProfileMutation = gql`
  mutation updateProfile($accountId: ID!, $userName: String!, $firstName: String, $lastName: String, $occupation: String) {
    updateProfileWithAccount(accountId: $accountId, userName: $userName, firstName: $firstName, lastName: $lastName, occupation: $occupation) {
      userName
    }
  }
`

export default UpdateProfileMutation
