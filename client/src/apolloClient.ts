import { ApolloClient, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import getCache from './utils/apollo/getCache'
import { getAccessToken } from './utils/token'

const uri = process.env.API_URL || 'http://localhost:4000'

const authLink = setContext(async (_, { headers }) => {
  const token = getAccessToken()

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(createHttpLink({ uri: `${uri}/graphql` })),
  cache: getCache(),
})

export default apolloClient
