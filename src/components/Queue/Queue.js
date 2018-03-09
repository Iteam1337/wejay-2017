// @flow

import * as WejayApi from '__generated__/types.flow'
import React from 'react'
import Track from '../Track/Track'
import styled from 'styled-components'

type QueueProps = {
  tracks: WejayApi.TrackInfoFragment[],
}

const QueueList = styled.section``

const Queue = ({ tracks }: QueueProps) => {
  if (!tracks || tracks.length === 0) {
    return <div className="EmptyState">Queue is empty</div>
  }

  return (
    <QueueList>
      {tracks.map(track => <Track key={track.spotifyUri} track={track} />)}
    </QueueList>
  )
}

export default Queue
