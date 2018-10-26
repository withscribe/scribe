import { types, flow } from 'mobx-state-tree'

import { client } from 'Services/Client'
import submitStoryMutation from 'Mutations/submitStory'
import updateStoryMutation from 'Mutations/updateStory'
import contributeRequestMutation from 'Mutations/contributeRequest'
import StoryByIdQuery from 'Queries/storyById'

const StoryEditorStore = types
  .model('StoryEditorModel', {
    saveInProgress: types.optional(types.boolean, false),
    storyId: types.maybe(types.string),
    title: types.maybe(types.string),
    description: types.maybe(types.string),
    content: types.maybe(types.string),
    isForked: types.optional(types.boolean, false),
    isCloned: types.optional(types.boolean, false),
    minAge: types.maybe(types.integer),
    maxAge: types.maybe(types.integer),
  })
  .actions((self) => {
    /**
     * Story store function used to alter the Story storyId
     * only to be used after submit or when importing a story into the editor
     * @function changeStoryId
     * @param {String} storyId - The value provided the through the props
     */
    const changeStoryId = (storyId) => {
      self.storyId = storyId
    }

    /**
     * Story store function used to alter the Story title
     * @function changeTitle
     * @param {String} newTitle - The value provided from the StoryEditor Title input
     */
    const changeTitle = (newTitle) => {
      self.title = newTitle
    }

    /**
     * Story store function used to alter the Story description
     * @function changeDesc
     * @param {String} newDesc - The value provided from the StoryEditor Description input
     */
    const changeDesc = (newDesc) => {
      self.description = newDesc
    }

    /**
     * Story store function used to alter the Story content
     * @function changeContent
     * @param {String} newContent - The value provided from the StoryEditor Content input
     */
    const changeContent = (newContent) => {
      self.content = newContent
    }

    /**
     * Story store function used to alter the Story Minimum Age
     * @function changeMinAge
     * @param {number} newMinAge - The value provided from the StoryEditor minAge input
     */
    const changeMinAge = (newMinAge) => {
      self.minAge = parseInt(newMinAge, 10)
    }

    /**
     * Story store function used to alter the Story Maximum
     * @function changeMaxAge
     * @param {number} newMaxAge - The value provided from the StoryEditor maxAge input
     */
    const changeMaxAge = (newMaxAge) => {
      self.maxAge = parseInt(newMaxAge, 10)
    }

    /**
     * Story store function used to initialise the Store to prevent input with null values
     * @function init
     */
    const init = () => {
      self.storyId = ''
      self.title = ''
      self.description = ''
      self.content = ''
      self.minAge = 1
      self.maxAge = 100
      self.saveInProgress = false
    }

    /**
     * Story store function used to pull a story from the server
     * Will call [setData] on successful pull
     * @function loadStory
     */
    const loadStory = flow(function* (storyId) {
      const { data: { storyById } } = yield client.query({
        query: StoryByIdQuery,
        variables: ({ storyId }),
      })
      console.log(storyById)
      self.setData(storyById)
    })

    /**
     * Story store function used to initialise the Store with values from [loadStory]
     * This is only meant to be called from [loadStory]
     * @function setData
     * @param {object} data - Story data returned from loadStory
     */
    const setData = (data) => {
      const {
        id, title, description, content, isForked, isCloned
      } = data
      self.storyId = id
      self.title = title
      self.description = description
      self.content = content
      self.isForked = isForked
      self.isCloned = isCloned
    }

    /**
     * Story store function used to submit the Story to the server
     * @function submitStory
     * @param {number} authorId - The ProfileId of the user submitting the Story
     */
    const submitStory = flow(function* (authorId, author) {
      //console.log(profileId)
      self.saveInProgress = true
      const { title, description, content } = self
      const { data: { submitStory: { id } } } = yield client.mutate({
        mutation: submitStoryMutation,
        variables: ({
          title, author, description, content, authorId,
        }),
      })
      console.log(`[storyEditorStore] submitStory: (resulting id) ${id}`)
      self.changeStoryId(id)
      self.saveInProgress = false
    })

    /**
     * Story store function used to update the Story on the server
     * @function updateStory
     */
    const updateStory = flow(function* () {
      self.saveInProgress = true
      const {
        storyId, title, description, content,
      } = self
      const { data: { updateStory: { id } } } = yield client.mutate({
        mutation: updateStoryMutation,
        variables: ({
          id: storyId, title, description, content,
        }),
      })
      console.log(`[storyEditorStore] updateStory: (resulting id) ${id}`)
      self.saveInProgress = false
    })

    const sendContribution = flow(function* () {
      const {
        storyId
      } = self
      const { data: { contributeRequest: { id } } } = yield client.mutate({
        mutation: contributeRequestMutation,
        variables: ({
         storyId
        }),
      })

      console.log(`[storyEditorStore] contributeRequest: (resulting id) ${id}`)
    })

    return {
      changeStoryId,
      changeTitle,
      changeDesc,
      changeContent,
      changeMinAge,
      changeMaxAge,
      init,
      submitStory,
      updateStory,
      loadStory,
      setData,
      sendContribution
    }
  })
  .views((self) => {
    const isAgeRangeValid = () => {
      const { minAge, maxAge } = self
      return !(minAge < 0 || maxAge > 150 || minAge > maxAge || maxAge < minAge)
    }

    const isValid = () => !self.title && !self.description && !self.content
      && !self.content && !self.minAge && !self.maxAge && !isAgeRangeValid()

    return { isAgeRangeValid, isValid }
  })

export default StoryEditorStore
