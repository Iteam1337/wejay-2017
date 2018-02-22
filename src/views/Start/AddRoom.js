// @flow

import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { startQuery } from './Start'
import gql from 'graphql-tag'

type Props = {
  mutate: Function,
}

type State = {
  roomName: string,
}

export class AddRoom extends Component<Props, State> {
  state = {
    roomName: '',
  }

  addRoom = (event: SyntheticInputEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { mutate } = this.props
    const { roomName } = this.state

    mutate({
      variables: {
        roomName,
      },
      optimisticResponse: {
        addRoom: {
          name: roomName,
          __typename: 'Room',
        },
      },
      update: (store, { data: { addRoom } }) => {
        const data = store.readQuery({ query: startQuery })

        data.rooms.push(addRoom)

        store.writeQuery({ query: startQuery, data })
      },
    })

    this.setState({
      roomName: '',
    })
  }

  updateRoomName = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      roomName: event.target.value,
    })
  }

  render () {
    const { roomName } = this.state

    return (
      <div className="AddRoom">
        <form method="POST" onSubmit={this.addRoom}>
          <input
            className="Input"
            onChange={this.updateRoomName}
            placeholder="Room name"
            type="text"
            value={this.state.roomName}
          />
          <button
            className="Rooms__button"
            disabled={roomName.length === 0}
            type="submit">
            Add new room
          </button>
        </form>
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
