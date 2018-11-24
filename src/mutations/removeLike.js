import gql from 'graphql-tag'

const removeStoryLikeMutation = gql`
   mutation removeLike($storyId: ID!, $profileId: ID!) {
       removeLike(storyId: $storyId, profileId: $profileId) {
           id
           likes
       }
   }
`

export default removeStoryLikeMutation