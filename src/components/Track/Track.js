// @flow

import * as WejayApi from '__generated__/types.flow'
import React from 'react'
import Cover from 'components/Cover/Cover'
import Gravatar from 'components/Gravatar/Gravatar'
import TrackDuration from './TrackDuration'
import styled from 'styled-components'
import TrackMeta from './TrackMeta'

type TrackProps = {
  track: WejayApi.TrackInfoFragment,
}

const TrackRow = styled.div`
  align-items: center;
  border-bottom: 1px solid #eaecef;
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: auto 1fr auto auto;
  padding: 15px 0;
`

const TrackItem = ({ track }: TrackProps) => {
  if (!track) {
    return null
  }

  return (
    <TrackRow>
      <Cover small track={track} width={40} />

      <TrackMeta artists={track.artists} name={track.name} />
      <TrackDuration duration={track.duration} />

      {track.user && <Gravatar id={track.user.id} size={30} />}
    </TrackRow>
  )
}

export default TrackItem
