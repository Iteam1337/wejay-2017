// @flow

import React from 'react'
import Track from '../Track/Track'
import styled from 'styled-components'
import { RoomContext } from '../../views/Room/RoomContainer'

const TrackListWrap = styled.section``

const TrackList = () => {
  return (
    <RoomContext.Consumer>
      {({ room }) => {
        const { queue } = room

        if (!queue || queue.length === 0) {
          return <div className="EmptyState">Queue is empty</div>
        }

        return (
          <TrackListWrap>
            {queue.map(track => <Track key={track.spotifyUri} track={track} />)}
          </TrackListWrap>
        )
      }}
    </RoomContext.Consumer>
  )
}

export default TrackList
