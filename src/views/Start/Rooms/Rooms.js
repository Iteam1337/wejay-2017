// @flow

import * as WejayApi from '../__generated__/StartQuery'
import * as React from 'react'
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

const RoomsTitle = styled.div`
  color: #333;
  margin-bottom: 20px;
`

const Rooms = ({ joinRoom, rooms }: Props) => {
  const hasRooms = rooms.length > 0

  return (
    <React.Fragment>
      <RoomsTitle>Rooms list</RoomsTitle>
      <RoomsList>
        {!hasRooms && <div>No active rooms</div>}

        {hasRooms &&
          rooms.map(room => (
            <Button key={room.name} onClick={() => joinRoom(room.name)}>
              {room.name}
            </Button>
          ))}
      </RoomsList>
    </React.Fragment>
  )
}

export default Rooms
