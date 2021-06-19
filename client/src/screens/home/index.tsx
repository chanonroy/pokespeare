import { gql, useLazyQuery, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import {
  GetUserQuery,
  SearchPokemon,
  SearchPokemonVariables,
} from '../../@types/graphql'
import Button from '../../components/button'
import Container from '../../components/container'
import HeroImage from '../../components/hero-image'
import PokemonCard from '../../components/pokemon-card'
import SearchBar from '../../components/search-bar'
import TextInput from '../../components/text-input'
import TitleText from '../../components/title-text'

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
      <div style={{ marginBottom: 40 }}>
        <HeroImage />
      </div>

      {/* Search Input */}
      {/* <TextInput
        placeholder='Search for pokemon'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button> */}
      <SearchBar placeholder='Enter pokemon name' />

      {/* Pokemon card of result */}

      {results && results.length > 0 && (
        <>
          <TitleText>Results</TitleText>
          {results.map(({ id, name, description }) => (
            <PokemonCard
              key={id}
              id={id}
              name={name}
              description={description}
              saved={!!savedPokemon?.find((pokemon) => pokemon.id === id)}
            />
          ))}
        </>
      )}

      {/* List of saved pokemon */}

      {savedPokemon && savedPokemon.length > 0 && (
        <>
          <TitleText>Saved</TitleText>
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
