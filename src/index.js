import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Route } from 'react-router-dom'
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo'
import {
  SubscriptionClient,
  addGraphQLSubscriptions,
} from 'subscriptions-transport-ws'
import asyncComponent from './asyncComponent'

const StartAsync = asyncComponent(() => import('./views/Start'))
const RoomAsync = asyncComponent(() => import('./views/Room'))

const networkInterface = createNetworkInterface({
  uri: process.env.REACT_APP_GRAPHQL_URL,
})

const wsClient = new SubscriptionClient(process.env.REACT_APP_SUB_URL, {
  reconnect: true,
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
})

const AppRoot = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div>
          <Route exact path="/" component={StartAsync} />
          <Route exact path="/room/:name" component={RoomAsync} />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  )
}

ReactDOM.render(<AppRoot />, document.getElementById('root'))
registerServiceWorker()
