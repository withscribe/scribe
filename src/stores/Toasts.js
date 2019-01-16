import { types } from 'mobx-state-tree'

const ToastModel = types
  .model('ToastModel', {
    id: types.optional(types.number, () => Math.random()),
    message: types.string,
    display: types.boolean,
    intent: types.enumeration('Type', ['success', 'danger', 'warning', 'info']),
  })

const ToastStore = types
  .model('ToastStore', {
    toasts: types.optional(types.array(ToastModel), []),
  })
  .actions(self => ({
    addToast(toast) {
      self.toasts.push(toast)
    },

    removeToast(toastId) {
      const to = self.toasts.filter(v => v.id === toastId)
      to[0].display = false
    },
  }))
  .views(self => ({
    get toastList() {
      return self.toasts.filter(story => story.display === true)
    },
  }))

export default ToastStore
