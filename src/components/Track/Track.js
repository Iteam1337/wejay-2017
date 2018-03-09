// @flow

import * as WejayApi from '__generated__/types.flow'
import React from 'react'
import Cover from 'components/Cover'
import Gravatar from 'components/Gravatar'
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
  grid-column-gap: 20px;
  grid-template-columns: 40px 1fr 50px 30px;
  padding: 15px 20px;
`

export const TrackMeta = styled.div`
  line-height: 1.4;
`

export const TrackName = styled.div`
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

      <Gravatar id={track.user.id} size={30} />
    </TrackRow>
  )
}

export default TrackItem
