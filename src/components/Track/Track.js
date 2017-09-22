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
      <Cover album={track.album} width={50} />
      <Gravatar id={track.user.id} width={50} />
      <div className="Track__content">
        {track.artists.map(t => t.name).join(',')} - {track.name} ({timeParser(track.duration)})
      </div>
    </li>
  )
}

export default Track
