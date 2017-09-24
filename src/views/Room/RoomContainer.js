import { gql, graphql } from 'react-apollo'
import Room from './Room'

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

export default graphql(roomQuery, {
  options: props => ({
    variables: { name: props.match.params.name }
  })
})(Room)
