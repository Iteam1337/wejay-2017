// @flow

import './Droparea.css'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { roomQuery } from 'views/Room/Room'
import classnames from 'classnames'
import md5 from 'md5'

type Props = {
  message?: string,
  mutate: Function,
  roomName: string,
}

type State = {
  isDragOver: boolean,
}

export class Droparea extends Component<Props, State> {
  static defaultProps = {
    message: 'Drop it like it\'s hot!',
  }

  state = {
    isDragOver: false,
  }

  onDragEnter = (e: SyntheticDragEvent<HTMLTextAreaElement>) => {
    if (e) {
      e.preventDefault()
    }

    this.setState({
      isDragOver: true,
    })
  }

  onDragLeave = (e: SyntheticDragEvent<HTMLTextAreaElement>) => {
    if (e) {
      e.preventDefault()
    }

    this.setState({
      isDragOver: false,
    })
  }

  _onDrop = (e: SyntheticDragEvent<HTMLTextAreaElement>) => {
    const { mutate, roomName } = this.props
    const userId = md5(localStorage.getItem('user'))

    e.stopPropagation()
    e.preventDefault()

    const songs = e.dataTransfer
      .getData('text')
      .replace(/https:\/\/open.spotify.com\/track\//gi, '')
      .split('\n')

    songs.reverse().forEach(track => {
      mutate({
        variables: {
          input: {
            roomName,
            userId,
            spotifyId: track,
          },
        },
        optimisticResponse: {
          queueTrack: {
            album: [],
            artists: [
              {
                name: 'Loading',
                __typename: 'Artist',
              },
            ],
            duration: 0,
            name: 'Awesome track',
            spotifyUri: track,
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
    })

    this.setState({
      isDragOver: false,
    })
  }

  render () {
    return (
      <div className="Droparea__wrap">
        <textarea
          className={classnames('Droparea', {
            'Droparea--is-dragging': this.state.isDragOver,
          })}
          defaultValue={this.props.message}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          onDrop={this._onDrop}
          spellCheck={false}
        />
      </div>
    )
  }
}

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

export default graphql(addTrackMutation)(Droparea)
