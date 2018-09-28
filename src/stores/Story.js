import { types, flow } from 'mobx-state-tree'

import { client } from '../services/Client'
import StoryByIdQuery from '../queries/storyById'

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
    updatingStory: types.optional(types.boolean, false),
    errors: types.optional(types.array(ErrorModel), []),
    story: types.maybeNull(StoryModel),
  })
  .actions((self) => {
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

    return {
      changeTitle,
      getStory,
      setStory,
    }
  })

export default StoryStore
