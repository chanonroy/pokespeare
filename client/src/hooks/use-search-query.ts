import { gql, QueryTuple, useLazyQuery } from '@apollo/client'
import { SearchPokemon, SearchPokemonVariables } from '../@types/graphql'

export const USE_SEARCH_QUERY = gql`
  query SearchPokemon($name: String!) {
    searchPokemon(name: $name) {
      id
      name
      description
    }
  }
`

export default (): QueryTuple<SearchPokemon, SearchPokemonVariables> =>
  useLazyQuery(USE_SEARCH_QUERY)
