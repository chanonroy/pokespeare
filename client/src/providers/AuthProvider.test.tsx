import { renderHook } from '@testing-library/react-hooks'
import React, { useContext } from 'react'
import AuthProvider, { AuthContext } from './AuthProvider'
import { mocked } from 'ts-jest/utils'
import { getAccessToken } from '../utils/token'
import { ReactElement } from 'react'

jest.mock('../utils/token')

describe('Auth Provider', () => {
  it('restores session when access token is present', () => {
    mocked(getAccessToken).mockReturnValue('accessToken')
    const wrapper = ({ children }: { children: ReactElement }) => (
      <AuthProvider>{children}</AuthProvider>
    )
    const { result } = renderHook(() => useContext(AuthContext), { wrapper })

    expect(result.current.loggedIn).toBe(true)
  })
  it.todo('handles login action')
  it.todo('handles logout action')
})
