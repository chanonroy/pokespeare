import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getAccessToken } from './token'

const uri = process.env.API_URL || 'http://localhost:4000'

const authLink = setContext(async (_, { headers }) => {
  const token = getAccessToken()

  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(
    createHttpLink({ uri: `${uri}/graphql`, credentials: 'include' })
  ),
  cache: new InMemoryCache(),
})

export default apolloClient
