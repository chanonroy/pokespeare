import { gql, useMutation } from '@apollo/client'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { RoutePath } from '../../@types'
import { LoginMutation, LoginMutationVariables } from '../../@types/graphql'
import Button from '../../components/button'
import Container from '../../components/container'
import TextInput from '../../components/text-input'
import ValidationError from '../../components/validation-error'
import useTextInputState from '../../hooks/use-text-input-state'
import { AuthContext } from '../../providers/AuthProvider'
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

  const emailAddressState = useTextInputState({
    validations: [notEmpty('Email is required'), validEmail('Invalid email')],
  })
  const passwordState = useTextInputState({
    validations: [notEmpty('Password is required')],
  })

  const [loginMutation, { loading }] = useMutation<
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
      login(token)
      history.push(RoutePath.Home)
    } catch (err) {
      console.log(err)
    }
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
