import gql from 'graphql-tag'

const ApproveChangesMutation = gql`
    mutation approveChanges($contributionId: ID!) {
        approveChanges(contributionId: $contributionId) {
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

export default ApproveChangesMutation