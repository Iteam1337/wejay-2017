import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import asyncComponent from './asyncComponent'
import { client } from './apolloSetup'
import { theme } from './theme'
import { ThemeProvider } from 'styled-components'

const StartAsync = asyncComponent(() => import('./views/Start/Start'))
const RoomAsync = asyncComponent(() => import('./views/Room/RoomContainer'))

const AppRoot = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div>
            <Route component={StartAsync} exact path="/" />
            <Route component={RoomAsync} exact path="/room/:name" />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  )
}

ReactDOM.render(<AppRoot />, document.getElementById('root'))
