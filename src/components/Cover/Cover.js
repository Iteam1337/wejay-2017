// @flow

import './Cover.css'
import React from 'react'
import classnames from 'classnames'
import type { Track } from 'models/models'

type Props = {
  small: boolean,
  track: Track,
  width?: number
}

export const Cover = ({ track, small, width }: Props) => {
  if (!track.album.images || track.album.images.length === 0) {
    return (
      <div className="Cover__temp" style={{ height: width, width: width }} />
    )
  }

  return (
    <div className="Cover">
      <img
        alt="Album cover"
        className="Cover__image"
        src={track.album.images[0].url}
        style={{ width: width }}
      />
      <img
        alt="Album cover"
        className={classnames('Cover__shadow', {
          'Cover__shadow--small': small,
        })}
        src={track.album.images[0].url}
        style={{ width: width }}
      />
    </div>
  )
}

export default Cover
