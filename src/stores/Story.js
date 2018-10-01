import { types, flow } from 'mobx-state-tree'

import { client } from '../services/Client'
import StoryByIdQuery from '../queries/storyById'
import cloneStoryMutation from '../mutations/clone'

import AllStories from 'Queries/allStories'

const ErrorModel = types
  .model('ErrorModel', {
    id: types.string,
    message: types.string,
  })

const StoryModel = types
  .model('StoryModel', {
    content: types.maybe(types.string),
    description: types.maybe(types.string),
    id: types.maybeNull(types.string),
    parentStoryId: types.maybeNull(types.string),
    profileId: types.maybeNull(types.string),
    title: types.maybe(types.string),
  })

const StoryStore = types
  .model('StoryStore', {
    fetchingStory: types.optional(types.boolean, false),
    fetchingStories: types.optional(types.boolean, false),
    errors: types.optional(types.array(ErrorModel), []),
    story: types.maybeNull(StoryModel),
    stories: types.optional(types.array(StoryModel), []),
    selectedStory: types.optional(types.string, ''),
  })
  .actions((self) => {
    const checkForClone = (story) => {
      console.log('Is it a clone?')
      console.log(story)
      if (!story.isCloned) {
        self.stories.push(story)
      }
    }
    
    const setStories = (stuff) => {
      stuff.map(checkForClone)
    }

    const setActiveStory = (storyId) => {
      console.log(`ID ---->  ${storyId}`)
      self.selectedStory = storyId
    }

    const getAllStories = flow(function* () {
      self.fetchingStories = true
      const { data: { allStories } } = yield client.query({
        query: AllStories,
      })
      self.setStories(allStories)
      self.fetchingStories = false
    })

    const changeTitle = (newTitle) => {
      self.title = newTitle
    }

    const getStory = flow(function* (storyId) {
      console.log(storyId)
      const { data: { storyById } } = yield client.query({
        query: StoryByIdQuery,
        variables: ({ storyId }),
      })
      console.log(storyById)
      self.setStory(storyById)
    })

    const setStory = (data) => {
      if (self.story == null) {
        self.story = StoryModel.create({
          ...data,
        })
        console.log(self.story)

        return
      }

      self.story = {
        ...data,
      }
    }

    const clone = flow(function* (parentStoryId, profileId) {
      const { data: { cloneStory } } = yield client.mutate({
        mutation: cloneStoryMutation,
        variables: ({ parentStoryId, profileId }),
      })
      console.log(cloneStory)
    })

    return {
      changeTitle,
      getStory,
      setStory,
      getAllStories,
      setStories,
      setActiveStory,
      clone,
    }
  })
  .views(self => ({
    get storyLength() {
      return self.stories.length
    },
    get getActiveStory() {
      console.log('in get active story')
      console.log(self.selectedStory)
      return self.selectedStory
    },
  }))

export default StoryStore
