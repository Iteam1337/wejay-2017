// @flow

import * as React from 'react'
import * as WejayApi from './__generated__/RoomQuery'
import NowPlaying from './NowPlaying/NowPlaying'
import Droparea from 'components/Droparea/Droparea'
import TrackList from 'components/TrackList/TrackList'
import RoomHeader from './RoomHeader'
import Search from './Search/Search'
import WejayHeader from './WejayHeader'
import styled from 'styled-components'

type RoomProps = {
  addToQueue: (spotifyId: string) => Promise<void>,
  room: WejayApi.RoomQuery_room,
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
  grid-template-rows: auto auto 1fr;
  margin: 40px auto 0;
  max-width: 960px;
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
  width: 100%;
  z-index: 1;

  @media (min-width: 1025px) {
    padding-left: 0;
    padding-right: 0;
  }
`

const Room = ({ addToQueue, room }: RoomProps) => {
  return (
    <RoomOuter>
      <WejayHeader />
      <Droparea addToQueue={addToQueue} />

      <RoomWrap>
        <RoomHeader />
        <Search
          addToQueue={addToQueue}
          currentQueue={room.queue}
          currentTrack={room.currentTrack}
        />
        <TrackList />
      </RoomWrap>

      <NowPlaying />
    </RoomOuter>
  )
}

export default Room
