// @flow

import './Room.css'
import React, { Component } from 'react'
import Queue from 'components/Queue'
import AddTrack from './AddTrack'
import Next from './Next'
import { gql, graphql } from 'react-apollo'
import { timeParser } from 'utils/parsers'
import Cover from 'components/Cover'
import Gravatar from 'components/Gravatar'
import Droparea from 'components/Droparea'

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
        {room.name}

        <AddTrack roomName={room.name} />
        <hr />
        <Next roomName={room.name} />
        <hr />
        <Droparea roomName={room.name} />

        {room.currentTrack && (
          <div>
            <Cover album={room.currentTrack.album} width={50} />
            {room.currentTrack.artists.map(t => t.name).join(',')} -{' '}
            {room.currentTrack.name} ({timeParser(room.currentTrack.duration)})
          </div>
        )}

        <ul>
          {room.users.map(user => (
            <li key={user.id}>
              <Gravatar email={user.email} />
            </li>
          ))}
        </ul>

        <Queue tracks={room.queue} />
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
      user
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
