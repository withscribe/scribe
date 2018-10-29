import gql from 'graphql-tag'

const ContributeRequestMutation = gql`
    mutation contributeRequest($storyId: ID!, $content: String!, $contributorName: String!) {
        contributeRequest(storyId: $storyId, content: $content, contributorName: $contributorName) {
            id
            forkId
            contributorName
            contributorProfileId
            authorProfileId
            originalStoryId
            originalContent
            contributionContent
            comment
        }
    }
`

export default ContributeRequestMutation
