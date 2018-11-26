import gql from 'graphql-tag'

const leaveCommunityMutation = gql`
  mutation removeMember($profileId: ID!, $communityId: ID!) {
    removeMember(profileId: $profileId, communityId: $communityId) {
      id
    }
  }
`

export default leaveCommunityMutation
