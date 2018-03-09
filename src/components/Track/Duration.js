// @flow

import React from 'react'
import { timeParser } from 'utils/parsers'
import styled from 'styled-components'

type DurationProps = {
  duration: number,
}

const DurationWrap = styled.div`
  color: rgba(54, 61, 67, 1);
  font-size: 14px;
  text-align: right;
`

const Duration = ({ duration }: DurationProps) => {
  return <DurationWrap>{timeParser(duration)}</DurationWrap>
}

export default Duration
