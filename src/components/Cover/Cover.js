import './Cover.css'
import React from 'react'
import classnames from 'classnames'
import Position from './Position'

type CoverProps = {
  album: {
    images: {
      url: string
    }[]
  }[],
  small: boolean,
  width?: number
}

export const Cover = ({ track, small, width }: CoverProps) => {
  if (!track.album.images || track.album.images.length === 0) {
    return (
      <div className="Cover__temp" style={{ height: width, width: width }} />
    )
  }

  return (
    <div className="Cover">
      {!small && <Position track={track} />}
      <img
        alt="Album cover"
        className="Cover__image"
        src={track.album.images[0].url}
        style={{ width: width }}
      />
      <img
        alt="Album cover"
        className={classnames('Cover__shadow', {
          'Cover__shadow--small': small
        })}
        src={track.album.images[0].url}
        style={{ width: width }}
      />
    </div>
  )
}

export default Cover
