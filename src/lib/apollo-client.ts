import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { auth } from './firebase'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_HASURA_GRAPHQL_URL || 'https://your-hasura-endpoint.hasura.app/v1/graphql',
})

const authLink = setContext(async (_, { headers }) => {
  const currentUser = auth.currentUser
  let token = ''

  if (currentUser) {
    try {
      token = await currentUser.getIdToken()
    } catch (error) {
      console.error('Failed to get Firebase ID token:', error)
    }
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'x-hasura-admin-secret': import.meta.env.VITE_HASURA_ADMIN_SECRET || '',
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
}) 
