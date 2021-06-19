import { gql, MutationTuple, useMutation } from '@apollo/client'
import { UnsavePokemon, UnsavePokemonVariables } from '../@types/graphql'

export const UNSAVE_POKEMON_MUTATION = gql`
  mutation UnsavePokemon($id: String!) {
    unsavePokemon(input: { id: $id }) {
      id
      pokemon {
        id
        name
        description
      }
    }
  }
`

export default (): MutationTuple<UnsavePokemon, UnsavePokemonVariables> =>
  useMutation(UNSAVE_POKEMON_MUTATION)
