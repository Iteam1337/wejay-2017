// @flow

import React from 'react'
import { timeParser } from 'utils/parsers'
import styled from 'styled-components'

type TrackDurationProps = {
  duration: number,
}

const TrackDurationWrap = styled.div`
  color: rgba(54, 61, 67, 1);
  font-size: 14px;
  text-align: center;
`

const TrackDuration = ({ duration }: TrackDurationProps) => {
  return <TrackDurationWrap>{timeParser(duration)}</TrackDurationWrap>
}

export default TrackDuration
