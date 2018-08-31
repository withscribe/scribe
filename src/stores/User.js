import { types, flow } from 'mobx-state-tree'

import { client } from '../services/Client'
import AccountByIdQuery from '../queries/userById'

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
    pullingLoginData: types.optional(types.boolean, false),
    updatingUser: types.optional(types.boolean, false),
    loadingUser: types.optional(types.boolean, false),
    // updatingUserErrors: types.optional(types.array, []),
    me: types.maybeNull(UserModel),
  })
  .actions((self) => {
    // const fetchAllUsers = flow(function* () {
    //   self.fetchingData = true
    //   const { data: { allUsers } } = yield client.query({
    //     query: testQuery,
    //   })
    //   // self.stories = stories
    //   console.log(allUsers)
    //   self.fetchingData = false
    // })

    const setMe = (data) => {
      console.log('i got called', data)
      self.me = UserModel.create({
        email: data.email,
        id: data.id,
      })
      console.log(self)
    }

    const pullMeById = flow(function* (id) {
      console.log('id:', id)
      self.pullingLoginData = true
      const { data: { account } } = yield client.query({
        query: AccountByIdQuery,
        variables: ({ id }),
      })
      console.log(account)
      self.pullingLoginData = false
      self.setMe(account)
    })

    const removeMe = (flag) => {
      if (flag) self.me = null
    }

    return { pullMeById, setMe, removeMe }
  })

export default UserStore
