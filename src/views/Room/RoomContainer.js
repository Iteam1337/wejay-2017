// @flow

import * as Wejay from 'typings/wejay.flow'
import * as WejayApi from '__generated__/types.flow'
import React, { Component } from 'react'
import Room from './Room'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

type Props = {
  data: Wejay.ApolloBase<WejayApi.RoomQueryQuery>,
  match: {
    params: {
      name: string,
    },
  },
}

class RoomContainer extends Component<Props> {
  componentDidMount () {
    const roomName = this.props.match.params.name

    this.props.data.subscribeToMore({
      document: queueUpdated,
      variables: {
        roomName,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev
        }

        return {
          ...prev,
          room: {
            ...prev.room,
            queue: subscriptionData.data.queueUpdated,
          },
        }
      },
    })

    this.props.data.subscribeToMore({
      document: onNextTrack,
      variables: {
        roomName,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev
        }

        return {
          ...prev,
          room: {
            ...prev.room,
            currentTrack: subscriptionData.data.onNextTrack,
          },
        }
      },
    })

    this.props.data.subscribeToMore({
      document: usersUpdated,
      variables: {
        roomName,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev
        }

        return {
          ...prev,
          room: {
            ...prev.room,
            users: subscriptionData.data.usersUpdated,
          },
        }
      },
    })
  }

  render () {
    const { data: { error, loading, room } } = this.props

    if (loading) {
      return (
        <div className="Loading">
          Loading
          <div className="Loader" />
        </div>
      )
    }

    if (error) {
      return <div className="Error">{error.message}</div>
    }

    return <Room room={room} />
  }
}

const TrackInfoFragment = gql`
  fragment TrackInfo on Track {
    album {
      images {
        height
        url
        width
      }
      name
    }
    artists {
      name
    }
    duration
    name
    spotifyUri
    started
    user {
      email
      id
    }
  }
`

export const roomQuery = gql`
  query RoomQuery($name: String!) {
    room(name: $name) {
      currentTrack {
        ...TrackInfo
      }
      name
      users {
        email
        id
        lastPlay
      }
      queue {
        ...TrackInfo
      }
    }
  }

  ${TrackInfoFragment}
`

export const queueUpdated = gql`
  subscription queueUpdated($roomName: String!) {
    queueUpdated(roomName: $roomName) {
      ...TrackInfo
    }
  }

  ${TrackInfoFragment}
`

export const onNextTrack = gql`
  subscription onNextTrack($roomName: String!) {
    onNextTrack(roomName: $roomName) {
      ...TrackInfo
    }
  }

  ${TrackInfoFragment}
`

export const usersUpdated = gql`
  subscription usersUpdated($roomName: String!) {
    usersUpdated(roomName: $roomName) {
      email
      id
      lastPlay
    }
  }
`

export default graphql(roomQuery, {
  options: props => ({
    variables: { name: props.match.params.name },
  }),
})(RoomContainer)
