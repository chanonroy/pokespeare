import { gql, useMutation } from '@apollo/client'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Colors, RoutePath } from '../../@types'
import { SignUpMutation, SignUpMutationVariables } from '../../@types/graphql'
import Button from '../../components/button'
import Card from '../../components/card'
import Container from '../../components/container'
import HeroImage from '../../components/hero-image'
import TextInput from '../../components/text-input'
import TextInputLabel from '../../components/text-input-label'
import ValidationError from '../../components/validation-error'
import useTextInputState from '../../hooks/use-text-input-state'
import { AuthContext } from '../../providers/AuthProvider'
import { isMatch, notEmpty, validEmail } from '../../utils/validations'

const SIGN_UP_MUTATION = gql`
  mutation SignUpMutation($emailAddress: String!, $password: String!) {
    signUp(input: { emailAddress: $emailAddress, password: $password }) {
      user {
        id
        emailAddress
      }
      accessToken
    }
  }
`

export default function SignUp() {
  const history = useHistory()
  const { login } = useContext(AuthContext)

  const emailAddressState = useTextInputState({
    validations: [notEmpty('Email is required'), validEmail('Invalid email')],
  })
  const passwordState = useTextInputState({
    validations: [notEmpty('Password is required')],
  })
  const confirmPasswordState = useTextInputState({
    validations: [
      notEmpty('Password is required'),
      isMatch('Passwords do not match', passwordState.value),
    ],
  })

  const [signUpMutation, { loading }] = useMutation<
    SignUpMutation,
    SignUpMutationVariables
  >(SIGN_UP_MUTATION)

  const handleSignUp = async () => {
    emailAddressState.onBlur()
    passwordState.onBlur()
    confirmPasswordState.onBlur()

    if (emailAddressState.hasError || passwordState.hasError) {
      return
    }

    try {
      const { data } = await signUpMutation({
        variables: {
          emailAddress: emailAddressState.cleanValue,
          password: passwordState.cleanValue,
        },
      })
      const token = data?.signUp.accessToken || ''
      login(token)
      history.push(RoutePath.Home)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container style={{ paddingTop: 80, paddingBottom: 40 }}>
      <HeroImage />
      <Card style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <div
            style={{
              color: Colors.primary,
              fontWeight: 'bold',
              fontSize: 35,
              marginBottom: 15,
            }}
          >
            Join the party
          </div>
          <div style={{ fontSize: 14, color: 'darkgrey' }}>
            To sign up, or not to sign up: that is the question
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <TextInputLabel>Email address</TextInputLabel>
          <TextInput
            value={emailAddressState.value}
            onChange={(e) => emailAddressState.onChange(e.target.value)}
            error={emailAddressState.showError}
            placeholder='Enter your email'
            onKeyUp={({ key }) => {
              if (key === 'Enter') {
                handleSignUp()
              }
            }}
          />
          {emailAddressState.showError && (
            <ValidationError>{emailAddressState.errorMessage}</ValidationError>
          )}
        </div>

        <div style={{ marginBottom: 20 }}>
          <TextInputLabel>Password</TextInputLabel>
          <TextInput
            type='password'
            value={passwordState.value}
            onChange={(e) => passwordState.onChange(e.target.value)}
            error={passwordState.showError}
            placeholder='Enter a good password'
            onKeyUp={({ key }) => {
              if (key === 'Enter') {
                handleSignUp()
              }
            }}
          />
          {passwordState.showError && (
            <ValidationError>{passwordState.errorMessage}</ValidationError>
          )}
        </div>

        <div style={{ marginBottom: 40 }}>
          <TextInputLabel>Confirm Password</TextInputLabel>
          <TextInput
            type='password'
            value={confirmPasswordState.value}
            onChange={(e) => confirmPasswordState.onChange(e.target.value)}
            error={confirmPasswordState.showError}
            placeholder='Confirm your password'
            onKeyUp={({ key }) => {
              if (key === 'Enter') {
                handleSignUp()
              }
            }}
          />
          {confirmPasswordState.showError && (
            <ValidationError>
              {confirmPasswordState.errorMessage}
            </ValidationError>
          )}
        </div>

        <Button onClick={handleSignUp} style={{ width: '100%' }}>
          Sign Up
        </Button>
      </Card>

      <div style={{ textAlign: 'center', color: 'darkgrey' }}>
        Et tu, existing user?{' '}
        <a
          href={RoutePath.Login}
          style={{
            color: Colors.primary,
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
        >
          Login
        </a>
      </div>
    </Container>
  )
}
