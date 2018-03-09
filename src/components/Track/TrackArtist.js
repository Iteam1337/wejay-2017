// @flow

import React from 'react'
import styled from 'styled-components'

type TrackArtistProps = {}

const TrackArtistItem = styled.div`
  color: rgba(54, 61, 67, 1);
  font-size: 14px;
  font-weight: 500;
`

const TrackArtist = ({ artists }: TrackArtistProps) => {
  return (
    <TrackArtistItem>{artists.map(t => t.name).join(', ')}</TrackArtistItem>
  )
}

export default TrackArtist
