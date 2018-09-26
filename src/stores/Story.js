import { types, flow } from 'mobx-state-tree'
import { client } from '../services/Client'
import StoryByIdQuery from '../queries/storyById'

const StoryModel = types
  .model('StoryModel', {
    content: types.maybe(types.string),
    description: types.maybe(types.string),
    id: types.maybeNull(types.string),
    parentStoryId: types.maybeNull(types.string),
    profileId: types.maybeNull(types.string),
    title: types.maybe(types.string),
  })
  .actions((self) => {
    const changeTitle = (newTitle) => {
      self.title = newTitle
    }

    const getStory = flow(function* (storyId) {
      console.log(storyId)
      const { story } = yield client.query({
        query: StoryByIdQuery,
        variables: ({ storyId })
      })
      console.log(story)
      self.title = story.title;
      self.description = story.description;
      self.content = story.content;
      self.profileId = story.profileId;
    })

    return {
      changeTitle,
      getStory
    }
  })

export default StoryModel
