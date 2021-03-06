import { types, flow } from 'mobx-state-tree'

import { client } from 'Services/Client'
import submitStoryMutation from 'Mutations/submitStory'
import updateStoryMutation from 'Mutations/updateStory'
import contributeRequestMutation from 'Mutations/contributeRequest'
import revertStoryMutation from 'Mutations/revertStory'
import addStoryToCommunityMutation from 'Mutations/addStoryToCommunity'
import StoryByIdQuery from 'Queries/storyById'
import { toastStore } from 'Components/App'

const StoryEditorStore = types
  .model('StoryEditorModel', {
    saveInProgress: types.optional(types.boolean, false),
    sendingContributionRequest: types.optional(types.boolean, false),
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
    const submitStory = flow(function* (authorId, author, communityId) {
      try {
        self.saveInProgress = true
        const { title, description, content } = self
        const { data: { submitStory: { id } } } = yield client.mutate({
          mutation: submitStoryMutation,
          variables: ({
            title, author, description, content, authorId, communityId,
          }),
        })
        toastStore.addToast({
          message: 'Story has been created!',
          display: true,
          intent: 'success',
        })
        self.changeStoryId(id)
      } catch (err) {
        console.log(err)
        toastStore.addToast({
          message: 'Story failed to submit.',
          display: true,
          intent: 'danger',
        })
      } finally {
        self.saveInProgress = false
      }
    })

    /**
     * Story store function used to update the Story on the server
     * @function updateStory
     */
    const updateStory = flow(function* () {
      try {
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
        toastStore.addToast({
          message: 'Story has been updated!',
          display: true,
          intent: 'success',
        })
      } catch (err) {
        console.log(err)
        toastStore.addToast({
          message: 'Story failed to update.',
          display: true,
          intent: 'danger',
        })
      } finally {
        self.saveInProgress = false
      }
    })

    const sendContribution = flow(function* (contributorName) {
      try {
        self.sendingContributionRequest = true
        const { storyId, content } = self
        const { data: { contributeRequest: { id } } } = yield client.mutate({
          mutation: contributeRequestMutation,
          variables: ({
            storyId, content, contributorName,
          }),
        })
        toastStore.addToast({
          message: 'Contribution has been sent!',
          display: true,
          intent: 'success',
        })
      } catch (err) {
        console.log(err)
        toastStore.addToast({
          message: 'Failed to send contribution.',
          display: true,
          intent: 'danger',
        })
      } finally {
        self.sendingContributionRequest = false
      }
    })

    const revertStory = flow(function* (storyId, revisionId) {
      try {
        const { data: { revertStory: { id } } } = yield client.mutate({
          mutation: revertStoryMutation,
          variables: ({
            storyId,
            revisionId,
          }),
        })
        toastStore.addToast({
          message: 'Successfully Reverted Story.',
          display: true,
          intent: 'success',
        })
      } catch (err) {
        console.log('revertStory Error', err)
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
  .views(self => ({
    get isValid() {
      return self.title && self.description && self.content
    },
    isUserAuthor(userProfileId) {
      return self.authorId === userProfileId || self.nonAuthorId === userProfileId
    },
  }))

export default StoryEditorStore
