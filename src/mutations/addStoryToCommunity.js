import gql from 'graphql-tag'

const addStoryToCommunityMutation = gql`
  mutation addStoryToCommunity($id: ID!, $storyId: ID!) {
    addStoryToCommunity(id: $id, storyId: $storyId) {
      id
    }
  }
`

export default addStoryToCommunityMutation
