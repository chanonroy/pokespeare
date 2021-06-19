import { ApolloProvider } from '@apollo/client'
import React from 'react'
import apolloClient from './apolloClient'
import AuthProvider from './providers/AuthProvider'
import Router from './router'

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ApolloProvider>
  )
}
