const isValidEmailAddress = (value: string) =>
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
    value
  )

/**
 * Shows error message if value is falsy.
 * @param errorMessage - The error message to show.
 */
export const notEmpty = (errorMessage: string) => (value: string) =>
  !value ? errorMessage : null

/**
 * Shows error message if value is truthy and is not a valid email address.
 * @param errorMessage - The error message to show.
 */
export const validEmail = (errorMessage: string) => (value: string) =>
  !!value && !isValidEmailAddress(value) ? errorMessage : null

/**
 * Shows error message if value does not match submitted value
 * @param errorMessage - The error message to show.
 * @param match - String to match against the value
 */
export const isMatch =
  (errorMessage: string, match: string) => (value: string) =>
    !!value && value === match ? null : errorMessage
