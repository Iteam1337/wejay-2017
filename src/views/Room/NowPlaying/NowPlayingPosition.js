// @flow

import * as React from 'react'
import * as WejayApi from '__generated__/types.flow'
import styled from 'styled-components'

const PositionBarWrap = styled.div`
  height: 5px;
`

const PositionBar = styled.div`
  background: rgba(255, 134, 0, 0.4);
  border-radius: 0 2px 0 0;
  height: 5px;
  transition: width 100ms ease-in-out;
`

type Props = {
  track: WejayApi.TrackInfoFragment,
}

type State = {
  position: number,
}

class NowPlayingPosition extends React.Component<Props, State> {
  state = {
    position: 0,
  }

  timer = undefined

  componentDidMount () {
    this.startTimer(this.props)
  }

  componentWillReceiveProps (nextProps: Props) {
    if (this.props.track.spotifyUri !== nextProps.track.spotifyUri) {
      clearInterval(this.timer)

      this.startTimer(nextProps)
    }
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  startTimer = (props: Props) => {
    const { track } = props
    const started = track.started || 0

    this.timer = setInterval(() => {
      this.setState(() => ({
        position: (Date.now() - started) / track.duration * 100,
      }))
    }, 1000)
  }

  render () {
    const { position } = this.state

    return (
      <PositionBarWrap>
        <PositionBar style={{ width: `${position}%` }} />
      </PositionBarWrap>
    )
  }
}

export default NowPlayingPosition
