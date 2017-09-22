import './Backdrop.css'
import React from 'react'

const Backdrop = ({ track }) => {
  if (!track) {
    return null
  }

  return (
    <div
      className="Backdrop"
      style={{ backgroundImage: `url(${track.album.images[0].url})` }}
    />
  )
}

export default Backdrop
