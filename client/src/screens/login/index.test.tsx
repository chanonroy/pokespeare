import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { ExecutionResult, GraphQLError } from 'graphql'
import React from 'react'
import { act, create } from 'react-test-renderer'
import { GraphQLErrorCode } from '../../@types'
import { LoginMutation, LoginMutationVariables } from '../../@types/graphql'
import ErrorBanner from '../../components/error-banner'
import { AuthContext } from '../../providers/AuthProvider'
import Login, { LOGIN_MUTATION } from './'

const mockLoginMutation = (
  callback: () => void,
  errorExtensions?: Record<string, unknown>
): MockedResponse<LoginMutation> => ({
  request: {
    query: LOGIN_MUTATION,
    variables: {
      emailAddress: 'joe@me.com',
      password: 'password',
    } as LoginMutationVariables,
  },
  result: (): ExecutionResult<LoginMutation> => {
    callback()
    return {
      data: !errorExtensions
        ? {
            login: {
              user: {
                id: '1',
                emailAddress: 'joe@me.com',
                __typename: 'User',
              },
              accessToken: 'accessToken',
              __typename: 'LoginOutput',
            },
          }
        : null,
      errors: errorExtensions
        ? [
            {
              extensions: errorExtensions,
            } as unknown as GraphQLError,
          ]
        : undefined,
    }
  },
})

describe('Login', () => {
  it('logs in with successful credentials', async () => {
    const mutationCallback = jest.fn()
    const mockLogin = jest.fn()
    const { root } = create(
      <AuthContext.Provider
        value={
          {
            login: mockLogin,
          } as any
        }
      >
        <MockedProvider mocks={[mockLoginMutation(mutationCallback)]}>
          <Login />
        </MockedProvider>
      </AuthContext.Provider>
    )

    act(() => {
      root
        .findByProps({ placeholder: 'Enter your email' })
        .props.onChange({ target: { value: 'joe@me.com' } })
    })

    act(() => {
      root
        .findByProps({ placeholder: 'Enter your password' })
        .props.onChange({ target: { value: 'password' } })
    })

    await act(async () => {
      await root
        .findByProps({ placeholder: 'Enter your password' })
        .props.onKeyUp({ key: 'Enter' })
    })

    expect(mutationCallback).toHaveBeenCalledTimes(1)
    expect(mockLogin).toHaveBeenNthCalledWith(1, 'accessToken')
  })
  it.todo('shows form validation errors')
  it('handles invalid credentials server error', async () => {
    const mutationCallback = jest.fn()
    const { root } = create(
      <MockedProvider
        mocks={[
          mockLoginMutation(mutationCallback, {
            code: GraphQLErrorCode.InvalidCredentials,
          }),
        ]}
      >
        <Login />
      </MockedProvider>
    )

    act(() => {
      root
        .findByProps({ placeholder: 'Enter your email' })
        .props.onChange({ target: { value: 'joe@me.com' } })
    })

    act(() => {
      root
        .findByProps({ placeholder: 'Enter your password' })
        .props.onChange({ target: { value: 'password' } })
    })

    await act(async () => {
      await root
        .findByProps({ placeholder: 'Enter your password' })
        .props.onKeyUp({ key: 'Enter' })
    })

    expect(mutationCallback).toHaveBeenCalledTimes(1)
    expect(root.findByType(ErrorBanner).props.message).toBe(
      'Your email and password combination are invalid'
    )
  })
})
