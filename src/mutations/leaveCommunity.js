import gql from 'graphql-tag'

const leaveCommunityMutation = gql`
  mutation removeMemberFromCommunity($id: ID!, $profileId: ID!) {
    removeMemberFromCommunity(id: $id, profileId: $profileId) {
      id
    }
  }
`

export default leaveCommunityMutation
