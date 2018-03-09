import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URL })
const wsClient = new SubscriptionClient(process.env.REACT_APP_SUB_URL, {
  reconnect: true,
})

const wsLink = new WebSocketLink(wsClient)

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})
