// @flow

import * as WejayApi from '__generated__/types.flow'
import React from 'react'
import Gravatar from 'components/Gravatar'
import styled from 'styled-components'

type NowPlayingProps = {
  track: ?WejayApi.TrackInfoFragment,
}

const NowPlayingWrap = styled.section`
  display: grid;
  height: 100vh;
  grid-template-columns: repeat(2, 1fr);
`

const NowPlaying = ({ track }: NowPlayingProps) => {
  if (!track) {
    return null
  }

  return (
    <NowPlayingWrap>
      <div className="Room__now-playing">
        <div className="Room__now-playing-track">
          <div className="Track__artist">
            {track.artists.map(t => t.name).join(', ')}
          </div>
          <div className="Track__name">{track.name}</div>
        </div>

        <Gravatar id={track.user.id} size={30} />
      </div>

      <div style={{ backgroundImage: `url(${track.album.images[0].url})` }} />
    </NowPlayingWrap>
  )
}

export default NowPlaying
