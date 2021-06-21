import {
  ApolloCache,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'

export default (): ApolloCache<NormalizedCacheObject> => {
  return new InMemoryCache({
    // See https://www.apollographql.com/docs/react/caching/cache-field-behavior/#merging-non-normalized-objects
    typePolicies: {
      User: {
        fields: {
          pokemon: {
            // Merge existing and incoming name objects.
            merge(_, incoming) {
              // Equivalent to what happens if there is no custom merge function.
              return incoming
            },
          },
        },
      },
    },
  })
}
