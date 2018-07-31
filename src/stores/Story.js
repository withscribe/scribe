import { types } from 'mobx-state-tree'

const StoryModel = types
  .model('StoryModel', {
    title: types.maybe(types.string),
    description: types.maybe(types.string),
    author: types.maybe(types.string),
    likes: types.maybe(types.number),
    genre: types.maybe(types.string),
  })
  .actions(self => ({
    changeTitle(newTitle) {
      self.title = newTitle
    },
  }))

export default StoryModel
