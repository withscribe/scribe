import gql from 'graphql-tag'

const joinCommunityMutation = gql`
  mutation addMember($profileId: ID!, $communityId: ID!) {
    addMember(profileId: $profileId, communityId: $communityId) {
      id
    }
  }
`

export default joinCommunityMutation
