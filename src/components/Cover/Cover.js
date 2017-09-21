import React from 'react'
import './Cover.css'

type CoverProps = {
  album: {
    images: {
      url: string
    }[]
  }[],
  width?: number
}

export const Cover = ({ album, width }: CoverProps) => {
  if (!album.images || album.images.length === 0) {
    return (
      <div className="Cover__temp" style={{ height: width, width: width }} />
    )
  }

  return (
    <img
      alt="Album cover"
      className="Cover"
      src={album.images[0].url}
      style={{ width: width }}
    />
  )
}

export default Cover
