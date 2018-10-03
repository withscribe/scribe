import { types, flow } from 'mobx-state-tree'

import { client } from 'Services/Client'
import StoryByIdQuery from 'Queries/storyById'
import cloneStoryMutation from 'Mutations/clone'
import AllStories from 'Queries/allStories'

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
    story: types.maybeNull(StoryModel),
    stories: types.optional(types.array(StoryModel), []),
    selectedStory: types.optional(types.string, ''),
    cloningStory: types.optional(types.boolean, false),
    currentCloneId: types.maybe(types.string),
  })
  .actions((self) => {
    const setStories = (stories) => {
      self.stories = stories
    }

    const setActiveStory = (storyId) => {
      console.log(`[storyStore] setActiveStory: (storyId) ${storyId}`)
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

    const getStory = flow(function* (storyId) {
      console.log(`[storyStore] getStory: (storyId) ${storyId}`)
      const { data: { storyById } } = yield client.query({
        query: StoryByIdQuery,
        variables: ({ storyId }),
      })
      self.setStory(storyById)
    })

    const setStory = (data) => {
      console.log(`[storyStore] setStory: (data) ${data}`)
      if (self.story == null) {
        self.story = StoryModel.create({
          ...data,
        })
        return
      }

      self.story = {
        ...data,
      }
    }

    const clone = flow(function* (parentStoryId, profileId) {
      self.cloningStory = true
      const { data: { cloneStory: { id } } } = yield client.mutate({
        mutation: cloneStoryMutation,
        variables: ({ parentStoryId, profileId }),
      })
      self.cloningStory = false
      self.setCurrentCloneId(id)
    })

    const setCurrentCloneId = (cloneId) => {
      self.currentCloneId = cloneId
    }

    return {
      setStories,
      setActiveStory,
      getAllStories,
      getStory,
      setStory,
      clone,
      setCurrentCloneId,
    }
  })
  .views(self => ({
    get storyLength() {
      return self.stories.length
    },
    get getActiveStory() {
      console.log('[storyStore] getActiveStory')
      return self.selectedStory
    },
    get nonClonedStories() {
      return self.stories.filter(story => !story.parentStoryId)
    },
  }))

export default StoryStore
