import { gql, useLazyQuery, useQuery } from '@apollo/client'
import React, { useContext, useState } from 'react'
import { Colors } from '../../@types'
import {
  GetUserQuery,
  SearchPokemon,
  SearchPokemonVariables,
} from '../../@types/graphql'
import Button from '../../components/button'
import Container from '../../components/container'
import ErrorBanner from '../../components/error-banner'
import HeroImage from '../../components/hero-image'
import PokemonCard from '../../components/pokemon-card'
import SearchBar from '../../components/search-bar'
import TextButton from '../../components/text-button'
import TitleText from '../../components/title-text'
import useSaveMutation from '../../hooks/use-save-mutation'
import useUnsaveMutation from '../../hooks/use-unsave-mutation'
import { AuthContext } from '../../providers/AuthProvider'

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
  const { logout } = useContext(AuthContext)
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
  const emailAddress = userData?.me.emailAddress

  return (
    <Container style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ marginBottom: 10 }}>
          <HeroImage />
        </div>
        <div
          style={{
            color: Colors.primary,
            fontWeight: 'bold',
            fontSize: 35,
            marginBottom: 10,
          }}
        >
          Pokespeare
        </div>
        <div style={{ fontSize: 14, color: 'darkgrey', marginBottom: 20 }}>
          Enter a Pokemon name and press "Enter" to return results.
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div style={{ marginBottom: 40 }}>
          <ErrorBanner message='Hello' />
        </div>
      )}

      {/* Search Input */}
      <div style={{ marginBottom: 40 }}>
        <SearchBar
          placeholder={'Pikachu'}
          onChange={(e) => setQuery(e.target.value)}
          spellCheck='false'
          loading={searchLoading || saveLoading || unsaveLoading}
          onKeyUp={({ key }) => {
            if (key === 'Enter') {
              handleSearch()
            }
          }}
        />
      </div>

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
        <div style={{ marginBottom: 40 }}>
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
        </div>
      )}

      {/* Log out */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TextButton onClick={logout}>Logout</TextButton>
      </div>
    </Container>
  )
}
