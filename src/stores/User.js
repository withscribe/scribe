import { types, flow } from 'mobx-state-tree'

import { client } from 'Services/Client'
import { addError } from 'Services/Errors'
import ProfileByIdQuery from 'Queries/userProfileById'
import { errorStore } from 'Components/App'
import StoryModel from './Story'

const ErrorModel = types
  .model('ErrorModel', {
    id: types.string,
    message: types.string,
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
    stories: types.optional(types.array(StoryModel), []),
  })

const UserStore = types
  .model('UserStore', {
    fetchingData: types.optional(types.boolean, false),
    pullingLoginData: types.optional(types.boolean, false),
    updatingUser: types.optional(types.boolean, false),
    loadingUser: types.optional(types.boolean, false),
    errors: types.optional(types.array(ErrorModel), []),
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
      const { data: { accountById } } = yield client.query({
        query: ProfileByIdQuery,
        variables: ({ id }),
        fetchPolicy: 'network-only',
      })

      const testError = {
        id: '182461823',
        message: 'Timeout from cDM',
      }

      errorStore.addError(testError)

      self.updatingUser = false
      self.setMe(accountById)
    })

    /**
     * Clears the User store of the current user (me)
     * @todo May need to be rewritten
     * @param {boolean} flag - Return value (Success/Fail) from resolving authStore.logoutUser
     */
    const removeMe = (flag) => {
      if (flag) self.me = null
    }

    return { pullMeById, refreshMeById, setMe, removeMe }
  })
  .views(self => ({
    get concatenatedName() {
      return self.me && self.me.firstName !== null && self.me.lastName != null ? `${self.me.firstName} ${self.me.lastName}` : '?'
    },

    get geterrors() {
      return self.errors
    },
  }))

export default UserStore
