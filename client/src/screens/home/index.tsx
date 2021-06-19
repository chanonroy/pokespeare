import { gql, useLazyQuery, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import {
  GetUserQuery,
  SearchPokemon,
  SearchPokemonVariables,
} from '../../@types/graphql'
import Button from '../../components/button'
import Container from '../../components/container'
import PokemonCard from '../../components/pokemon-card'
import TextInput from '../../components/text-input'

const SEARCH_POKEMON_QUERY = gql`
  query SearchPokemon($name: String!) {
    searchPokemon(name: $name) {
      id
      name
      description
    }
  }
`

const GET_USER_QUERY = gql`
  query GetUserQuery {
    me {
      id
      emailAddress
      pokemon {
        id
        name
        description
      }
    }
  }
`

export default function Home() {
  const { data: userData } = useQuery<GetUserQuery>(GET_USER_QUERY)
  const [searchPokemon, { data: searchData, loading }] = useLazyQuery<
    SearchPokemon,
    SearchPokemonVariables
  >(SEARCH_POKEMON_QUERY)

  const [query, setQuery] = useState<string>('')

  const handleSearch = async () => {
    if (!query) {
      return
    }
    try {
      await searchPokemon({ variables: { name: query } })
    } catch (e) {
      // handle error
    }
  }

  const results = searchData?.searchPokemon
  const savedPokemon = userData?.me.pokemon

  return (
    <Container style={{ paddingTop: 40, paddingBottom: 40 }}>
      {/* <img alt='shakespeare' src={shakespeareImg} height={50} width={50} /> */}
      <TextInput
        placeholder='Search for pokemon'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>

      {/* Show pokemon card of result */}
      <div>Search Results</div>
      {results && results.length > 0 && (
        <>
          {results.map(({ id, name, description }) => (
            <PokemonCard
              key={id}
              id={id}
              name={name}
              description={description}
              saved={false}
            />
          ))}
        </>
      )}

      {/* List of saved pokemon */}
      <div>Saved Pokemon</div>
      {savedPokemon && savedPokemon.length > 0 && (
        <>
          {savedPokemon?.map(({ id, name, description }) => (
            <PokemonCard
              key={id}
              id={id}
              name={name}
              description={description}
              saved={true}
            />
          ))}
        </>
      )}
    </Container>
  )
}
