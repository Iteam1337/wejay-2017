// @flow

import * as Wejay from 'typings/wejay.flow'
import * as WejayApi from './__generated__/RoomQuery'
import React, { createContext, Component } from 'react'
import Room from './Room'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import * as storage from '../../utils/storage'

type RoomContainerProps = {
  addTrack: (options: Object) => Promise<void>,
  data: Wejay.ApolloBase<WejayApi.RoomQuery>,
  match: {
    params: {
      name: string,
    },
  },
}

export const RoomContext = createContext({
  queue: [],
})

class RoomContainer extends Component<RoomContainerProps> {
  componentDidMount () {
    const roomName = this.props.match.params.name

    this.props.data.subscribeToMore({
      document: RoomUpdated,
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
    const savedId = localStorage.getItem('id')
    const { id } = await storage.getValue(savedId)

    await this.props.addTrack({
      variables: {
        input: {
          roomName,
          userId: id,
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
            id,
            email: '',
            __typename: 'User',
          },
          __typename: 'Track',
        },
      },
      update: (store, { data: { queueTrack } }) => {
        const data = store.readQuery({
          query: RoomQuery,
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
          query: RoomQuery,
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

    return (
      <RoomContext.Provider
        value={{
          room,
          actions: { addToQueue: this.addToQueue },
        }}
      >
        <Room addToQueue={this.addToQueue} room={room} />
      </RoomContext.Provider>
    )
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

export const RoomQuery = gql`
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

export const RoomUpdated = gql`
  subscription RoomUpdated($roomName: String!) {
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

const AddTrackMutation = gql`
  mutation QueueTrack($input: QueueInput!) {
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
  graphql(RoomQuery, {
    options: props => ({
      variables: { name: props.match.params.name },
    }),
  }),
  graphql(AddTrackMutation, { name: 'addTrack' })
)(RoomContainer)
