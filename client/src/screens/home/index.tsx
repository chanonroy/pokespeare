import { gql, useLazyQuery, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import {
  GetUserQuery,
  SearchPokemon,
  SearchPokemonVariables,
} from '../../@types/graphql'
import Container from '../../components/container'
import ErrorBanner from '../../components/error-banner'
import HeroImage from '../../components/hero-image'
import PokemonCard from '../../components/pokemon-card'
import SearchBar from '../../components/search-bar'
import TitleText from '../../components/title-text'
import useSaveMutation from '../../hooks/use-save-mutation'
import useUnsaveMutation from '../../hooks/use-unsave-mutation'

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
  const [searchPokemon, { data: searchData, loading: searchLoading }] =
    useLazyQuery<SearchPokemon, SearchPokemonVariables>(SEARCH_POKEMON_QUERY)
  const [errorMessage, setErrorMessage] = useState('')

  const [query, setQuery] = useState<string>('')

  const [savePokemon, { loading: saveLoading }] = useSaveMutation()
  const [unsavePokemon, { loading: unsaveLoading }] = useUnsaveMutation()

  const handleSearch = async () => {
    if (!query) {
      return
    }
    try {
      await searchPokemon({ variables: { name: query.toLowerCase() } })
    } catch (e) {
      setErrorMessage('An error has occurred. Please try again later.')
    }
  }

  const handleSavePokemon = async (
    id: string,
    name: string,
    description: string
  ) => {
    try {
      await savePokemon({ variables: { id, name, description } })
    } catch (err) {
      setErrorMessage('An error has occurred. Please try again later.')
    }
  }

  const handleUnsavePokemon = async (id: string) => {
    try {
      await unsavePokemon({ variables: { id } })
    } catch (err) {
      setErrorMessage('An error has occurred. Please try again later.')
    }
  }

  const results = searchData?.searchPokemon
  const savedPokemon = userData?.me.pokemon

  return (
    <Container style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div style={{ marginBottom: 40 }}>
        <HeroImage />
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div style={{ marginBottom: 40 }}>
          <ErrorBanner message='Hello' />
        </div>
      )}

      {/* Search Input */}
      <SearchBar
        placeholder='Enter pokemon name'
        onChange={(e) => setQuery(e.target.value)}
        spellCheck='false'
        loading={searchLoading || saveLoading || unsaveLoading}
        onKeyUp={({ key }) => {
          if (key === 'Enter') {
            handleSearch()
          }
        }}
      />

      {/* Search result */}
      {results && (
        <div style={{ marginBottom: 40 }}>
          <TitleText>Results</TitleText>
          {results.length > 0 ? (
            <>
              {results.map(({ id, name, description }) => {
                return (
                  <PokemonCard
                    key={id}
                    id={id}
                    name={name}
                    description={description}
                    saved={!!savedPokemon?.find((pokemon) => pokemon.id === id)}
                    onSave={() => handleSavePokemon(id, name, description)}
                    onUnsave={() => handleUnsavePokemon(id)}
                  />
                )
              })}
            </>
          ) : (
            <div style={{ textAlign: 'center', color: 'lightgrey' }}>
              No Pokemon Found
            </div>
          )}
        </div>
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
              onUnsave={() => handleUnsavePokemon(id)}
            />
          ))}
        </>
      )}
    </Container>
  )
}
