import { types, flow } from 'mobx-state-tree'

import { client } from 'Services/Client'
import loginMutation from 'Mutations/login'
import registerMutation from 'Mutations/register'
import { toastStore } from 'Components/App'

const AuthStore = types
  .model('AuthStore', {
    inProgress: types.optional(types.boolean, false),
    // errors: types.optional(types.array(Error), []),
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
      try {
        const { data: { login } } = yield client.mutate({
          mutation: loginMutation,
          variables: ({ email, password }),
        })
        localStorage.setItem('token', login.token)
        self.inProgress = false
        return login
      } catch (err) {
        console.log(err)
        self.inProgress = false
        return false
      }
    })

    /**
     * Auth store function for registering a new user
     * @async
     * @function registerUser
     */
    const registerUser = flow(function* () {
      self.inProgress = true
      const { username, email, password } = self
      try {
        const { data: { register: { token } } } = yield client.mutate({
          mutation: registerMutation,
          variables: ({ userName: username, email, password }),
        })
        toastStore.addToast({
          id: '' + Math.random() + '',
          message: 'Account has been created. Please login.',
          display: true,
        })
      } catch (err) {
        console.log(err)
        if (err.message.includes('Username')) {
          toastStore.addToast({
            id: '' + Math.random() + '',
            message: 'Username has already been taken.',
            display: true,
          })
        } else {
          toastStore.addToast({
            id: '' + Math.random() + '',
            message: 'Email is already registered.',
            display: true,
          })
        }
        self.inProgress = false
      } finally {
        self.inProgress = false
      }
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
