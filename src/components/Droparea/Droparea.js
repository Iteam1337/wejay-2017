import React, { Component } from 'react'
import './Droparea.css'
import { gql, graphql } from 'react-apollo'
import { roomQuery } from 'views/Room/Room'

class Droparea extends Component {
  state = {
    isDragOver: false
  }

  _onDragEnter = e => {
    if (e) {
      e.preventDefault()
    }

    this.setState({
      isDragOver: true
    })
  }

  _onDragLeave = e => {
    if (e) {
      e.preventDefault()
    }

    this.setState({
      isDragOver: false
    })
  }

  _onDrop = e => {
    const { mutate, roomName } = this.props

    e.stopPropagation()
    e.preventDefault()

    const songs = e.dataTransfer
      .getData('text')
      .replace(/https:\/\/open.spotify.com\/track\//gi, '')
      .split('\n')

    console.log(songs)

    songs.forEach(track => {
      mutate({
        variables: {
          input: {
            roomName,
            spotifyId: track,
            userId: '01ba46cb8ee556f83c580648547e0fbc'
          }
        },
        optimisticResponse: {
          queueTrack: {
            album: [],
            artists: [],
            duration: 0,
            name: '',
            spotifyUri: track,
            user: '',
            __typename: 'Track'
          }
        },
        update: (store, { data: { queueTrack } }) => {
          const data = store.readQuery({
            query: roomQuery,
            variables: {
              name: roomName
            }
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
              name: roomName
            },
            data
          })
        }
      })
    })

    // Promise.all(songs.map(song => get(song)))
    //   .then(tracks => {
    //     tracks.forEach(track => this.props.roomActions.addTrack(track))

    //     this.setState({
    //       isDragOver: false
    //     })
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     this.props.toastActions.add({
    //       message: 'Song was not hot enough.',
    //       type: 'error'
    //     })

    //     this.setState({
    //       isDragOver: false
    //     })
    //   })
  }

  render () {
    return (
      <div className="Droparea__wrap">
        <textarea
          className="Droparea"
          defaultValue={this.props.message}
          onDragEnter={this._onDragEnter}
          onDragLeave={this._onDragLeave}
          onDrop={this._onDrop}
          spellCheck={false}
        />
      </div>
    )
  }
}

Droparea.defaultProps = {
  message: 'Drop it like it\'s hot!'
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
      user
    }
  }
`

export default graphql(addTrackMutation)(Droparea)
