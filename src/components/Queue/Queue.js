// @flow

import './Queue.css'
import * as WejayApi from '__generated__/types.flow'
import React from 'react'
import Track from '../Track/Track'

type QueueProps = {
  tracks: WejayApi.TrackInfoFragment[],
}

const Queue = ({ tracks }: QueueProps) => {
  if (!tracks || tracks.length === 0) {
    return <div className="EmptyState">Queue is empty</div>
  }

  return (
    <ul className="Queue">
      {tracks.map(track => <Track key={track.spotifyUri} track={track} />)}
    </ul>
  )
}

export default Queue
