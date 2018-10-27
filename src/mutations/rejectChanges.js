import gql from 'graphql-tag'

const RejectChangesMutation = gql`
    mutation rejectChanges($contributionId: ID!) {
        rejectChanges(contributionId: $contributionId) {
            id
            authorId
            author
            nonAuthorId
            title
            description
            content
        }
    }

`

export default RejectChangesMutation