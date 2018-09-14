import { types, flow } from 'mobx-state-tree'

const ProfileModel = types
  .model('ProfileModel', {
    email: types.string,
    id: types.string,
    account_id: types.string,
    firstName: types.maybeNull(types.string),
    lastName: types.maybeNull(types.string),
    userName: types.string,
    occupation: types.maybeNull(types.string),
  })

const ProfileStore = types
  .model('ProfileStore', {
    fetchingData: types.optional(types.boolean, false),
    updatingProfile: types.optional(types.boolean, false),
    profileUpdatedSuccess: types.optional(types.boolean, false),
    profileUpdatedFailure: types.optional(types.boolean, false),
    isEditingProfile: types.optional(types.boolean, false),
    editedProfile: types.maybeNull(ProfileModel),
  })
  .actions((self) => {
    const importCurrentProfile = (data) => {
      // const { profile } = data
      console.log({...data})
      if (self.editedProfile === null) {
        self.editedProfile = ProfileModel.create({
          ...data,
        })
        return
      }
      self.editedProfile = {
        ...data,
      }
    }

    const changeEmail = (newEmail) => {
      self.editedProfile.email = newEmail
    }

    const changefirstName = (newfirstName) => {
      self.editedProfile.firstName = newfirstName
    }

    const changelastName = (newlastName) => {
      self.editedProfile.lastName = newlastName
    }

    const changeOccupation = (newOccupation) => {
      self.editedProfile.occupation = newOccupation
    }

    const changeuserName = (newuserName) => {
      self.editedProfile.userName = newuserName
    }

    return {
      importCurrentProfile,
      changeEmail,
      changefirstName,
      changelastName,
      changeuserName,
      changeOccupation,
    }
  })

export default ProfileStore
