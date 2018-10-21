import gql from 'graphql-tag'

const likeStoryMutation = gql`
   mutation likeStory($storyId: ID!, $profileId: ID!) {
       like(storyId: $storyId) {
           id
           likes
       }
   }
`

export default likeStoryMutation