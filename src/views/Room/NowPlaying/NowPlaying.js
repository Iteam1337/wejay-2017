// @flow

import * as WejayApi from '__generated__/types.flow'
import React from 'react'
import Cover from 'components/Cover'
import Gravatar from 'components/Gravatar'
import PositionTracker from 'components/Position'

type NowPlayingProps = {
  track: ?WejayApi.TrackInfoFragment,
}

const NowPlaying = ({ track }: NowPlayingProps) => {
  if (!track) {
    return null
  }

  return (
    <div>
      <Cover track={track} />

      <div className="Room__now-playing">
        <div className="Room__now-playing-track">
          <div className="Track__artist">
            {track.artists.map(t => t.name).join(', ')}
          </div>
          <div className="Track__name">{track.name}</div>
        </div>

        <Gravatar id={track.user.id} size={30} />
      </div>

      <PositionTracker track={track} />
    </div>
  )
}

export default NowPlaying
