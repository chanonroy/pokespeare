import { act, renderHook } from '@testing-library/react-hooks'

import { notEmpty } from '../utils/validations'
import useTextInputState from './use-text-input-state'

describe('UseTextInputState', () => {
  it('returns a value and its clean state', () => {
    const { result } = renderHook(() =>
      useTextInputState({
        value: 'chanonroy@gmail.com ',
      })
    )

    expect(result.current.value).toBe('chanonroy@gmail.com ')
    expect(result.current.cleanValue).toBe('chanonroy@gmail.com')
  })
  it('returns a hasError when validation fails', () => {
    const errorMessage = 'This field is required'
    const { result } = renderHook(() =>
      useTextInputState({
        value: '',
        validations: [notEmpty(errorMessage)],
      })
    )

    expect(result.current.hasError).toBe(true)
    expect(result.current.showError).toBe(false)
    expect(result.current.errorMessage).toBe(errorMessage)
  })
  it('returns showError when form has been blurred', () => {
    const errorMessage = 'This field is required'

    const { result } = renderHook(() =>
      useTextInputState({
        value: '',
        validations: [notEmpty(errorMessage)],
      })
    )

    act(() => {
      result.current.onBlur()
    })

    expect(result.current.hasError).toBe(true)
    expect(result.current.showError).toBe(true)
  })
})
