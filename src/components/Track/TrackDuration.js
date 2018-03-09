// @flow

import React from 'react'
import { timeParser } from 'utils/parsers'
import styled from 'styled-components'

type TrackDurationProps = {
  duration: number,
}

const TrackDurationWrap = styled.div`
  color: rgba(54, 61, 67, 0.6);
  font-size: 12px;
  font-weight: 500;
  text-align: center;
`

const TrackDuration = ({ duration }: TrackDurationProps) => {
  return <TrackDurationWrap>{timeParser(duration)}</TrackDurationWrap>
}

export default TrackDuration
