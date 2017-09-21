// @flow

import './Queue.css'
import React from 'react'
import type { Track } from 'models/models'
import { timeParser } from 'utils/parsers'
import Cover from 'components/Cover'
import classnames from 'classnames'

type QueueProps = {
  tracks: Track[]
}

const Queue = ({ tracks }: QueueProps) => {
  if (!tracks) {
    return null
  }

  return (
    <ul className="Queue">
      {tracks.map(track => (
        <li
          className={classnames('Track', {
            Track__pending: !track.duration
          })}
          key={track.spotifyUri}
        >
          <Cover album={track.album} width={50} />
          <div className="Track__content">
            {track.artists.map(t => t.name).join(',')} - {track.name} ({timeParser(track.duration)})
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Queue
