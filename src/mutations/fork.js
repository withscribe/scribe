import gql from 'graphql-tag'

const forkStoryMutation = gql`
    mutation forkStory($parentStoryId: ID!, $nonAuthorId: ID!) {
        forkStory(parentStoryId: $parentStoryId, nonAuthorId: $nonAuthorId) {
            id
            parentStoryId
            author
            authorId
            nonAuthorId
            title
            description
            content
        }
    }
`

export default forkStoryMutation
