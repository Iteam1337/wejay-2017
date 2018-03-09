// @flow

import * as React from 'react'
import * as WejayApi from '__generated__/types.flow'
// import NowPlaying from './NowPlaying/NowPlaying'
import Droparea from 'components/Droparea'
import Queue from 'components/Queue'
// import Users from 'components/Users'
import RoomHeader from './RoomHeader'
import WejayHeader from './WejayHeader'
import styled from 'styled-components'

export type Room = $PropertyType<WejayApi.RoomQueryQuery, 'room'>
type RoomProps = {
  room: Room,
}

const RoomWrap = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 30px;
  margin: 40px auto;
  max-width: 960px;
`

const Room = ({ room }: RoomProps) => {
  return (
    <React.Fragment>
      <WejayHeader />
      <RoomWrap>
        <RoomHeader
          name={room.name}
          queue={room.queue}
          users={room.users.length}
        />
        <Queue tracks={room.queue} />
        <Droparea roomName={room.name} />
      </RoomWrap>
    </React.Fragment>
  )
}

export default Room
