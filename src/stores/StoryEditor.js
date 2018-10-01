import { types, flow } from 'mobx-state-tree'

import { client } from 'Services/Client'
import submitStoryMutation from 'Mutations/submitStory'

const StoryEditorStore = types
  .model('StoryEditorModel', {
    saveInProgress: types.optional(types.boolean, false),
    title: types.maybe(types.string),
    description: types.maybe(types.string),
    content: types.maybe(types.string),
    minAge: types.maybe(types.integer),
    maxAge: types.maybe(types.integer),
  })
  .actions((self) => {
    const changeTitle = (newTitle) => {
      self.title = newTitle
    }

    const changeDesc = (newDesc) => {
      self.description = newDesc
    }

    const changeContent = (newContent) => {
      self.content = newContent
    }

    const changeMinAge = (newMinAge) => {
      self.minAge = parseInt(newMinAge, 10)
    }

    const changeMaxAge = (newMaxAge) => {
      self.maxAge = parseInt(newMaxAge, 10)
    }

    const init = () => {
      self.title = ''
      self.description = ''
      self.content = ''
      self.minAge = 1
      self.maxAge = 100
      self.saveInProgress = false
    }

    const submitStory = flow(function* (profileId) {
      self.saveInProgress = true
      const { title, description, content } = self
      const { id } = yield client.mutate({
        mutation: submitStoryMutation,
        variables: ({ title, description, content, profileId }),
      })
      console.log(`[storyEditorStore] submitStory: (resulting id) ${id}`)
      self.saveInProgress = false
    })

    return {
      changeTitle,
      changeDesc,
      changeContent,
      changeMinAge,
      changeMaxAge,
      init,
      submitStory,
    }
  })
  .views((self) => {
    const isAgeRangeValid = () => {
      const { minAge, maxAge } = self
      return !(minAge < 0 || maxAge > 150 || minAge > maxAge || maxAge < minAge)
    }

    const isValid = () => !self.title && !self.description && !self.content && !self.content && !self.minAge && !self.maxAge && !isAgeRangeValid()

    return { isAgeRangeValid, isValid }
  })

export default StoryEditorStore
