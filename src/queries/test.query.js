import gql from 'graphql-tag'

export const testQuery = gql`
  query {
    stories {
      title
    }
  }
`
