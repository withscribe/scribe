import gql from 'graphql-tag'

const ContributeRequestMutation = gql`
    mutation contributeRequest($storyId: ID!) {
        contributeRequest(storyId: $storyId) {
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