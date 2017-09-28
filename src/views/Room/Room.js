// @flow

import './Room.css'
import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'
import NowPlaying from './NowPlaying/NowPlaying'
import Droparea from 'components/Droparea'
import Queue from 'components/Queue'
import Users from 'components/Users'

type RoomProps = {
  data: {
    subscribeToMore: Function,
    error?: { message: string },
    loading: boolean,
    room: {
      currentTrack: {
        artists: {
          name: string
        }[],
        name: string,
        user: {
          id: string
        }
      },
      name: string,
      queue: {}[],
      users: {}[]
    }
  },
  match: {
    params: {
      name: string
    }
  }
}

export class Room extends Component {
  props: RoomProps

  componentWillMount () {
    const roomName = this.props.match.params.name

    this.props.data.subscribeToMore({
      document: queueUpdated,
      variables: {
        roomName
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev
        }

        return {
          ...prev,
          room: {
            ...prev.room,
            queue: subscriptionData.data.queueUpdated
          }
        }
      }
    })

    this.props.data.subscribeToMore({
      document: onNextTrack,
      variables: {
        roomName
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev
        }

        return {
          ...prev,
          room: {
            ...prev.room,
            currentTrack: subscriptionData.data.onNextTrack
          }
        }
      }
    })

    this.props.data.subscribeToMore({
      document: usersUpdated,
      variables: {
        roomName
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev
        }

        return {
          ...prev,
          room: {
            ...prev.room,
            users: subscriptionData.data.usersUpdated
          }
        }
      }
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

    return (
      <div>
        <Droparea roomName={room.name} />
        <div className="Room">
          <div className="Room__cover">
            <h2 className="Room__title">Now Playing</h2>
            <NowPlaying track={room.currentTrack} />
          </div>
          <div className="Room__content">
            <h2 className="Room__title">Queue</h2>
            <Queue tracks={room.queue} />
          </div>
          <div>
            <h2 className="Room__title">Users</h2>
            <Users users={room.users} />
          </div>
        </div>
      </div>
    )
  }
}

Room.fragments = {
  track: gql`
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
}

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
  ${Room.fragments.track}
`

export const queueUpdated = gql`
  subscription queueUpdated($roomName: String!) {
    queueUpdated(roomName: $roomName) {
      ...TrackInfo
    }
  }
  ${Room.fragments.track}
`

export const onNextTrack = gql`
  subscription onNextTrack($roomName: String!) {
    onNextTrack(roomName: $roomName) {
      ...TrackInfo
    }
  }
  ${Room.fragments.track}
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
    variables: { name: props.match.params.name }
  })
})(Room)
