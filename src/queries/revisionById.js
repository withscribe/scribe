import gql from 'graphql-tag'

const RevisionByIdQuery = gql`
  query revisionById($revisionId: ID!) {
    revisionById(revisionID: $revisionId) {
      id
      title
      description
      content
    }
  }
`

export default RevisionByIdQuery
