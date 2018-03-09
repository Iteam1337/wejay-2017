// @flow

import * as WejayApi from '__generated__/types.flow'
import React from 'react'
import Cover from 'components/Cover'
import Gravatar from 'components/Gravatar'
import styled from 'styled-components'
import { TrackMeta, TrackName } from 'components/Track/Track'
import TrackArtist from 'components/Track/TrackArtist'
import Position from './Position'

type NowPlayingProps = {
  track: ?WejayApi.TrackInfoFragment,
}

const NowPlayingWrap = styled.section`
  background-color: #fff;
  border-top: 1px solid #eaecef;
  bottom: 0;
  left: 0;
  padding: 20px;
  position: sticky;
  right: 0;
  z-index: 1;
`

const NowPlayingInner = styled.section`
  align-items: center;
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: 1fr;
  margin-left: auto;
  margin-right: auto;
  max-width: 960px;

  @media (min-width: 1025px) {
    grid-template-columns: 40px 1fr 400px 30px;
  }
`

const NowPlaying = ({ track }: NowPlayingProps) => {
  if (!track) {
    return null
  }

  return (
    <NowPlayingWrap>
      <NowPlayingInner>
        <Cover small track={track} width={40} />

        <TrackMeta>
          <TrackArtist artists={track.artists} />
          <TrackName>{track.name}</TrackName>
        </TrackMeta>

        <Position track={track} />

        <Gravatar id={track.user.id} size={30} />
      </NowPlayingInner>
    </NowPlayingWrap>
  )
}

export default NowPlaying
