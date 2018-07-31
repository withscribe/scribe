import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'unfetch'

const httpLink = new HttpLink({
  // uri: 'http://167.99.187.228:4466',
  uri: 'http://138.197.171.34/auth',
  credentials: 'same-origin',
  fetch,
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log('[GraphQL error]', message)
    })
    if (networkError) {
      console.log('[Network error]', networkError)
    }
  }
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : null,
    },
  }
})

const link = ApolloLink.from([authLink, errorLink, httpLink])
const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache,
})

export { client }
