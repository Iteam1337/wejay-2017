// @flow

import * as WejayApi from 'views/Room/__generated__/TrackInfo'
import React from 'react'
import styled from 'styled-components'
import TrackArtist from './TrackArtist'

type TrackMetaProps = {
  artists: $PropertyType<WejayApi.TrackInfo, "artists">,
  name: string,
}

export const TrackMetaWrap = styled.div`
  line-height: 1.4;
`

export const TrackName = styled.div`
  color: rgba(54, 61, 67, 1);
  font-size: 14px;
  font-weight: 500;
`

const TrackMeta = ({ artists, name }: TrackMetaProps) => {
  return (
    <TrackMetaWrap>
      <TrackName>{name}</TrackName>
      <TrackArtist artists={artists} />
    </TrackMetaWrap>
  )
}

export default TrackMeta
