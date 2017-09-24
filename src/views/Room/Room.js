// @flow

import './Room.css'
import React, { Component } from 'react'
import { queueUpdated, onNextTrack } from './RoomContainer'
import { gql } from 'react-apollo'
import Cover from 'components/Cover'
import Droparea from 'components/Droparea'
import Gravatar from 'components/Gravatar'
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

export default class Room extends Component {
  props: RoomProps

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
        <Droparea roomName={room.name} />
        <div className="Room">
          <div className="Room__cover">
            <h2 className="Room__title">Now Playing</h2>
            {room.currentTrack && <Cover track={room.currentTrack} />}
            {room.currentTrack && (
              <div className="Room__now-playing">
                <div className="Room__now-playing-track">
                  <div className="Track__artist">
                    {room.currentTrack.artists.map(t => t.name).join(', ')}
                  </div>
                  <div className="Track__name">{room.currentTrack.name}</div>
                </div>
                <Gravatar id={room.currentTrack.user.id} size={30} />
              </div>
            )}
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
