import { ApolloProvider } from '@apollo/client'
import React from 'react'
import apolloClient from './apolloClient'
import Router from './router'

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Router />
    </ApolloProvider>
  )
}
