// @flow

import './Queue.css'
import React from 'react'
import Track from 'components/Track'

type QueueProps = {
  tracks: Track[]
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
