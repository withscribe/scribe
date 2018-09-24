import { types, flow } from 'mobx-state-tree'

import { client } from '../services/Client'

import StoryModel from './Story'

import AllStories from 'Queries/allStories'

const StoryStore = types
  .model('StoryStore', {
    fetchingData: types.optional(types.boolean, false),
    dataFetched: types.optional(types.boolean, false),
    stories: types.optional(types.array(StoryModel), []),
    selectedStory: types.optional(types.string, ''),
  })
  .actions((self) => {
    const setStories = (stuff) => {
      self.stories = stuff
    }
    const setActiveStory = (storyId) => {
      console.log("ID ----> ", storyId)
      self.selectedStory = storyId
    }
    const getAllStories = flow(function* () {
      self.fetchingData = true
      const { data: { allStories } } = yield client.query({
        query: AllStories,
      })
      self.setStories(allStories)
    })

    return { getAllStories, setStories, setActiveStory }
  })
  .views(self => ({
    get storyLength() {
      return self.stories.length
    },
    get getActiveStory() {
      console.log("in get active story")
      console.log(self.selectedStory)      
      return self.selectedStory
    },
  }))

export default StoryStore
