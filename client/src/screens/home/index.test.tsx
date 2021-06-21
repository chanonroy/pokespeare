import { MockedProvider, MockedResponse } from '@apollo/client/testing'

import React from 'react'
import { act, create } from 'react-test-renderer'
import { mocked } from 'ts-jest/utils'
import Home, { GET_USER_QUERY } from '.'
import { GetUserQuery } from '../../@types/graphql'
import PokemonCard from '../../components/pokemon-card'
import SearchBar from '../../components/search-bar'
import useSearchQuery from '../../hooks/use-search-query'
import useUnsaveMutation from '../../hooks/use-unsave-mutation'

jest.mock('../../components/pokemon-card', () => () => <></>)
jest.mock('../../hooks/use-search-query')
jest.mock('../../hooks/use-unsave-mutation')

mocked(useSearchQuery).mockReturnValue([jest.fn(), {}] as any)
mocked(useUnsaveMutation).mockReturnValue([jest.fn(), {}] as any)

const mockUserQuery = (): MockedResponse<GetUserQuery> => ({
  request: {
    query: GET_USER_QUERY,
  },
  result: {
    data: {
      me: {
        id: '1',
        emailAddress: 'joe@me.com',
        pokemon: [
          {
            id: '1',
            name: 'Pikachu',
            description: 'text',
            __typename: 'Pokemon',
          },
        ],
        __typename: 'User',
      },
    },
  },
})

describe('Home', () => {
  it('handles a valid search result with the keyboard', async () => {
    const mockSearchQuery = jest.fn()
    mocked(useSearchQuery).mockReturnValue([mockSearchQuery, {}] as any)

    const { root } = create(
      <MockedProvider>
        <Home />
      </MockedProvider>
    )

    act(() => {
      root
        .findByType(SearchBar)
        .props.onChange({ target: { value: 'pikachu' } })
    })

    await act(async () => {
      await root.findByType(SearchBar).props.onKeyUp({ key: 'Enter' })
    })

    expect(mockSearchQuery).toHaveBeenNthCalledWith(1, {
      variables: { name: 'pikachu' },
    })
  })
  it('shows already saved pokemon and can remove it', async () => {
    const mockUnsave = jest.fn()
    mocked(useUnsaveMutation).mockReturnValue([mockUnsave, {}] as any)

    const { root } = create(
      <MockedProvider mocks={[mockUserQuery()]}>
        <Home />
      </MockedProvider>
    )

    // wait for query to finish
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    expect(root.findByType(PokemonCard)).toBeTruthy()
    expect(root.findByType(PokemonCard).props.name).toBe('Pikachu')

    await act(async () => {
      await root.findByType(PokemonCard).props.onUnsave()
    })

    expect(mockUnsave).toHaveBeenCalledTimes(1)
  })
})
