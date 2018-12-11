import gql from 'graphql-tag'

const ContributionsByIdQuery = gql`
  query getContributionsById($authorProfileId: ID!) {
    getContributionsById(authorProfileId: $authorProfileId) {
      id
      forkId
      originalStoryId
      contributorName
      contributorProfileId
      authorProfileId
      originalContent
      contributionContent
      comment
      createdAt
      updatedAt
    }
  }
`

export default ContributionsByIdQuery
