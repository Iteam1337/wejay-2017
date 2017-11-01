// @flow

import './Track.css'
import React from 'react'
import Cover from 'components/Cover'
import Gravatar from 'components/Gravatar'
import { timeParser } from 'utils/parsers'
import classnames from 'classnames'
import type { Track } from 'models/models'

type Props = {
  track: Track
}

const TrackItem = ({ track }: Props) => {
  if (!track) {
    return null
  }

  if (!track.duration) {
    return (
      <div className="Track Track__pending">
        <div className="Track__cover">
          <Cover small track={track} width={80} />
          <Gravatar className="Track__gravatar" id={track.user.id} size={30} />
        </div>
        <div className="Track__content">
          <div className="Track__artist" />
          <div className="Track__name" />
        </div>
        <div className="Track__duration" />
      </div>
    )
  }

  return (
    <li
      className={classnames('Track', {
        Track__pending: !track.duration,
      })}
    >
      <div className="Track__cover">
        <Cover small track={track} width={80} />
        <Gravatar className="Track__gravatar" id={track.user.id} size={30} />
      </div>
      <div className="Track__content">
        <div className="Track__artist">
          {track.artists.map(t => t.name).join(', ')}
        </div>
        <div className="Track__name">{track.name}</div>
      </div>
      <div className="Track__duration">{timeParser(track.duration)}</div>
    </li>
  )
}

export default TrackItem
