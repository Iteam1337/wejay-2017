// @flow

import * as WejayApi from 'views/Room/__generated__/TrackInfo'
import React from 'react'
import Track from '../Track/Track'
import styled from 'styled-components'

type TrackListProps = {
  tracks: WejayApi.TrackInfo[],
}

const TrackListWrap = styled.section``

const TrackList = ({ tracks }: TrackListProps) => {
  if (!tracks || tracks.length === 0) {
    return <div className="EmptyState">Queue is empty</div>
  }

  return (
    <TrackListWrap>
      {tracks.map(track => <Track key={track.spotifyUri} track={track} />)}
    </TrackListWrap>
  )
}

export default TrackList
