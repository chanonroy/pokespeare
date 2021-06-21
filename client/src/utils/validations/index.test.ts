import { isMatch, notEmpty, validEmail } from '.'

test('validEmail returns expected value', () => {
  expect(validEmail('errorMessage')('chanonroy@gmail.com')).toBe(null)
  expect(validEmail('errorMessage')('chanonroy')).toBe('errorMessage')
})

test('notEmpty returns expected value', () => {
  expect(notEmpty('errorMessage')('value')).toBe(null)
  expect(notEmpty('errorMessage')('')).toBe('errorMessage')
})

test('isMatch returns expected value', () => {
  expect(isMatch('errorMessage', 'match')('match')).toBe(null)
  expect(isMatch('errorMessage', 'match')('matchh')).toBe('errorMessage')
})
