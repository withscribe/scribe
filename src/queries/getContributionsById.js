import gql from 'graphql-tag'

const ContributionsByIdQuery = gql`
    query getContributionsById($authorProfileId: ID!) {
        getContributionsById(authorProfileId: $authorProfileId) {
            id
            forkId
            contributorProfileId
            authorProfileId
            content
            comment
        }
    }

`

export default ContributionsByIdQuery