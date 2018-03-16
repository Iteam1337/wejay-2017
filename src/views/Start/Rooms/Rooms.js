// @flow

import './Rooms.css'
import * as WejayApi from '../__generated__/StartQuery'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import * as ReactRouterDOM from 'react-router-dom'
import gql from 'graphql-tag'

type RoomsProps = {
  ...ReactRouterDOM.ContextRouter,
  mutate: Function,
  rooms: $PropertyType<WejayApi.StartQuery, "rooms">,
}

export class Rooms extends Component<RoomsProps> {
  joinRoom = async (name: string) => {
    if (!localStorage.getItem('user')) {
      return
    }

    const { mutate } = this.props

    await mutate({
      variables: {
        input: { roomName: name, email: localStorage.getItem('user') },
      },
    })

    this.props.history.push(`/room/${name}`)
  };

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

const JoinRoomMutation = gql`
  mutation JoinRoom($input: JoinRoomInput!) {
    joinRoom(input: $input) {
      name
    }
  }
`

export default ReactRouterDOM.withRouter(graphql(JoinRoomMutation)(Rooms))
