import { types, flow } from 'mobx-state-tree'

import { client } from '../services/Client'

import StoryModel from './Story'

import AllStories from 'Queries/allStories'

const StoryStore = types
  .model('StoryStore', {
    fetchingData: types.optional(types.boolean, false),
    dataFetched: types.optional(types.boolean, false),
    stories: types.optional(types.array(StoryModel), []),
  })
  .actions((self) => {
    const getAllStories = flow(function* () {
      self.fetchingData = true
      const { data: { stories } } = yield client.query({
        query: AllStories,
      })
      console.log('inside story store actions')
      console.log(stories)
    })

    // const getAllStories = () => {
    //   console.log(self.fetchingData)
    // }

    return { getAllStories }
  })
  .views(self => ({
    get storyLength() {
      return self.stories.length
    },
  }))

export default StoryStore
