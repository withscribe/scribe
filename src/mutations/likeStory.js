import gql from 'graphql-tag'

const likeStoryMutation = gql`
   mutation likeStory($storyId: ID!, $profileId: ID!) {
       likeStory(storyId: $storyId, profileId: $profileId) {
           id
           likes
       }
   }
`

export default likeStoryMutation