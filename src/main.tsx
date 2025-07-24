import { ApolloProvider } from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'
import { client } from './lib/apollo-client'

if (import.meta.env.DEV) {
  const originalError = console.error
  console.error = (...args) => {
    const errorString = args[0]?.toString() || ''
    if (
      errorString.includes('chrome-extension://') ||
      errorString.includes('ERR_FILE_NOT_FOUND') ||
      errorString.includes('ERR_NETWORK_CHANGED')
    ) {
      return
    }
    originalError.apply(console, args)
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>,
)
