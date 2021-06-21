import React from 'react'
import SignUp, { SIGN_UP_MUTATION } from '.'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { AuthContext } from '../../providers/AuthProvider'
import { act, create } from 'react-test-renderer'
import { SignUpMutation, SignUpMutationVariables } from '../../@types/graphql'
import { ExecutionResult, GraphQLError } from 'graphql'
import { GraphQLErrorCode } from '../../@types'
import ErrorBanner from '../../components/error-banner'

const mockSignUpMutation = (
  callback: () => void,
  errorExtensions?: Record<string, unknown>
): MockedResponse<SignUpMutation> => ({
  request: {
    query: SIGN_UP_MUTATION,
    variables: {
      emailAddress: 'joe@me.com',
      password: 'password',
    } as SignUpMutationVariables,
  },
  result: (): ExecutionResult<SignUpMutation> => {
    callback()
    return {
      data: !errorExtensions
        ? {
            signUp: {
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

describe('Sign up', () => {
  it('signs ups and redirects when fields are valid', async () => {
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
        <MockedProvider mocks={[mockSignUpMutation(mutationCallback)]}>
          <SignUp />
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
        .findByProps({ placeholder: 'Enter a good password' })
        .props.onChange({ target: { value: 'password' } })
    })

    act(() => {
      root
        .findByProps({ placeholder: 'Confirm your password' })
        .props.onChange({ target: { value: 'password' } })
    })

    await act(async () => {
      await root
        .findByProps({ placeholder: 'Confirm your password' })
        .props.onKeyUp({ key: 'Enter' })
    })

    expect(mutationCallback).toHaveBeenCalledTimes(1)
    expect(mockLogin).toHaveBeenNthCalledWith(1, 'accessToken')
  })
  it('handles error when user already exists', async () => {
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
        <MockedProvider
          mocks={[
            mockSignUpMutation(mutationCallback, {
              code: GraphQLErrorCode.Conflict,
            }),
          ]}
        >
          <SignUp />
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
        .findByProps({ placeholder: 'Enter a good password' })
        .props.onChange({ target: { value: 'password' } })
    })

    act(() => {
      root
        .findByProps({ placeholder: 'Confirm your password' })
        .props.onChange({ target: { value: 'password' } })
    })

    await act(async () => {
      await root
        .findByProps({ placeholder: 'Confirm your password' })
        .props.onKeyUp({ key: 'Enter' })
    })

    expect(mutationCallback).toHaveBeenCalledTimes(1)
    expect(mockLogin).not.toHaveBeenCalled()
    expect(root.findByType(ErrorBanner).props.message).toBe(
      'This user already exists. Please login normally.'
    )
  })
})
