import gql from 'graphql-tag'

const joinCommunityMutation = gql`
  mutation addMemberToCommunity($profileId: ID!, $communityId: ID!) {
    addMemberToCommunity(profileId: $profileId, communityId: $communityId) {
      id
    }
  }
`

export default joinCommunityMutation
