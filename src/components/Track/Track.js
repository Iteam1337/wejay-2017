// @flow

import * as WejayApi from '__generated__/types.flow'
import React from 'react'
import Cover from 'components/Cover'
import Duration from './Duration'
import TrackArtist from './TrackArtist'
import styled from 'styled-components'

type TrackProps = {
  track: WejayApi.TrackInfoFragment,
}

const TrackRow = styled.div`
  align-items: center;
  border-bottom: 1px solid #eaecef;
  display: grid;
  grid-template-columns: 60px 1fr 60px;
  padding: 15px 20px;
`

const TrackMeta = styled.div`
  line-height: 1.4;
`

const TrackName = styled.div`
  color: rgba(54, 61, 67, 0.6);
  font-size: 12px;
`

const TrackItem = ({ track }: TrackProps) => {
  if (!track) {
    return null
  }

  return (
    <TrackRow>
      <Cover small track={track} width={40} />

      <TrackMeta>
        <TrackArtist artists={track.artists} />
        <TrackName>{track.name}</TrackName>
      </TrackMeta>

      <Duration duration={track.duration} />
    </TrackRow>
  )
}

export default TrackItem
