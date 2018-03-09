// @flow

import './Cover.css'
import * as WejayApi from '__generated__/types.flow'
import React from 'react'

type Props = {
  small: boolean,
  track: WejayApi.TrackInfoFragment,
  width?: number,
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
    </div>
  )
}

export default Cover
