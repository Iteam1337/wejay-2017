// @flow

import * as React from 'react'
import * as WejayApi from '__generated__/types.flow'
import NowPlaying from './NowPlaying/NowPlaying'
import Droparea from 'components/Droparea'
import Queue from 'components/Queue'
import RoomHeader from './RoomHeader'
import WejayHeader from './WejayHeader'
import styled from 'styled-components'

export type RoomType = $PropertyType<WejayApi.RoomQueryQuery, 'room'>
type RoomProps = {
  room: Room,
}

const RoomOuter = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`

const RoomWrap = styled.section`
  display: grid;
  grid-row-gap: 30px;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  margin: 40px auto;
  max-width: 960px;
  width: 100%;
`

const Room = ({ room }: RoomProps) => {
  return (
    <RoomOuter>
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

      <NowPlaying track={room.currentTrack} />
    </RoomOuter>
  )
}

export default Room
