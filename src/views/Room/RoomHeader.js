// @flow

import React from 'react'
import * as WejayApi from './__generated__/RoomQuery'
import styled from 'styled-components'
import humanizeDuration from 'humanize-duration'
import pluralize from 'pluralize'
import PlayButton from './PlayButton'
import { RoomContext } from './RoomContainer'

type Props = {
  room: WejayApi.RoomQuery_room,
}

const RoomHeaderWrap = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 1fr auto;
`

const PlaylistTitle = styled.div`
  font-size: 12px;
  text-transform: uppercase;
`

const RoomName = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-family: 'Roboto Slab';
  font-size: 32px;
  font-weight: 400;
  line-height: 1.5;
`

const RoomMeta = styled.div`
  color: rgba(54, 61, 67, 1);
  font-family: 'Roboto Slab';
  font-size: 14px;
  font-weight: 400;
`

const RoomHeader = () => {
  return (
    <RoomContext.Consumer>
      {({ room }: Props) => {
        console.log(room)
        const { isPlaying, name, users, queue } = room

        const duration = queue.reduce((acc, track) => acc + track.duration, 0)

        return (
          <RoomHeaderWrap>
            <div>
              <PlaylistTitle>Room name</PlaylistTitle>
              <RoomName>{name}</RoomName>
              <RoomMeta>
                {queue.length} {pluralize('track', queue.length)} •{' '}
                {humanizeDuration(duration, { delimiter: ' - ', round: true })}{' '}
                • {users.length} {pluralize('contributor', users.length)}
              </RoomMeta>
            </div>

            <PlayButton isPlaying={isPlaying} roomName={name} />
          </RoomHeaderWrap>
        )
      }}
    </RoomContext.Consumer>
  )
}

export default RoomHeader
