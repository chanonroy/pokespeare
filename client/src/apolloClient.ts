import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const uri = process.env.API_URL || 'http://localhost:4000'

const authLink = setContext(async (_, { headers }) => {
	const token = localStorage.getItem('PS_ACCESS_TOKEN') // TODO: enum

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
