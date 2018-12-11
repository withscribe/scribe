import { types, flow, destroy, getSnapshot, applySnapshot } from 'mobx-state-tree'

import { client } from 'Services/Client'
import ProfileByIdQuery from 'Queries/userProfileById'
import UpdateProfileMutation from 'Mutations/updateProfile'
import likeStoryMutation from 'Mutations/like'
import removeStoryLikeMutation from 'Mutations/removeLike'
import joinCommunityMutation from 'Mutations/joinCommunity'
import leaveCommunityMutation from 'Mutations/leaveCommunity'
import { toastStore } from 'Components/App'

const StoryModel = types
  .model('StoryModel', {
    id: types.string,
    title: types.string,
    description: types.string,
    isForked: types.optional(types.boolean, false),
    isCloned: types.optional(types.boolean, false),
  })

const LikesModel = types
  .model('LikesModel', {
    id: types.string,
    guid: types.string,
  })

const temp__CommunityModel = types
  .model('CommunityModel', {
    id: types.string,
    name: types.string,
  })

const UserModel = types
  .model('UserModel', {
    email: types.string,
    id: types.string,
    account_id: types.string,
    firstName: types.maybeNull(types.string),
    lastName: types.maybeNull(types.string),
    userName: types.string,
    occupation: types.maybeNull(types.string),
    originalStories: types.array(StoryModel),
    nonOriginalStories: types.array(StoryModel),
    storiesLiked: types.array(LikesModel),
    communities: types.array(temp__CommunityModel),
  })

const UserStore = types
  .model('UserStore', {
    fetchingData: types.optional(types.boolean, false),
    pullingLoginData: types.optional(types.boolean, false),
    updatingUser: types.optional(types.boolean, false),
    loadingUser: types.optional(types.boolean, false),
    updatingProfile: types.optional(types.boolean, false),
    isEditingProfile: types.optional(types.boolean, false),
    me: types.maybeNull(UserModel),
  })
  .actions((self) => {
    /**
     * User store function used as a 'callback' when calling pullMeById
     * @function setMe
     * @param {object} data - The return value from pullMeById containing user data
     */
    const setMe = (data) => {
      const { profile } = data
      console.log(`[userStore] setMe was called ${data}`)
      if (self.me === null) {
        console.log(`[userStore] 'me' isn't created yet... creating`)
        self.me = UserModel.create({
          ...data,
          ...profile,
        })
        return
      }
      console.log(`[userStore] 'me' exists... patching`)
      self.me = {
        ...data,
        ...profile,
      }
    }

    /**
     * User store function that is intended to pull only the current Users data on [persisted/] login
     * @async
     * @function pullMeById
     * @param {string} id - The current Users id
     */
    const pullMeById = flow(function* (id) {
      console.log(`[userStore] pullMeById: (account_id) ${id}`)
      self.pullingLoginData = true
      const { data: { accountById } } = yield client.query({
        query: ProfileByIdQuery,
        variables: ({ id }),
      })
      self.pullingLoginData = false
      self.setMe(accountById)
    })

    /**
     * User store function that is intended to pull only the current Users data
     * @async
     * @function refreshMeById
     * @param {string} id - The current Users account_id
     */
    const refreshMeById = flow(function* (id) {
      console.log(`[userStore] refreshMeById: (account_id) ${id}`)
      self.updatingUser = true
      try {
        const { data: { accountById } } = yield client.query({
          query: ProfileByIdQuery,
          variables: ({ id }),
          fetchPolicy: 'network-only',
        })
        self.updatingUser = false
        self.setMe(accountById)
      } catch (err) {
        self.updatingUser = false
        toastStore.addToast({
          id: `${Math.random()}`,
          message: 'Something went wrong while refreshing your profile',
          display: true,
          intent: 'warning',
        })
      }
    })

    /**
     * User store function that saves the edited users profile information
     * @async
     * @function saveProfileChanges
     */
    const saveProfileChanges = flow(function* () {
      self.isEditingProfile = false
      self.updatingProfile = true
      const values = self.me
      try {
        yield client.mutate({
          mutation: UpdateProfileMutation,
          variables: ({ ...values, accountId: values.account_id }),
        })
      } catch (err) {
        self.updatingProfile = false
        self.isEditingProfile = true
        toastStore.addToast({
          id: `${Math.random()}`,
          message: 'Something went wrong while updating your profile',
          display: true,
          intent: 'warning',
        })
      }
    })

    /**
     * User store function to like a story
     * @function likeStory
     * @async
     * @param {String} storyId - The ID of the story to be liked
    */
    const likeStory = flow(function* (storyId) {
      const { data: { likeStory } } = yield client.mutate({
        mutation: likeStoryMutation,
        variables: ({ storyId }),
      })
    })

    /**
     * User store function to remove a like on a story
     * @function likeStory
     * @async
     * @param {String} storyId - The ID of the story to be liked
     * @param {String} profileId - The ID of the profile unliking
    */
    const unlikeStory = flow(function* (storyId, profileId) {
      const { data: { removeLike } } = yield client.mutate({
        mutation: removeStoryLikeMutation,
        variables: ({ storyId, profileId }),
      })
    })

    const joinCommunity = flow(function* (profileId, communityId) {
      const { data } = yield client.mutate({
        mutation: joinCommunityMutation,
        variables: ({ profileId, communityId }),
      })
      self.refreshMeById(self.me.account_id)
    })

    const leaveCommunity = flow(function* (profileId, communityId) {
      const { data } = yield client.mutate({
        mutation: leaveCommunityMutation,
        variables: ({ profileId, communityId }),
      })
      self.refreshMeById(self.me.account_id)
    })

    const changeEmail = (newEmail) => {
      self.me.email = newEmail
    }
    const changefirstName = (newfirstName) => {
      self.me.firstName = newfirstName
    }
    const changelastName = (newlastName) => {
      self.me.lastName = newlastName
    }
    const changeOccupation = (newOccupation) => {
      self.me.occupation = newOccupation
    }
    const changeuserName = (newuserName) => {
      self.me.userName = newuserName
    }

    /**
     * Clears the User store of the current user (me)
     * @todo May need to be rewritten
     * @param {boolean} flag - Return value (Success/Fail) from resolving authStore.logoutUser
     */
    const removeMe = (flag) => {
      if (flag) destroy(self.me)
    }

    return {
      pullMeById,
      refreshMeById,
      setMe,
      removeMe,
      saveProfileChanges,
      changeEmail,
      changefirstName,
      changelastName,
      changeOccupation,
      changeuserName,
      likeStory,
      unlikeStory,
      joinCommunity,
      leaveCommunity,
    }
  })
  .views(self => ({
    get forkedStories() {
      return self.me.nonOriginalStories.filter(story => story.isForked)
    },
    get clonedStories() {
      return self.me.nonOriginalStories.filter(story => story.isCloned)
    },
    get concatenatedName() {
      return self.me && self.me.firstName !== null && self.me.lastName != null ? `${self.me.firstName} ${self.me.lastName}` : '?'
    },
    get geterrors() {
      return self.errors
    },
  }))

export default UserStore
