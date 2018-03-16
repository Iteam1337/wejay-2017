import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import asyncComponent from './asyncComponent'
import { client } from './apolloSetup'
import { theme } from './theme'
import { injectGlobal, ThemeProvider } from 'styled-components'

injectGlobal`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    background-color: #fff;
    color: #afafc7;
    font-family: 'Roboto', Helvetica, sans-serif;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`

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
