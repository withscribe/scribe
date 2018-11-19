import gql from 'graphql-tag'

const RevisionByIdQuery = gql`
  query revisionById($id: ID!) {
    revisionById(id: $id) {
      id
      title
      description
      content
    }
  }
`

export default RevisionByIdQuery
