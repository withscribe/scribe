import gql from 'graphql-tag'

const cloneStoryMutation = gql`
    mutation cloneStoryMutation($parentStoryId: ID!, $profileId: ID!) {
        cloneStory(parentStoryId: $parentStoryId, profileId: $profileId) {
            id
            title
            description
            content
            profileId
            parentStoryId
        }
    }

`

export default cloneStoryMutation
