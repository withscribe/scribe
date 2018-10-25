import { types, flow, destroy, applySnapshot } from 'mobx-state-tree'

import ContributionsByIdQuery from 'Queries/getContributionsById'
import { client } from 'Services/Client'

const ContributionsModel = types
  .model('ContributionsModel', {
    id: types.string,
    forkId: types.string,
    contributorProfileId: types.string,
    authorProfileId: types.string,
    content: types.string,
    comment: types.maybeNull(types.string)
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
      applySnapshot(self.contributions, contributions)
      // self.stories = stories
    }
    /**
     * Contributions store function that gets all of the authors story's 
     * contribution requests
     * @function getContributionReequests
     * @param {String} authorId - The ID of the user profile who wrote the original story
    */
    const getContributionRequests = flow(function* (authorId) {
      const { data: { getContributionsById } } = yield client.query({
          query: ContributionsByIdQuery,
          variables: ({ authorId }),
      })
      self.setContributions(getContributionsById)
    })
    

    return {
        getContributionRequests
    }
  })
  .views(self => ({
    // view methods
  }))

export default ContributionsStore
