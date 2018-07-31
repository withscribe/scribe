import { types, flow } from 'mobx-state-tree'

import { client } from '../services/Client'
import testQuery from '../queries/test.query'

import StoryModel from './Story'


const UserModel = types
  .model('UserModel', {
    email: types.maybe(types.string),
    id: types.maybe(types.string),
  })

const UserStore = types
  .model('UserStore', {
    stories: types.optional(types.array(StoryModel), []),
    fetchingData: types.optional(types.boolean, false),
    updatingUser: types.optional(types.boolean, false),
    loadingUser: types.optional(types.boolean, false),
    // updatingUserErrors: types.optional(types.array, []),
    me: types.maybeNull(UserModel),
  })
  .actions((self) => {
    const fetchAllUsers = flow(function* () {
      self.fetchingData = true
      const { data: { allUsers } } = yield client.query({
        query: testQuery,
      })
      // self.stories = stories
      console.log(allUsers)
      self.fetchingData = false
    })

    const setMe = (data) => {
      console.log('i got called', data)
      self.me = UserModel.create({
        email: data.user.email,
        id: data.user.id,
      })
      console.log(self)
    }

    return { fetchAllUsers, setMe }
  })

export default UserStore
