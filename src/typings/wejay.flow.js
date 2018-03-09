// @flow

export type SubscribeToMoreOptions = {
  document: any,
  variables?: {
    [key: string]: any,
  },
  updateQuery?: (previousQueryResult: Object, options: {
    subscriptionData: {
        data: any,
    },
    variables?: {
      [key: string]: any,
    },
  }) => Object,
  onError?: (error: Error) => void,
}

export type ApolloBase<Data = {}> = {
  ...Data,
  error?: { message: string },
  loading: false,
  subscribeToMore: (options: SubscribeToMoreOptions) => void,
}
