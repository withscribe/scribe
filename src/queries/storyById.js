import gql from 'graphql-tag'

const StoryByIdQuery = gql`
    query storyById($storyId: ID!) {
        storyById(storyID: $storyId) {
            id
            title
            author
            isCloned
            description
            content
            profileId
        }
    }

`

export default StoryByIdQuery