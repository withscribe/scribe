import gql from 'graphql-tag'

const StoryByIdQuery = gql`
    query storyById($storyId: ID!) {
        storyById(storyID: $storyId) {
            id
            title
            content
        }
    }

`

export default StoryByIdQuery