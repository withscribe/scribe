import { types } from 'mobx-state-tree'

const ToastModel = types
  .model('ToastModel', {
    id: types.string,
    message: types.string,
    display: types.boolean,
    intent: types.enumeration('Type', ['success', 'danger', 'warning', 'info']),
  })

const ToastStore = types
  .model('ToastStore', {
    toasts: types.optional(types.array(ToastModel), []),
  })
  .actions(self => ({
    addToast(err) {
      self.toasts.push(err)
    },

    removeToast(todo) {
      const to = self.toasts.filter(v => v.id === todo)
      to[0].display = false
    },
  }))
  .views(self => ({
    get toastList() {
      return self.toasts.filter(story => story.display === true)
    },
  }))

export default ToastStore
