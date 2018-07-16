import { types, flow } from 'mobx-state-tree'

const StoryModel = types
  .model('StoryModel', {
    title: types.maybe(types.string),
    description: types.maybe(types.string),
    author: types.maybe(types.string),
    likes: types.maybe(types.number),
    genre: types.maybe(types.string),
  })
  .views(self => ({}))
  .actions(self => ({
    changeTitle(newTitle) {
      self.title = newTitle
    },
  }))

const UserStore = types
  .model('UserStore', {
    stories: types.optional(types.maybe(StoryModel), null),
  })
  .views(self => ({}))
  .actions(self => ({}))


export { StoryModel, UserStore }
