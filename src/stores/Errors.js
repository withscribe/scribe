import { types } from 'mobx-state-tree'

const ErrorModel = types
  .model('ErrorModel', {
    id: types.string,
    message: types.string,
  })

const ErrorStore = types
  .model('ErrorStore', {
    errors: types.optional(types.array(ErrorModel), []),
  })
  .actions((self) => {
    const addError = (err) => {
      self.errors.push(err)
    }

    return { addError }
  })

export default ErrorStore
