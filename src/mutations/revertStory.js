import gql from 'graphql-tag'

const revertStoryMutation = gql`
  mutation revertStory($storyId: ID!, $revisionId, ID!){
    revertStory(storyId: $storyId, revisionId: $revisionId){
      id
    }
  }
`

export default revertStoryMutation
