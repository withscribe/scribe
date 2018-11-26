import gql from 'graphql-tag'

const ContributionByIdQuery = gql`
  query getContributionById($id: ID!) {
    getContributionById(id: $id) {
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

export default ContributionByIdQuery
