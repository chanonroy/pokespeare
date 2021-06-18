/**
 * Shows error message if value is falsy.
 * @param errorMessage - The error message to show.
 */
export const notEmpty = (errorMessage: string) => (value: string) =>
	!value ? errorMessage : null
