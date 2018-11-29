import gql from 'graphql-tag'

const cloneStoryMutation = gql`
    mutation cloneStoryMutation($parentStoryId: ID!, $nonAuthorId: ID!) {
        cloneStory(parentStoryId: $parentStoryId, nonAuthorId: $nonAuthorId) {
            id
            title
            description
            content
            author
            authorId
            nonAuthorId
            parentStoryId
        }
    }

`

export default cloneStoryMutation
