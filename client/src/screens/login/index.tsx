import { useState } from 'react'
import Container from '../../components/container'
import TextInput from '../../components/text-input'
import ValidationError from '../../components/validation-error'
import useTextInputState from '../../hooks/use-text-input-state'
import { notEmpty, validEmail } from '../../validations'

export default function Login() {
	const [emailAddress, setEmailAddress] = useState<string>('')
	const emailAddressState = useTextInputState({
		value: emailAddress,
		validations: [notEmpty('Email is required'), validEmail('Invalid email')],
	})

	return (
		<Container style={{ paddingTop: 40, paddingBottom: 40 }}>
			<div>Login page</div>
			<TextInput
				value={emailAddress}
				onChange={(e) => setEmailAddress(e.target.value)}
				onBlur={emailAddressState.onBlur}
				error={emailAddressState.showError}
				placeholder='Email address'
			/>
			{emailAddressState.showError && (
				<ValidationError>{emailAddressState.errorMessage}</ValidationError>
			)}
		</Container>
	)
}
