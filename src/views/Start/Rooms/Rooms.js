// @flow

import * as WejayApi from '../__generated__/StartQuery'
import React from 'react'
import Button from '../../../components/Button/Button'
import styled from 'styled-components'

type Props = {
  joinRoom: (roomName: string) => Promise<void>,
  rooms: $PropertyType<WejayApi.StartQuery, "rooms">,
}

const RoomsList = styled.div`
  display: grid;
  grid-row-gap: 5px;
`

const Rooms = ({ joinRoom, rooms }: Props) => {
  if (rooms.length === 0) {
    return <div>No active rooms</div>
  }

  return (
    <RoomsList>
      {rooms.map(room => (
        <Button key={room.name} onClick={() => joinRoom(room.name)}>
          {room.name}
        </Button>
      ))}
    </RoomsList>
  )
}

export default Rooms
