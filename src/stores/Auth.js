import { types, flow } from 'mobx-state-tree'

import { client } from '../services/Client'
import loginMutation from 'Mutations/login'
import registerMutation from 'Mutations/register'

const AuthStore = types
  .model('AuthStore', {
    inProgress: types.optional(types.boolean, false),
    errors: types.maybe(types.string),
    username: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    confirmPassword: types.optional(types.string, ''),
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

    const changeConfirmPassword = (newConfirmPassword) => {
      self.confirmPassword = newConfirmPassword
    }

    /**
     * Auth store function for logging in a user
     * @async
     * @function loginUser
     * @returns {object} Login data from loginMutation
     */
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
    /**
     * Auth store function for registering a new user
     * @async
     * @function registerUser
     */
    const registerUser = flow(function* () {
      self.inProgress = true
      const { username, email, password } = self
      const { data: { registerAccountWithProfile: { token } } } = yield client.mutate({
        mutation: registerMutation,
        variables: ({ userName: username, email, password }),
      })
      console.log(token)
      self.inProgress = false
    })

    /**
     * Auth store function for 'logging out' a user
     * @todo Use the logout mutation
     * @function logoutUser
     * @returns {boolean} Value determined by the sucess of logging the user out
     */
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
      changeConfirmPassword,
      loginUser,
      registerUser,
      logoutUser,
    }
  })

export default AuthStore
