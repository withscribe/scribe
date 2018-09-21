import { types, flow } from 'mobx-state-tree'

import { client } from '../services/Client'

import StoryModel from './Story'

import AllStories from 'Queries/allStories'

const StoryStore = types
  .model('StoryStory', {
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
    return { getAllStories }
  })
  .views(self => ({
    get storyLength() {
      return self.stories.length
    },
  }))

export default StoryStore
