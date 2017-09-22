import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'
import { startQuery } from './Start'

export class AddRoom extends Component {
  state = {
    roomName: ''
  }

  addRoom = () => {
    const { mutate } = this.props
    const { roomName } = this.state

    mutate({
      variables: {
        roomName
      },
      optimisticResponse: {
        addRoom: {
          name: roomName,
          __typename: 'Room'
        }
      },
      update: (store, { data: { addRoom } }) => {
        const data = store.readQuery({ query: startQuery })

        data.rooms.push(addRoom)

        store.writeQuery({ query: startQuery, data })
      }
    })

    this.setState({
      roomName: ''
    })
  }

  updateRoomName = event => {
    this.setState({
      roomName: event.target.value
    })
  }

  render () {
    return (
      <div>
        <input
          onChange={this.updateRoomName}
          placeholder="Room name"
          type="text"
          value={this.state.roomname}
        />
        <button onClick={this.addRoom}>Add new room</button>
      </div>
    )
  }
}

const AddRoomMutation = gql`
  mutation addRoom($roomName: String!) {
    addRoom(roomName: $roomName) {
      name
    }
  }
`

export default graphql(AddRoomMutation)(AddRoom)
