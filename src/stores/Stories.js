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
    const setStories = (stuff) => {
      console.log('in set stories')
      self.stories = stuff
      console.log(self.stories)   
      console.log(self.stories[0].title);
      
      console.log('stories object')
    }

    const getAllStories = flow(function* () {
      self.fetchingData = true
      const { data: { allStories } } = yield client.query({
        query: AllStories,
      })
      console.log(allStories)
      self.setStories(allStories)   
    })

    return { getAllStories, setStories }
  })
  .views(self => ({
    get storyLength() {
      return self.stories.length
    },
  }))

export default StoryStore
