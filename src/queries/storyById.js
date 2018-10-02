import gql from 'graphql-tag'

const StoryByIdQuery = gql`
    query storyById($storyId: ID!) {
        storyById(storyID: $storyId) {
            id
            title
            description
            content
        }
    }

`

export default StoryByIdQuery