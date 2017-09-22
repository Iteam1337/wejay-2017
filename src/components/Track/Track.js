import './Track.css'
import React from 'react'
import Cover from 'components/Cover'
import Gravatar from 'components/Gravatar'
import { timeParser } from 'utils/parsers'
import classnames from 'classnames'

const Track = ({ track }) => {
  if (!track) {
    return null
  }

  return (
    <li
      className={classnames('Track', {
        Track__pending: !track.duration
      })}
    >
      <div className="Track__cover">
        <Cover album={track.album} small width={100} />
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

export default Track
