// @flow

import * as WejayApi from '__generated__/types.flow'
import React from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'

type CoverProps = {
  track: WejayApi.TrackInfoFragment,
  width?: number,
}

const CoverImage = styled.img`
  border-radius: 2px;
  height: ${({ size }) => `${size}px`};
  max-width: 100%;
  vertical-align: top;
  width: ${({ size }) => `${size}px`};
`

const TemporaryCover = CoverImage.extend`
  background-color: #eaecef;
`

export const Cover = ({ track, width = 100 }: CoverProps) => {
  if (!track.album.images || track.album.images.length === 0) {
    return <TemporaryCover size={width} />
  }

  const covers = track.album.images
  const coverUrl = covers ? covers[0].url : ''

  return (
    <LazyLoad height={width}>
      <CoverImage alt="Album cover" size={width} src={coverUrl} />
    </LazyLoad>
  )
}

export default Cover
