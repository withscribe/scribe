import gql from 'graphql-tag'

const removeStoryLikeMutation = gql`
   mutation removeLike($storyId: ID!) {
       like(storyId: $storyId) {
           id
           likes
       }
   }
`

export default removeStoryLikeMutation
