import gql from 'graphql-tag'

const JoinCommunityMutation = gql`
  mutation addMemberToCommunity($profileId: ID!, $communityId: ID!) {
    addMemberToCommunity(profileId: $profileId, communityId: $communityId) {
      id
    }
  }
`

export default JoinCommunityMutation
