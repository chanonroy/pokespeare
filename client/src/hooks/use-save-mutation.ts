import { gql, MutationTuple, useMutation } from '@apollo/client'
import { SavePokemon, SavePokemonVariables } from '../@types/graphql'

export const SAVE_POKEMON_MUTATION = gql`
  mutation SavePokemon($id: String!, $name: String!, $description: String!) {
    savePokemon(input: { id: $id, description: $description, name: $name }) {
      id
      pokemon {
        id
        name
        description
      }
    }
  }
`

export default (): MutationTuple<SavePokemon, SavePokemonVariables> =>
  useMutation(SAVE_POKEMON_MUTATION)
