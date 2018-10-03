import gql from 'graphql-tag'

const UpdateProfileMutation = gql`
  mutation updateProfile($userName: String!, $firstName: String, $lastName: String, $occupation: String) {
    updateProfileWithAccount(userName: $userName, firstName: $firstName, lastName: $lastName, occupation: $occupation) {
      userName
    }
  }
`

export default UpdateProfileMutation
