import { types, flow } from 'mobx-state-tree'

import { client } from '../services/Client'
import loginMutation from '../mutations/login'
import registerMutation from '../mutations/register'

const AuthStore = types
  .model('AuthStore', {
    inProgress: types.optional(types.boolean, false),
    errors: types.maybe(types.string),
    username: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
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
      self.inProgress = false
      return login
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

    const logoutUser = () => {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token')
      } else {
        return false
      }
      return true
    }

    return {
      changeUsername,
      changeEmail,
      changePassword,
      loginUser,
      registerUser,
      logoutUser,
    }
  })

export default AuthStore
