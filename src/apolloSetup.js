import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URL })
const wsClient = new SubscriptionClient(process.env.REACT_APP_SUB_URL || '', {
  reconnect: true,
})

const subscriptionLink = new WebSocketLink(wsClient)

export const client = new ApolloClient({
  link: ApolloLink.from([httpLink, subscriptionLink]),
  cache: new InMemoryCache(),
})
