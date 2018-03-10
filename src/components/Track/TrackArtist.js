// @flow

import * as WejayApi from '__generated__/types.flow'
import React from 'react'
import styled from 'styled-components'

type TrackArtistProps = {
  artists: $PropertyType<WejayApi.TrackInfoFragment, 'artists'>,
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
