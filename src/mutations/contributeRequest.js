import gql from 'graphql-tag'

const ContributeRequestMutation = gql`
    mutation contributeRequest($storyId: ID!, $content: String!) {
        contributeRequest(storyId: $storyId, content: $content) {
            id
            forkId
            contributorProfileId
            authorProfileId
            originalContent
            contributionContent
            comment
        }
    }
`

export default ContributeRequestMutation