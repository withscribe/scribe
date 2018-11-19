import { types, flow } from 'mobx-state-tree'

import { client } from 'Services/Client'
import submitStoryMutation from 'Mutations/submitStory'
import updateStoryMutation from 'Mutations/updateStory'
import contributeRequestMutation from 'Mutations/contributeRequest'
import revertStoryMutation from 'Mutations/revertStory'
import StoryByIdQuery from 'Queries/storyById'

const StoryEditorStore = types
  .model('StoryEditorModel', {
    saveInProgress: types.optional(types.boolean, false),
    storyId: types.maybe(types.string),
    title: types.maybe(types.string),
    description: types.maybe(types.string),
    content: types.maybe(types.string),
    nonAuthorId: types.maybeNull(types.string),
    authorId: types.maybe(types.string),
    isForked: types.optional(types.boolean, false),
    isCloned: types.optional(types.boolean, false),
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
     * Story store function used to initialise the Store to prevent input with null values
     * @function init
     */
    const init = () => {
      self.storyId = ''
      self.title = ''
      self.description = ''
      self.content = ''
      self.authorId = ''
      self.nonAuthorId = ''
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
        id, title, description, content, isForked, isCloned,
        authorId, nonAuthorId,
      } = data
      self.storyId = id
      self.title = title
      self.description = description
      self.content = content
      self.isForked = isForked
      self.isCloned = isCloned
      self.authorId = authorId
      self.nonAuthorId = nonAuthorId
    }

    /**
     * Story store function used to submit the Story to the server
     * @function submitStory
     * @param {number} authorId - The ProfileId of the user submitting the Story
     */
    const submitStory = flow(function* (authorId, author) {
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

    const sendContribution = flow(function* (contributorName) {
      const {
        storyId, content,
      } = self
      const { data: { contributeRequest: { id } } } = yield client.mutate({
        mutation: contributeRequestMutation,
        variables: ({
          storyId, content, contributorName
        }),
      })

      console.log(`[storyEditorStore] contributeRequest: (resulting id) ${id}`)
    })

    const revertStory = flow(function* (revisionId) {
      const { storyId } = self
      try {
        const { data: { revertStory: { id } } } = yield client.mutate({
          mutation: revertStoryMutation,
          variables: ({
            storyId,
            revisionId,
          }),
        })
      } catch (err) {
        console.log('revertStory Error', err)
      } finally {
        // do something
      }
    })

    return {
      changeStoryId,
      changeTitle,
      changeDesc,
      changeContent,
      init,
      submitStory,
      updateStory,
      loadStory,
      setData,
      sendContribution,
      revertStory,
    }
  })
  .views((self) => {
    const isValid = () => !self.title && !self.description && !self.content

    return { isValid }
  })

export default StoryEditorStore
