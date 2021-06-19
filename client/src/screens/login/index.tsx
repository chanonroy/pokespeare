import Button from '../../components/button'
import Container from '../../components/container'
import TextInput from '../../components/text-input'
import ValidationError from '../../components/validation-error'
import useTextInputState from '../../hooks/use-text-input-state'
import { notEmpty, validEmail } from '../../validations'

export default function Login() {
	const emailAddressState = useTextInputState({
		validations: [notEmpty('Email is required'), validEmail('Invalid email')],
	})
	const passwordState = useTextInputState({
		validations: [notEmpty('Password is required')],
	})

	const handleLogin = () => {
		emailAddressState.onBlur()
		passwordState.onBlur()

		if (emailAddressState.hasError || passwordState.hasError) {
			return
		}

		// TODO: perform action
	}

	return (
		<Container style={{ paddingTop: 40, paddingBottom: 40 }}>
			<div>Login page</div>
			<TextInput
				value={emailAddressState.value}
				onChange={(e) => emailAddressState.onChange(e.target.value)}
				onBlur={emailAddressState.onBlur}
				error={emailAddressState.showError}
				placeholder='Email address'
			/>
			{emailAddressState.showError && (
				<ValidationError>{emailAddressState.errorMessage}</ValidationError>
			)}

			<TextInput
				type='password'
				value={passwordState.value}
				onChange={(e) => passwordState.onChange(e.target.value)}
				onBlur={passwordState.onBlur}
				error={passwordState.showError}
				placeholder='Password'
			/>
			{passwordState.showError && (
				<ValidationError>{passwordState.errorMessage}</ValidationError>
			)}

			<Button onClick={handleLogin}>Login</Button>
		</Container>
	)
}
