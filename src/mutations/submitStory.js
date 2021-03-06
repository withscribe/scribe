import gql from 'graphql-tag'

const submitStoryMutation = gql`
  mutation submitStory($title: String!, $author: String!, $description: String!, $content: String!, $authorId: ID, $communityId: ID) {
    submitStory(title: $title, author: $author, description: $description, content: $content, authorId: $authorId, communityId: $communityId) {
      id
    }
  }
`

export default submitStoryMutation
