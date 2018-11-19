import { types, flow, destroy, applySnapshot } from 'mobx-state-tree'

import { client } from 'Services/Client'
import StoryByIdQuery from 'Queries/storyById'
import RevisionByIdQuery from 'Queries/revisionById'
import cloneStoryMutation from 'Mutations/clone'
import likeStoryMutation from 'Mutations/like'
import forkStoryMutation from 'Mutations/fork'
import AllStories from 'Queries/allStories'

// const AuthorModel = types
//   .model('AuthorModel', {
//     id: types.string,
//     userName: types.string,
//   })

const LikesModel = types
  .model('LikesModel', {
    id: types.string,
    guid: types.string,
  })

const RevisionModel = types
  .model('LikesModel', {
    id: types.maybeNull(types.string),
    title: types.maybe(types.string),
    content: types.maybe(types.string),
    description: types.maybe(types.string),
    createdAt: types.Date,
  })

const StoryModel = types
  .model('StoryModel', {
    content: types.maybe(types.string),
    description: types.maybe(types.string),
    id: types.maybeNull(types.string),
    parentStoryId: types.maybeNull(types.string),
    authorId: types.string,
    nonAuthorId: types.maybeNull(types.string),
    title: types.maybe(types.string),
    isCloned: types.boolean,
    isForked: types.boolean,
    author: types.maybeNull(types.string),
    likes: types.maybeNull(types.integer),
    contributionPending: types.maybeNull(types.boolean),
    usersWhoLiked: types.array(LikesModel),
    revisions: types.array(RevisionModel),
    // nonAuthorProfile: types.maybe(AuthorModel)
  })

const StoryStore = types
  .model('StoryStore', {
    fetchingStories: types.optional(types.boolean, false),
    fetchingStory: types.optional(types.boolean, false),
    fetchingRevision: types.optional(types.boolean, false),
    stories: types.array(StoryModel),
    story: types.maybeNull(StoryModel),
    revision: types.maybeNull(RevisionModel),
    cloningStory: types.optional(types.boolean, false),
    currentCloneId: types.maybe(types.string),
  })
  .actions((self) => {
    /**
     * Story store function used to attach array of
     * stories to the store
     * @function setStories
     * @param {Array} StoryModel - The Array of StoryModels returned from getAllStories
    */
    const setStories = (stories) => {
      applySnapshot(self.stories, stories)
    }
    /**
     * Story store function used to retrieve the list of
     * all public stories
     * @function getAllStories
    */
    const getAllStories = flow(function* () {
      try {
        self.fetchingStories = true
        const { data: { allStories } } = yield client.query({
          query: AllStories,
          fetchPolicy: 'network-only',
        })
        self.setStories(allStories)
      } catch (err) {
        console.log('something went wrong inside of getAllStories', err)
      } finally {
        self.fetchingStories = false
      }
    })
    /**
     * Story store function used to retrieve a specific story
     * by passing the requested story's ID
     * @function getStory
     * @param {String} storyId - The ID of the request story
     */
    const getStory = flow(function* (storyId) {
      try {
        self.fetchingStory = true
        const { data: { storyById } } = yield client.query({
          query: StoryByIdQuery,
          variables: ({ storyId }),
          fetchPolicy: 'network-only',
        })
        self.setStory(storyById)
      } catch (err) {
        console.log('somethign went wrong inside of getStory')
      } finally {
        self.fetchingStory = false
      }
    })
    /**
     * Revision store function used to retrieve a specific revision
     * by passing the requested revision's ID
     * @function getRevision
     * @param {String} revisionId - The ID of the request revision
     */
    const getRevision = flow(function* (revisionId) {
      try {
        self.fetchingRevision = true
        const { data: { revisionById } } = yield client.query({
          query: RevisionByIdQuery,
          variables: ({ revisionId }),
          fetchPolicy: 'network-only',
        })
        self.setRevision(revisionById)
      } catch (err) {
        console.log('somethign went wrong inside of getRevision')
      } finally {
        self.fetchingRevision = false
      }
    })
    /**
     * Story store function used to attach a single requested
     * story to the store
     * @function setStory
     * @param {String} story - StoryModel returned from getStory
     */
    const setStory = (story) => {
      // if (self.story == null) {
      //   self.story = StoryModel.create({
      //     ...story,
      //   })
      //   return
      // }
      self.story = { ...story }

      // applySnapshot(self.story, ...story)
    }
    /**
     * Revision store function used to attach a single requested
     * revision to the store
     * @function setRevision
     * @param {String} revision - RevisionModel returned from getRevision
     */
    const setRevision = (revision) => {
      // if (self.revision == null) {
      //   self.revision = RevisionModel.create({
      //     ...revision,
      //   })
      //   return
      // }
      self.revision = { ...revision }

      // applySnapshot(self.revision, ...revision)
    }
    /**
     * Story store function used to clone (make a copy) of an existing story
     * and attaching it to the user who initiated the clone
     * @function clone
     * @param {String} parentStoryId - The ID of the original story
     * @param {String} nonAuthorId - The ID of the user who initiated the clone
    */
    const clone = flow(function* (parentStoryId, nonAuthorId) {
      self.cloningStory = true
      const { data: { cloneStory: { id } } } = yield client.mutate({
        mutation: cloneStoryMutation,
        variables: ({ parentStoryId, nonAuthorId }),
      })
      self.cloningStory = false
      self.setCurrentCloneId(id)
    })
    /**
     * Story store function used to attach the current
     * ID of the cloned story
     * @function setCurrentCloneId
     * @param {String} cloneId - The ID of the new cloned story
    */
    const setCurrentCloneId = (cloneId) => {
      self.currentCloneId = cloneId
    }
    /**
     * Story store function set likes to a specific story
     * @function likeStory
     * @param {String} storyId - The ID of the story to be liked
    */
    const likeStory = flow(function* (storyId) {
      const { data: { likeStory } } = yield client.mutate({
        mutation: likeStoryMutation,
        variables: ({ storyId }),
      })
    })
    /**
     * Story store function that forks the requested story
     * @function forkStory
     * @param {String} parentStoryId - The ID of the story to be forked
     * @param {String} nonAuthorId - The ID of the user profile that requested the fork
    */
    const forkStory = flow(function* (parentStoryId, nonAuthorId) {
      const { data: { forkStory } } = yield client.mutate({
        mutation: forkStoryMutation,
        variables: ({ parentStoryId, nonAuthorId }),
      })
    })

    const destroyLoadedStory = () => {
      destroy(self.story)
    }

    return {
      setStories,
      getAllStories,
      getStory,
      getRevision,
      setStory,
      setRevision,
      clone,
      setCurrentCloneId,
      likeStory,
      forkStory,
      destroyLoadedStory,
    }
  })
  .views(self => ({
    get getActiveStory() {
      return self.selectedStory
    },
    get nonClonedStories() {
      return self.stories.filter(story => !story.isCloned && !story.isForked)
    },
    usersStories(id) {
      return self.stories.filter(story => story.authorId === id || story.nonAuthorId === id)
    },
    isForked() {
      if (self.story.isForked) {
        return true
      }
      return false
    },
    isAuthor(profileId) {
      if (self.story.authorId === profileId) {
        return true
      }
      return false
    },
  }))

export default StoryStore
