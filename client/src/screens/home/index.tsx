import { gql, useLazyQuery } from '@apollo/client'
import React, { useState } from 'react'
import { SearchPokemon, SearchPokemonVariables } from '../../@types/graphql'
import Button from '../../components/button'
import Container from '../../components/container'
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

export default function Home() {
	const [query, setQuery] = useState<string>('')
	const [searchPokemon, { data, loading }] = useLazyQuery<
		SearchPokemon,
		SearchPokemonVariables
	>(SEARCH_POKEMON_QUERY)

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

	const pokemonResult = data?.searchPokemon

	return (
		<Container style={{ paddingTop: 40, paddingBottom: 40 }}>
			{/* <img alt='shakespeare' src={shakespeareImg} height={50} width={50} /> */}
			<TextInput
				placeholder='Search for pokemon'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<Button onClick={handleSearch}>Search</Button>
			{pokemonResult && <div>hello</div>}
		</Container>
	)
}
