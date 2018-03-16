// @flow

import * as WejayApi from 'views/Room/__generated__/TrackInfo'
import React from 'react'
import styled from 'styled-components'

type TrackArtistProps = {
  artists: $PropertyType<WejayApi.TrackInfo, "artists">,
}

const TrackArtistItem = styled.div`
  color: rgba(54, 61, 67, 0.6);
  font-size: 12px;
`

const TrackArtist = ({ artists }: TrackArtistProps) => {
  return (
    <TrackArtistItem>{artists.map(t => t.name).join(', ')}</TrackArtistItem>
  )
}

export default TrackArtist
