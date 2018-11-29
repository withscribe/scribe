import gql from 'graphql-tag'

const CommunityByName = gql`
  query communityByName($name: String!) {
    communityByName(name: $name) {
      id
      name
      description
      members {
        userName
      }
      stories {
        description
        id
        authorId
        title
        authorProfile {
          userName
        }
        likes
        usersWhoLiked {
          id
          guid
        }
      }
      privacy
      bannedMembersIds
    }
  }
`

export default CommunityByName
