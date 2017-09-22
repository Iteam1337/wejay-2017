import React from 'react'
import { roomQuery } from './Room'
import { gql, graphql } from 'react-apollo'
import md5 from 'md5'

const AddTrack = ({ mutate, roomName }) => {
  const handleKeyUp = evt => {
    if (evt.keyCode === 13) {
      const userId = md5(localStorage.getItem('user'))

      mutate({
        variables: {
          input: {
            roomName,
            userId,
            spotifyId: evt.target.value
          }
        },
        optimisticResponse: {
          queueTrack: {
            album: [],
            artists: [],
            duration: 0,
            name: '',
            spotifyUri: evt.target.value,
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

      evt.target.value = ''
    }
  }

  return (
    <div>
      <input onKeyUp={handleKeyUp} placeholder="Spotify URI" type="text" />
    </div>
  )
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

export default graphql(addTrackMutation)(AddTrack)
