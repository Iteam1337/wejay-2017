// @flow

import './Room.css'
import React, { Component } from 'react'
import Queue from 'components/Queue'
import Backdrop from 'components/Backdrop'
import Track from 'components/Track'
import Cover from 'components/Cover'
import AddTrack from './AddTrack'
import Next from './Next'
import { gql, graphql } from 'react-apollo'
import Droparea from 'components/Droparea'
import Users from 'components/Users'

export class Room extends Component {
  componentWillMount () {
    this.props.data.subscribeToMore({
      document: queueUpdated,
      variables: {
        roomName: this.props.match.params.name
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
        roomName: this.props.match.params.name
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
  }

  render () {
    const { data: { error, loading, room } } = this.props

    if (loading) {
      return <div>Loading</div>
    }

    if (error) {
      return <div>{error.message}</div>
    }

    return (
      <div>
        <Backdrop track={room.currentTrack} />
        <div className="Room__overlay" />
        <Droparea roomName={room.name} />
        <div className="Room">
          <div className="Room__cover">
            {room.currentTrack && <Cover album={room.currentTrack.album} />}
            <Users users={room.users} />
          </div>
          <div className="Room__content">
            {/* <AddTrack roomName={room.name} /> */}
            <Next roomName={room.name} />
            <Track track={room.currentTrack} />
            <Queue tracks={room.queue} />
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
      }
      queue {
        ...TrackInfo
      }
    }
  }
  ${Room.fragments.track}
`

const queueUpdated = gql`
  subscription queueUpdated($roomName: String!) {
    queueUpdated(roomName: $roomName) {
      ...TrackInfo
    }
  }
  ${Room.fragments.track}
  `

const onNextTrack = gql`
  subscription onNextTrack($roomName: String!) {
    onNextTrack(roomName: $roomName) {
      ...TrackInfo
    }
  }
  ${Room.fragments.track}
`

export default graphql(roomQuery, {
  options: props => ({
    variables: { name: props.match.params.name }
  })
})(Room)
