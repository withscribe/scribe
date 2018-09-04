import { types, flow } from 'mobx-state-tree'

import { client } from '../services/Client'
import AccountByIdQuery from '../queries/userById'
import ProfileByIdQuery from '../queries/userProfileById'

import StoryModel from './Story'


const UserModel = types
  .model('UserModel', {
    email: types.maybe(types.string),
    id: types.maybe(types.string),
    account_Id: types.maybe(types.string),
    firstName: types.maybe(types.string),
    lastName: types.maybe(types.string),
    userName: types.maybe(types.string),
    occupation: types.maybe(types.string),
    stories: types.optional(types.array(StoryModel), []),
  })

const UserStore = types
  .model('UserStore', {
    // stories: types.optional(types.array(StoryModel), []),
    fetchingData: types.optional(types.boolean, false),
    pullingLoginData: types.optional(types.boolean, false),
    updatingUser: types.optional(types.boolean, false),
    loadingUser: types.optional(types.boolean, false),
    // updatingUserErrors: types.optional(types.array, []),
    me: types.maybeNull(UserModel),
  })
  .actions((self) => {
    /**
     * User store function used as a 'callback' when calling pullMeById
     * @function setMe
     * @param {object} data - The return value from pullMeById containing user data
     */
    const setMe = (data) => {
      console.log('i got called', data)
      self.me = UserModel.create({
        email: data.email,
        id: data.id,
      })
      console.log(self)
    }

    /**
     * User store function that is intended to pull only the current Users data
     * @async
     * @function pullMeById
     * @param {string} id - The current Users id
     */
    const pullMeById = flow(function* (id) {
      console.log(`pulling id: ${id}`)
      self.pullingLoginData = true
      const { data: { accountById } } = yield client.query({
        query: ProfileByIdQuery,
        variables: ({ id }),
      })
      console.log(accountById)
      self.pullingLoginData = false
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

    return { pullMeById, setMe, removeMe }
  })

export default UserStore
