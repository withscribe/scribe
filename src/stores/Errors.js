import { types } from 'mobx-state-tree'

const ErrorModel = types
  .model('ErrorModel', {
    id: types.string,
    message: types.string,
    display: types.boolean,
  })

const ErrorStore = types
  .model('ErrorStore', {
    errors: types.optional(types.array(ErrorModel), []),
  })
  .actions(self => ({
    addError(err) {
      self.errors.push(err)
    },

    removeError(todo) {
      const err = self.errors.filter(v => v.id === todo)
      err[0].display = false
    },
  }))
  .views(self => ({
    get errorList() {
      return self.errors.filter(story => story.display === true)
    },
  }))

export default ErrorStore
