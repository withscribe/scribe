import React from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { RetryLink } from 'apollo-link-retry'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Redirect } from 'react-router-dom'

const httpLink = new HttpLink({
  uri: 'http://138.197.130.167/scribe',
  credentials: 'same-origin',
})

const retryLink = new RetryLink({
  attempts: (count, operation, error) => {
    const isMutation = operation
    && operation.query
    && operation.query.definitions
    && Array.isArray(operation.query.definitions)
    && operation.query.definitions.some(
      def => def.kind === 'OperationDefinition' && def.operation === 'mutation',
    )

    // Retry mutations for a long time, v important that drafts/edits etc go through
    if (isMutation) {
      return !!error && count < 25
    }

    // We don't need to retry queries as long as it will just show loading indicators forever
    return !!error && count < 6
  },
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log('[GraphQL error]', message)
      if (message === 'jwt expired') {
        localStorage.removeItem('token')
        window.location.reload(true)
      }
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
      authorization: token ? `${token}` : '',
    },
  }
})

const link = ApolloLink.from([authLink, retryLink, errorLink, httpLink])
const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache,
})

export { client }
