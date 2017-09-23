// @flow

import './Rooms.css'
import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'

export class Rooms extends Component {
  joinRoom = async name => {
    if (!localStorage.getItem('user')) {
      return
    }

    const { mutate } = this.props

    await mutate({
      variables: {
        input: { roomName: name, email: localStorage.getItem('user') }
      }
    })

    this.props.history.push(`/room/${name}`)
  }

  render () {
    const { rooms } = this.props

    if (!rooms.length) {
      return <div>No active rooms</div>
    }

    return (
      <ul className="Rooms">
        {rooms.map((room, i) => (
          <li className="Rooms__room" key={`room-${i}`}>
            <button
              className="Rooms__button"
              onClick={() => this.joinRoom(room.name)}
            >
              {room.name}
            </button>
          </li>
        ))}
      </ul>
    )
  }
}

const joinRoomMutation = gql`
  mutation joinRoom($input: JoinRoomInput!) {
    joinRoom(input: $input) {
      name
    }
  }
`

export default withRouter(graphql(joinRoomMutation)(Rooms))
