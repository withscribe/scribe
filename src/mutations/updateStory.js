import gql from 'graphql-tag'

const updateStoryMutation = gql`
  mutation updateStory($id: ID!, $title: String!, $description: String!, $content: String){
    updateStory(id: $id, title: $title, description: $description, content: $content){
      id
    }
  }
`

export default updateStoryMutation
