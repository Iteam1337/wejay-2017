// @flow

import * as Wejay from 'typings/wejay.flow'
import * as WejayApi from '__generated__/types.flow'
import React, { Component } from 'react'
import Room from './Room'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import md5 from 'md5'

type RoomContainerProps = {
  addTrack: (options: Object) => Promise<WejayApi.TrackInfoFragment>,
  data: Wejay.ApolloBase<WejayApi.RoomQueryQuery>,
  match: {
    params: {
      name: string,
    },
  },
}

class RoomContainer extends Component<RoomContainerProps> {
  componentDidMount () {
    const roomName = this.props.match.params.name

    this.props.data.subscribeToMore({
      document: roomUpdated,
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
            ...subscriptionData.data.roomUpdated,
          },
        }
      },
    })
  }

  addToQueue = async spotifyId => {
    const roomName = this.props.match.params.name
    const userId = md5(localStorage.getItem('user'))

    await this.props.addTrack({
      variables: {
        input: {
          roomName,
          userId,
          spotifyId,
        },
      },
      optimisticResponse: {
        queueTrack: {
          album: {
            images: [],
            name: 'Fake album',
            __typename: 'Album',
          },
          artists: [
            {
              name: 'Loading',
              __typename: 'Artist',
            },
          ],
          duration: 0,
          name: 'Awesome track',
          spotifyUri: spotifyId,
          started: 0,
          user: {
            email: '',
            id: userId,
            __typename: 'User',
          },
          __typename: 'Track',
        },
      },
      update: (store, { data: { queueTrack } }) => {
        const data = store.readQuery({
          query: roomQuery,
          variables: {
            name: roomName,
          },
        })

        const exists = data.room.queue.find(
          track => track.spotifyUri === queueTrack.spotifyUri
        )

        const notCurrent =
          data.room.currentTrack &&
          data.room.currentTrack.spotifyUri !== queueTrack.spotifyUri

        if (!exists && notCurrent) {
          data.room.queue.push(queueTrack)
        }

        store.writeQuery({
          query: roomQuery,
          variables: {
            name: roomName,
          },
          data,
        })
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
      return <div>{error.message}</div>
    }

    return <Room addToQueue={this.addToQueue} room={room} />
  }
}

export const TrackInfoFragment = gql`
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

const UserInfoFragment = gql`
  fragment UserInfo on User {
    email
    id
    lastPlay
  }
`

export const roomQuery = gql`
  query RoomQuery($name: String!) {
    room(name: $name) {
      currentTrack {
        ...TrackInfo
      }
      isPlaying
      name
      users {
        ...UserInfo
      }
      queue {
        ...TrackInfo
      }
    }
  }

  ${TrackInfoFragment}
  ${UserInfoFragment}
`

export const roomUpdated = gql`
  subscription roomUpdated($roomName: String!) {
    roomUpdated(roomName: $roomName) {
      currentTrack {
        ...TrackInfo
      }
      isPlaying
      name
      users {
        ...UserInfo
      }
      queue {
        ...TrackInfo
      }
    }
  }

  ${TrackInfoFragment}
  ${UserInfoFragment}
`

const addTrackMutation = gql`
  mutation queueTrack($input: QueueInput!) {
    queueTrack(input: $input) {
      album {
        images {
          url
        }
        name
      }
      artists {
        name
      }
      duration
      name
      spotifyUri
      user {
        email
        id
      }
    }
  }
`

export default compose(
  graphql(roomQuery, {
    options: props => ({
      variables: { name: props.match.params.name },
    }),
  }),
  graphql(addTrackMutation, { name: 'addTrack' })
)(RoomContainer)
