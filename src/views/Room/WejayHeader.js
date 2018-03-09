// @flow

import * as React from 'react'
import styled from 'styled-components'
import wejayLogo from './img/logo.png'

const HeaderWrap = styled.section`
  border-bottom: 1px solid #eaecef;
  padding: 20px;
`

const HeaderInner = styled.section`
  display: grid;
  grid-template-columns: 40px 1fr;
  margin-left: auto;
  margin-right: auto;
  max-width: 960px;
`

const Logo = styled.img`
  max-width: 100%;
`

const WejayHeader = () => {
  return (
    <HeaderWrap>
      <HeaderInner>
        <Logo src={wejayLogo} />
      </HeaderInner>
    </HeaderWrap>
  )
}

export default WejayHeader
