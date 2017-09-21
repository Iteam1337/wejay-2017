// @flow

import './Queue.css'
import React from 'react'
import type { Track } from 'models/models'
import { timeParser } from 'utils/parsers'
import Cover from 'components/Cover'

type QueueProps = {
  tracks: Track[]
}

const Queue = ({ tracks }: QueueProps) => {
  if (!tracks) {
    return null
  }

  return (
    <ul>
      {tracks.map(track => (
        <li key={track.spotifyUri}>
          <Cover album={track.album} width={50} />
          {track.artists.map(t => t.name).join(',')} - {track.name} ({timeParser(track.duration)})
        </li>
      ))}
    </ul>
  )
}

export default Queue
