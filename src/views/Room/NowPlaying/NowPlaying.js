// @flow

import * as WejayApi from '__generated__/types.flow'
import React from 'react'
import Cover from 'components/Cover/Cover'
import Gravatar from 'components/Gravatar/Gravatar'
import styled from 'styled-components'
import TrackMeta from 'components/Track/TrackMeta'
import NowPlayingPosition from './NowPlayingPosition'

type NowPlayingProps = {
  isPlaying: boolean,
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
  grid-template-columns: auto 1fr 0 auto;
  margin-left: auto;
  margin-right: auto;
  max-width: 960px;

  @media (min-width: 769px) {
    grid-template-columns: auto 1fr 400px auto;
  }
`

const NowPlaying = ({ isPlaying, track }: NowPlayingProps) => {
  if (!track) {
    return null
  }

  return (
    <NowPlayingWrap>
      <NowPlayingInner>
        <Cover small track={track} width={40} />

        <TrackMeta artists={track.artists} name={track.name} />
        <NowPlayingPosition isPlaying={isPlaying} track={track} />

        {track.user && <Gravatar id={track.user.id} size={30} />}
      </NowPlayingInner>
    </NowPlayingWrap>
  )
}

export default NowPlaying
