// Evan Kysley, Austin Howlett, Gerhard Knelsen
import {
  types, flow, destroy, applySnapshot,
} from 'mobx-state-tree'
import Plain from 'slate-plain-serializer'
import { Value } from 'slate'

import ContributionsByIdQuery from 'Queries/contributionsById'
import ContributionByIdQuery from 'Queries/contributionById'
import ApproveChangesMutation from 'Mutations/approveChanges'
import RejectChangesMutation from 'Mutations/rejectChanges'
import { client } from 'Services/Client'
import { toastStore } from 'Components/App'

const ContributionsModel = types
  .model('ContributionsModel', {
    id: types.string,
    forkId: types.string,
    originalStoryId: types.string,
    contributorName: types.string,
    contributorProfileId: types.string,
    authorProfileId: types.string,
    originalContent: types.string,
    contributionContent: types.string,
    comment: types.maybeNull(types.string),
    createdAt: types.string,
    updatedAt: types.string,
  })

const ContributionsStore = types
  .model('ContributionsStore', {
    contribution: types.maybeNull(ContributionsModel),
    contributions: types.array(ContributionsModel),
    approvingChanges: types.optional(types.boolean, false),
    rejectingChanges: types.optional(types.boolean, false),
    isLoadingContributions: types.optional(types.boolean, false),
  })
  .actions((self) => {
    /**
     * Contributions store function used to attach array of
     * contributions to the store
     * @function setContributions
     * @param {Array} ContributionsModel - The Array of ContributionModels returned from getContributionsById
    */
    const setContributions = (contributions) => {
      self.contributions = contributions
    }
    /**
     * Contributions store function used to attach model of
     * contribution to the store
     * @function setContributions
     * @param ContributionsModel - The ContributionModels returned from getContributionById
    */
    const setContribution = (contribution) => {
      self.contribution = contribution
    }
    /**
     * Contributions store function that gets all of the authors story's
     * contribution requests
     * @function getContributionRequests
     * @param {String} authorProfileId - The ID of the user profile who wrote the original story
    */
    const getContributionRequests = flow(function* (authorProfileId) {
      try {
        self.isLoadingContributions = true
        const { data: { getContributionsById } } = yield client.query({
          query: ContributionsByIdQuery,
          variables: ({ authorProfileId }),
          fetchPolicy: 'network-only',
        })
        self.setContributions(getContributionsById)
      } catch (err) {
        toastStore.addToast({
          id: `${Math.random()}`,
          message: 'Failed to load contributions. Please try again.',
          display: true,
          intent: 'danger',
        })
      } finally {
        self.isLoadingContributions = false
      }
    })

    /**
     * Contributions store function that gets the contribution by the given id
     * @function getContribution
     * @param {String} id - The ID of the contribution object
    */
    const getContribution = flow(function* (id) {
      const { data: { getContributionById } } = yield client.query({
        query: ContributionByIdQuery,
        variables: ({ id }),
        fetchPolicy: 'network-only',
      })
      self.setContribution(getContributionById)
    })

    const approveContribution = flow(function* (contributionId) {
      try {
        self.approvingChanges = true
        const { data: { approveChanges } } = yield client.mutate({
          mutation: ApproveChangesMutation,
          variables: ({ contributionId }),
        })
        toastStore.addToast({
          id: `${Math.random()}`,
          message: 'Changes have been approved and added to the story!',
          display: true,
          intent: 'success',
        })
      } catch (err) {
        self.approvingChanges = false
        console.log(err)
        toastStore.addToast({
          id: `${Math.random()}`,
          message: 'Changes have failed to be approved. Please try again.',
          display: true,
          intent: 'danger',
        })
      } finally {
        self.approvingChanges = false
      }
    })

    const rejectContribution = flow(function* (contributionId) {
      try {
        self.rejectingChanges = true
        const { data: { rejectChanges } } = yield client.mutate({
          mutation: RejectChangesMutation,
          variables: ({ contributionId }),
        })
        toastStore.addToast({
          id: `${Math.random()}`,
          message: 'Changes have been rejected and contributor notified!',
          display: true,
          intent: 'success',
        })
      } catch (err) {
        self.rejectingChanges = false
        console.log(err)
        toastStore.addToast({
          id: `${Math.random()}`,
          message: 'Changes have failed to be rejected. Please try again.',
          display: true,
          intent: 'danger',
        })
      } finally {
        self.rejectingChanges = false
      }
    })

    const deserializeContent = (content) => {
      const json = JSON.parse(content)
      const temp = Value.fromJSON(json)
      const plainText = Plain.serialize(temp)
      return plainText
    }
    return {
      getContributionRequests,
      setContributions,
      getContribution,
      setContribution,
      approveContribution,
      rejectContribution,
      deserializeContent,
    }
  })
  .views(self => ({
    // view methods
  }))

export default ContributionsStore
