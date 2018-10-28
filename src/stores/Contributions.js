import { types, flow, destroy, applySnapshot } from 'mobx-state-tree'
import Plain from 'slate-plain-serializer'
import { Value } from 'slate'

import ContributionsByIdQuery from 'Queries/contributionsById'
import ContributionByIdQuery from 'Queries/contributionById'
import ApproveChangesMutation from 'Mutations/approveChanges'
import RejectChangesMutation from 'Mutations/rejectChanges'
import { client } from 'Services/Client'
import { serialize } from 'uri-js';

const ContributionsModel = types
  .model('ContributionsModel', {
    id: types.string,
    forkId: types.string,
    originalStoryId: types.string,
    contributorProfileId: types.string,
    authorProfileId: types.string,
    originalContent: types.string,
    contributionContent: types.string,
    comment: types.maybeNull(types.string),
  })

const ContributionsStore = types
  .model('ContributionsStore', {
    contribution: types.maybeNull(ContributionsModel),
    contributions: types.array(ContributionsModel),
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
     * @param {String} authorId - The ID of the user profile who wrote the original story
    */
    const getContributionRequests = flow(function* (authorProfileId) {
      const { data: { getContributionsById } } = yield client.query({
        query: ContributionsByIdQuery,
        variables: ({ authorProfileId }),
        fetchPolicy: 'network-only',
      })
      self.setContributions(getContributionsById)
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
      const { data: { approveChanges } } = yield client.mutate({
        mutation: ApproveChangesMutation,
        variables: ({ contributionId }),
      })
    })

    const rejectContribution = flow(function* (contributionId) {
      const { data: { rejectChanges } } = yield client.mutate({
        mutation: RejectChangesMutation,
        variables: ({ contributionId }),
      })
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
      deserializeContent
    }
  })
  .views(self => ({
    // view methods
  }))

export default ContributionsStore
