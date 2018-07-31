import { types, flow } from 'mobx-state-tree'

import { client } from '../services/Client'
import { testQuery } from '../queries/test.query'

import StoryModel from './Story'


const UserModel = types
  .model('UserModel', {
    name: types.maybe(types.string),
  })

const UserStore = types
  .model('UserStore', {
    stories: types.optional(types.array(StoryModel), []),
    fetchingData: types.optional(types.boolean, false),
    updatingUser: types.optional(types.boolean, false),
    loadingUser: types.optional(types.boolean, false),
    // updatingUserErrors: types.optional(types.array, []),
    me: types.maybe(UserModel),
  })
  .actions((self) => {
    const fetchAllStories = flow(function* () {
      self.fetchingData = true
      const { data: { stories } } = yield client.query({
        query: testQuery,
      })
      self.stories = stories
      self.fetchingData = false
    })
    return { fetchAllStories }
  })

export default UserStore
