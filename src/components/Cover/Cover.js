import './Cover.css'
import React from 'react'
import classnames from 'classnames'

type CoverProps = {
  album: {
    images: {
      url: string
    }[]
  }[],
  small: boolean,
  width?: number
}

export const Cover = ({ album, small, width }: CoverProps) => {
  if (!album.images || album.images.length === 0) {
    return (
      <div className="Cover__temp" style={{ height: width, width: width }} />
    )
  }

  return (
    <div className="Cover">
      <img
        alt="Album cover"
        className="Cover__image"
        src={album.images[0].url}
        style={{ width: width }}
      />
      <img
        alt="Album cover"
        className={classnames('Cover__shadow', {
          'Cover__shadow--small': small
        })}
        src={album.images[0].url}
        style={{ width: width }}
      />
    </div>
  )
}

export default Cover
