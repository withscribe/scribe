import gql from 'graphql-tag'

const submitStoryMutation = gql`
  mutation submitStory($title: String!, $author: String!, $description: String!, $content: String, $profileId: ID){
    submitStory(title: $title, author: $author, description: $description, content: $content, profileId: $profileId){
      id
    }
  }
`

export default submitStoryMutation
