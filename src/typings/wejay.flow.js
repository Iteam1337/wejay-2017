// @flow

export type SubscribeToMoreOptions = {
  document: any,
  onError?: (error: Error) => void,
  updateQuery?: (
    previousQueryResult: Object,
    options: {
      subscriptionData: {
        data: any,
      },
      variables?: {
        [key: string]: any,
      },
    }
  ) => Object,
  variables?: {
    [key: string]: any,
  },
}

export type ApolloBase<Data = {}> = {
  ...$Exact<Data>,
  error?: { message: string },
  loading: false,
  subscribeToMore: (options: SubscribeToMoreOptions) => void,
}
