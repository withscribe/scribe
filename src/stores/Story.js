import { types } from 'mobx-state-tree'

const StoryModel = types
  .model('StoryModel', {
    content: types.maybe(types.string),
    description: types.maybe(types.string),
    id: types.maybeNull(types.string),
    parentStoryId: types.maybeNull(types.string),
    profileId: types.maybeNull(types.string),
    title: types.maybe(types.string),
  })
  .actions(self => ({
    changeTitle(newTitle) {
      self.title = newTitle
    },
  }))

export default StoryModel
