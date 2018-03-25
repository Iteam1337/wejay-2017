// @flow

import * as WejayApi from '../__generated__/RoomQuery'
import React from 'react'
import Cover from 'components/Cover/Cover'
import Gravatar from 'components/Gravatar/Gravatar'
import styled from 'styled-components'
import TrackMeta from 'components/Track/TrackMeta'
import { RoomContext } from '../RoomContainer'

type Props = {
  room: WejayApi.RoomQuery_room,
}

const NowPlayingWrap = styled.section`
  background-color: #fff;
  border-top: 1px solid #eaecef;
  bottom: 0;
  left: 0;
  padding: 20px;
  position: sticky;
  right: 0;
  z-index: 1;
`

const NowPlayingInner = styled.section`
  align-items: center;
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: auto 1fr 0 auto;
  margin-left: auto;
  margin-right: auto;
  max-width: 960px;

  @media (min-width: 769px) {
    grid-template-columns: auto 1fr auto;
  }
`

const NowPlaying = () => {
  return (
    <RoomContext.Consumer>
      {({ room }: Props) => {
        console.log(room)
        const { currentTrack } = room

        if (!currentTrack) {
          return null
        }

        return (
          <NowPlayingWrap>
            <NowPlayingInner>
              <Cover small track={currentTrack} width={40} />

              <TrackMeta
                artists={currentTrack.artists}
                name={currentTrack.name}
              />

              {currentTrack.user && (
                <Gravatar id={currentTrack.user.id} size={30} />
              )}
            </NowPlayingInner>
          </NowPlayingWrap>
        )
      }}
    </RoomContext.Consumer>
  )
}

export default NowPlaying
