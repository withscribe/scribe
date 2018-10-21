import { types, flow, destroy, applySnapshot } from 'mobx-state-tree'

import { client } from 'Services/Client'
import StoryByIdQuery from 'Queries/storyById'
import cloneStoryMutation from 'Mutations/clone'
import likeStoryMutation from 'Mutations/like'
import AllStories from 'Queries/allStories'

const LikesModel = types
  .model('LikesModel', {
    profileId: types.maybeNull(types.string),
  })

const StoryModel = types
  .model('StoryModel', {
    content: types.maybe(types.string),
    description: types.maybe(types.string),
    id: types.maybeNull(types.string),
    parentStoryId: types.maybeNull(types.string),
    profileId: types.maybeNull(types.string),
    title: types.maybe(types.string),
    isCloned: types.maybe(types.boolean),
    author: types.maybeNull(types.string),
    likes: types.maybeNull(types.integer),
  })

const StoryStore = types
  .model('StoryStore', {
    fetchingStory: types.optional(types.boolean, false),
    fetchingStories: types.optional(types.boolean, false),
    story: types.maybeNull(StoryModel),
    stories: types.array(StoryModel),
    selectedStory: types.optional(types.string, ''),
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
      // self.stories = stories
    }
    /**
     * Story store function used to alter the selected story
     * @function setActiveStory
     * @param {String} storyId - The ID of the selected story
    */
    const setActiveStory = (storyId) => {
      self.selectedStory = storyId
    }
    /**
     * Story store function used to retrieve the list of
     * all public stories
     * @function getAllStories
    */
    const getAllStories = flow(function* () {
      self.fetchingStories = true
      const { data: { allStories } } = yield client.query({
        query: AllStories,
        fetchPolicy: 'network-only',
      })
      self.fetchingStories = false
      self.setStories(allStories)
    })
    /**
     * Story store function used to retrieve a specific story
     * by passing the requested story's ID
     * @function getStory
     * @param {String} storyId - The ID of the request story
    */
    const getStory = flow(function* (storyId) {
      const { data: { storyById } } = yield client.query({
        query: StoryByIdQuery,
        variables: ({ storyId }),
        fetchPolicy: 'network-only',
      })
      self.setStory(storyById)
    })
    /**
     * Story store function used to attach a single requested
     * story to the store
     * @function setStory
     * @param {String} story - StoryModel returned from getStory
    */
    const setStory = (story) => {
      if (self.story == null) {
        self.story = StoryModel.create({
          ...story,
        })
        return
      }

      self.story = {
        ...story,
      }
    }
    /**
     * Story store function used to clone (make a copy) of an existing story
     * and attaching it to the user who initiated the clone
     * @function clone
     * @param {String} parentStoryId - The ID of the original story
     * @param {String} profileId - The ID of the user who initiated the clone
    */
    const clone = flow(function* (parentStoryId, profileId) {
      self.cloningStory = true
      const { data: { cloneStory: { id } } } = yield client.mutate({
        mutation: cloneStoryMutation,
        variables: ({ parentStoryId, profileId }),
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
    //   /**
    //    * Story store function used set the user who liked the story
    //    * to the list of users who have also
    //    * @function setUserLike
    //    * @param {String} profileId - The ID of the user who liked the story
    //   */
    //  const setUserLike = (profileId) => {
    //    if(self.usersWhoLiked == null) {
    //      self.usersWhoLiked = []
    //    }

    //    if(!self.usersWhoLiked.includes(profileId)) {
    //      self.usersWhoLiked.push(profileId)
    //    }
    //    console.log(self.usersWhoLiked)
    //  }

    /**
     * Story store function set likes to a specific story
     * @function likeStory
     * @param {String} storyId - The ID of the story to be liked
     * @param {String} profileId - The ID of the user who liked the story
    */
    const likeStory = flow(function* (storyId) {
      const { data: { likeStory } } = yield client.mutate({
        mutation: likeStoryMutation,
        variables: ({ storyId }),
      })
    })

    return {
      setStories,
      setActiveStory,
      getAllStories,
      getStory,
      setStory,
      clone,
      setCurrentCloneId,
      likeStory,
    }
  })
  .views(self => ({
    get getActiveStory() {
      return self.selectedStory
    },
    get nonClonedStories() {
      return self.stories.filter(story => !story.parentStoryId)
    },
    usersStories(id) {
      return self.stories.filter(story => story.profileId === id)
    },
  }))

export default StoryStore
