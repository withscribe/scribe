import { types, flow } from 'mobx-state-tree'

import { store } from 'Components/App'

import { client } from '../services/Client'
import loginMutation from '../mutations/login.mu'
import registerMutation from '../mutations/register.mu'

const AuthStore = types
  .model('AuthStore', {
    inProgress: types.optional(types.boolean, false),
    errors: types.maybe(types.string),
    username: types.maybe(types.string),
    email: types.maybe(types.string),
    password: types.maybe(types.string),
  })
  .actions((self) => {
    const changeUsername = (newUsername) => {
      self.username = newUsername
    }

    const changeEmail = (newEmail) => {
      self.email = newEmail
    }

    const changePassword = (newPassword) => {
      self.password = newPassword
    }

    const loginUser = flow(function* () {
      self.inProgress = true
      const { email, password } = self
      const { data: { login } } = yield client.mutate({
        mutation: loginMutation,
        variables: ({ email, password }),
      })
      console.log(login)
      localStorage.setItem('token', login.token)
      store.user.setMe(login)
      self.inProgress = false
    })

    const registerUser = flow(function* () {
      self.inProgress = true
      const { email, password } = self
      const { data: { register: { token } } } = yield client.mutate({
        mutation: registerMutation,
        variables: ({ email, password }),
      })
      console.log(token)
      self.inProgress = false
    })
    return {
      changeUsername,
      changeEmail,
      changePassword,
      loginUser,
      registerUser,
    }
  })

export default AuthStore
