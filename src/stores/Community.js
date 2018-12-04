import { types, flow, destroy, applySnapshot } from 'mobx-state-tree'

import { client } from 'Services/Client'
import { toastStore } from 'Components/App'
import AllCommunities from 'Queries/allCommunities'
import CommunityByName from 'Queries/communityByName'
import { AuthorModel, LikesModel } from 'Stores/Story'

const IdModel = types
  .model('IdModel', {
    id: types.string,
  })

const temp__UserModel = types
  .model('temp__UserModel', {
    userName: types.string,
  })

const StoryModel = types
  .model('StoryModel', {
    description: types.maybe(types.string),
    id: types.maybeNull(types.string),
    authorId: types.string,
    title: types.maybe(types.string),
    authorProfile: types.maybe(AuthorModel),
    likes: types.maybeNull(types.integer),
    usersWhoLiked: types.array(LikesModel),
  })

const CommunitiesModel = types
  .model('CommunitiesModel', {
    id: types.string,
    name: types.string,
    description: types.string,
    members: types.array(temp__UserModel),
    stories: types.array(IdModel),
    privacy: types.maybe(types.enumeration('Type', ['PUBLIC', 'PRIVATE', 'INVITE_ONLY'])),
    bannedMemberIds: types.array(IdModel),
  })

const CommunityModel = types
  .model('CommunityModel', {
    id: types.string,
    name: types.string,
    description: types.string,
    members: types.array(temp__UserModel),
    stories: types.array(StoryModel),
    privacy: types.maybe(types.enumeration('Type', ['PUBLIC', 'PRIVATE', 'INVITE_ONLY'])),
    bannedMembersIds: types.array(IdModel),
  })

const CommunityStore = types
  .model('CommunityStore', {
    fetchingCommunities: types.optional(types.boolean, false),
    fetchingCommunity: types.optional(types.boolean, false),
    community: types.maybeNull(CommunityModel),
    communities: types.array(CommunitiesModel),
  })
  .actions((self) => {
    /**
     * Community store function used to attach array of
     * communities to the store
     * @function setCommunities
     * @param {Array} CommunityModel - The Array of CommunityModels returned from getAllCommunities
    */
    const setCommunities = (communities) => {
      applySnapshot(self.communities, communities)
    }

    /**
     * Community store function used to attach a single requested
     * community to the store
     * @function setCommunity
     * @param {String} community - CommunityModel returned from getCommunity
     */
    const setCommunity = (community) => {
      self.community = { ...community }
    }

    /**
     * Community store function used to retrieve the list of
     * all public communities
     * @async
     * @function getAllCommunities
    */
    const getAllCommunities = flow(function* () {
      try {
        self.fetchingCommunities = true
        const { data: { communities } } = yield client.query({
          query: AllCommunities,
          fetchPolicy: 'network-only',
        })
        self.setCommunities(communities)
      } catch (err) {
        console.log('something went wrong inside of getAllCommunities', err)
      } finally {
        self.fetchingCommunities = false
      }
    })

    /**
     * Community store function used to retrieve a specific community
     * by passing the requested community's name
     * @function getStory
     * @async
     * @param {String} communityName - The name of the requested community
     */
    const getCommunity = flow(function* (communityName) {
      try {
        self.fetchingCommunity = true
        const { data: { communityByName } } = yield client.query({
          query: CommunityByName,
          variables: ({ name: communityName }),
          fetchPolicy: 'network-only',
        })
        // temp fix for array return- if it breaks this line below is why
        self.setCommunity(communityByName[0])
      } catch (err) {
        console.log('somethign went wrong inside of getCommunity')
      } finally {
        self.fetchingCommunity = false
      }
    })

    const destroyLoadedCommunity = () => {
      destroy(self.community)
    }

    return {
      setCommunities,
      setCommunity,
      getAllCommunities,
      getCommunity,
      destroyLoadedCommunity,
    }
  })
  .views(self => ({
    communityMemberCount(index) {
      return self.communities[index].memberIds.length
    },
    get memberCount() {
      return self.community.members.length
    },
    get storyCount() {
      return self.community.stories.length
    },
  }))

export default CommunityStore
