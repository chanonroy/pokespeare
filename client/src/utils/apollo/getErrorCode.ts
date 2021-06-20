import { ApolloError } from '@apollo/client'

/**
 * If the provided Apollo error describes GraphQL errors, returns the error code from that error. Otherwise returns undefined.
 * @param error The error to evaluate.
 */
export default function getErrorCode(error: ApolloError): string | undefined {
  return (error.graphQLErrors ?? [])[0]?.extensions?.code
}
