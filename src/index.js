import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter, Route } from 'react-router-dom'
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo'
import {
  SubscriptionClient,
  addGraphQLSubscriptions
} from 'subscriptions-transport-ws'

import Start from './views/Start'
import Room from './views/Room'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql'
})

const wsClient = new SubscriptionClient('ws://localhost:4000/subscriptions', {
  reconnect: true
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
})

const AppRoot = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Start} />
          <Route exact path="/room/:name" component={Room} />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  )
}

ReactDOM.render(<AppRoot />, document.getElementById('root'))
registerServiceWorker()
