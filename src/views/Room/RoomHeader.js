// @flow

import React from 'react'
import styled from 'styled-components'
import humanizeDuration from 'humanize-duration'
import type { RoomType } from './Room'
import pluralize from 'pluralize'

type RoomHeaderProps = {
  name: string,
  queue: $PropertyType<RoomType, 'queue'>,
  users: number,
}

const RoomHeaderWrap = styled.div``
const PlaylistTitle = styled.div`
  font-size: 12px;
  text-transform: uppercase;
`

const RoomName = styled.div`
  color: rgb(237, 167, 76);
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

const RoomHeader = ({ name, queue, users }: RoomHeaderProps) => {
  const duration = queue.reduce((acc, track) => acc + track.duration, 0)

  return (
    <RoomHeaderWrap>
      <PlaylistTitle>Playlist title</PlaylistTitle>
      <RoomName>{name}</RoomName>
      <RoomMeta>
        {queue.length} {pluralize('track', queue.length)} •{' '}
        {humanizeDuration(duration, { delimiter: ' - ', round: true })} •{' '}
        {users} {pluralize('contributor', users)}
      </RoomMeta>
    </RoomHeaderWrap>
  )
}

export default RoomHeader
