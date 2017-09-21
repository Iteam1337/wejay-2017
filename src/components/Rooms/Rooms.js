// @flow

import './Rooms.css'
import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'

export class Rooms extends Component {
  joinRoom = async name => {
    if (!localStorage.user) {
      return
    }

    const { mutate } = this.props

    await mutate({
      variables: {
        input: { roomName: name, email: localStorage.user }
      }
    })

    this.props.history.push(`/room/${name}`)
  }

  render () {
    const { rooms } = this.props

    return (
      <ul>
        {rooms.map((room, i) => (
          <li key={`room-${i}`}>
            <button onClick={() => this.joinRoom(room.name)}>
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
