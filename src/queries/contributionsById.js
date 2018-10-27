import gql from 'graphql-tag'

const ContributionsByIdQuery = gql`
    query getContributionsById($authorProfileId: ID!) {
        getContributionsById(authorProfileId: $authorProfileId) {
            id
            forkId
            originalStoryId
            contributorProfileId
            authorProfileId
            originalContent
            contributionContent
            comment
        }
    }

`

export default ContributionsByIdQuery