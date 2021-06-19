import { useState } from 'react'

interface HookResult {
	value: string
	cleanValue: string
	hasError: boolean
	showError: boolean
	errorMessage: string
	onBlur: () => void
	onChange: (value: string) => void
}

export default function useTextInputState({
	value: valueFromProps = '',
	trimValue = true,
	validations = [],
}: {
	value?: string
	trimValue?: boolean
	validations?: ((value: string) => string | null)[]
}): HookResult {
	const [changedValue, setChangedValue] = useState<string | null>(null)
	const [blurred, setBlurred] = useState(false)

	const value = changedValue ?? valueFromProps
	const cleanValue = trimValue ? value.trim() : value
	const errorMessage = validations.reduce(
		(prev, validation) => prev || validation(cleanValue) || '',
		''
	)

	return {
		value,
		cleanValue,
		hasError: !!errorMessage,
		showError: blurred && !!errorMessage,
		errorMessage,
		onBlur: () => setBlurred(true),
		onChange: (value: string) => setChangedValue(value),
	}
}
