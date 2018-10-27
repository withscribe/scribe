import gql from 'graphql-tag'

const ContributionByIdQuery = gql`
    query getContributionById($id: ID!) {
        getContributionById(id: $id) {
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

export default ContributionByIdQuery