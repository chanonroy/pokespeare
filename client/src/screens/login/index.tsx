import { gql, useMutation } from '@apollo/client'
import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Colors, GraphQLErrorCode, RoutePath } from '../../@types'
import { LoginMutation, LoginMutationVariables } from '../../@types/graphql'
import ActivityIcon from '../../components/activity-icon'
import Button from '../../components/button'
import Card from '../../components/card'
import Container from '../../components/container'
import ErrorBanner from '../../components/error-banner'
import HeroImage from '../../components/hero-image'
import TextInput from '../../components/text-input'
import TextInputLabel from '../../components/text-input-label'
import ValidationError from '../../components/validation-error'
import useTextInputState from '../../hooks/use-text-input-state'
import { AuthContext } from '../../providers/AuthProvider'
import { getErrorCode } from '../../utils/apolloUtils'
import { notEmpty, validEmail } from '../../utils/validations'

const LOGIN_MUTATION = gql`
  mutation LoginMutation($emailAddress: String!, $password: String!) {
    login(input: { emailAddress: $emailAddress, password: $password }) {
      user {
        id
        emailAddress
      }
      accessToken
    }
  }
`

export default function Login() {
  const history = useHistory()
  const { login } = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const emailAddressState = useTextInputState({
    validations: [
      notEmpty('Email is required'),
      validEmail('Please enter a valid email'),
    ],
  })
  const passwordState = useTextInputState({
    validations: [notEmpty('Password is required')],
  })

  const [loginMutation, { loading: loginLoading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION)

  const handleLogin = async () => {
    emailAddressState.onBlur()
    passwordState.onBlur()

    if (emailAddressState.hasError || passwordState.hasError) {
      return
    }

    try {
      const { data } = await loginMutation({
        variables: {
          emailAddress: emailAddressState.cleanValue,
          password: passwordState.cleanValue,
        },
      })
      const token = data?.login.accessToken || ''

      // Tell auth provider that we're logged in
      login(token)

      // Navigate to home
      history.push(RoutePath.Home)
    } catch (err) {
      const errorCode = getErrorCode(err)
      switch (errorCode) {
        case GraphQLErrorCode.InvalidCredentials:
          setErrorMessage('Your email and password combination are invalid')
          break
        default:
          setErrorMessage('An error has occurred. Please try again later.')
      }
    }
  }

  return (
    <Container
      style={{
        paddingTop: 80,
        paddingBottom: 40,
      }}
    >
      <HeroImage />
      <Card style={{ marginBottom: 40 }}>
        {/* Information Text */}
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <div
            style={{
              color: Colors.primary,
              fontWeight: 'bold',
              fontSize: 35,
              marginBottom: 15,
            }}
          >
            Pokespeare
          </div>
          <div style={{ fontSize: 14, color: 'darkgrey', marginBottom: 20 }}>
            The Pokemon search engine with hint of Shakespeare
          </div>
          {errorMessage && <ErrorBanner message={errorMessage} />}
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
                handleLogin()
              }
            }}
          />
          {emailAddressState.showError && (
            <ValidationError>{emailAddressState.errorMessage}</ValidationError>
          )}
        </div>

        <div style={{ marginBottom: 40 }}>
          <TextInputLabel>Password</TextInputLabel>
          <TextInput
            type='password'
            value={passwordState.value}
            onChange={(e) => passwordState.onChange(e.target.value)}
            error={passwordState.showError}
            placeholder='Enter your password'
            onKeyUp={({ key }) => {
              if (key === 'Enter') {
                handleLogin()
              }
            }}
          />
          {passwordState.showError && (
            <ValidationError>{passwordState.errorMessage}</ValidationError>
          )}
        </div>

        <Button onClick={handleLogin} style={{ width: '100%' }}>
          {loginLoading && <ActivityIcon style={{ position: 'absolute' }} />}
          Login
        </Button>
      </Card>

      {/* Sign up link */}
      <div style={{ textAlign: 'center', color: 'darkgrey' }}>
        Need an account?{' '}
        <a
          href={RoutePath.SignUp}
          style={{
            color: Colors.primary,
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
        >
          Sign up
        </a>
      </div>
    </Container>
  )
}
