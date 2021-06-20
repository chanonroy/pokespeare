import { MockedProvider } from '@apollo/client/testing'
import { act, renderHook } from '@testing-library/react-hooks'
import React, { ReactElement, useContext } from 'react'
import { mocked } from 'ts-jest/utils'
import {
  clearAccessToken,
  getAccessToken,
  saveAccessToken,
} from '../utils/token'
import AuthProvider, { AuthContext } from './AuthProvider'

jest.mock('../utils/token')

describe('Auth Provider', () => {
  it('restores session when access token is present', () => {
    mocked(getAccessToken).mockReturnValue('accessToken')
    const wrapper = ({ children }: { children: ReactElement }) => (
      <MockedProvider>
        <AuthProvider>{children}</AuthProvider>
      </MockedProvider>
    )
    const { result } = renderHook(() => useContext(AuthContext), { wrapper })

    expect(result.current.loggedIn).toBe(true)
  })
  it('handles login action', () => {
    mocked(getAccessToken).mockReturnValue(null)
    const mockSaveAccessToken = jest.fn()
    mocked(saveAccessToken).mockImplementation(mockSaveAccessToken)

    const wrapper = ({ children }: { children: ReactElement }) => (
      <MockedProvider>
        <AuthProvider>{children}</AuthProvider>
      </MockedProvider>
    )
    const { result } = renderHook(() => useContext(AuthContext), { wrapper })

    expect(result.current.loggedIn).toBe(false)

    act(() => {
      result.current.login('newAccessToken')
    })

    expect(mockSaveAccessToken).toHaveBeenNthCalledWith(1, 'newAccessToken')
    expect(result.current.loggedIn).toBe(true)
  })
  it('handles logout action', () => {
    mocked(getAccessToken).mockReturnValue('accessToken')
    const mockClearAccessToken = jest.fn()
    mocked(clearAccessToken).mockImplementation(mockClearAccessToken)

    const wrapper = ({ children }: { children: ReactElement }) => (
      <MockedProvider>
        <AuthProvider>{children}</AuthProvider>
      </MockedProvider>
    )
    const { result } = renderHook(() => useContext(AuthContext), { wrapper })

    expect(result.current.loggedIn).toBe(true)

    act(() => {
      result.current.logout()
    })

    expect(clearAccessToken).toHaveBeenCalledTimes(1)
    expect(result.current.loggedIn).toBe(false)
  })
})
