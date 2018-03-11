// @flow

import * as React from 'react'
import * as WejayApi from '__generated__/types.flow'
import styled from 'styled-components'
import TrackDuration from 'components/Track/TrackDuration'

type NowPlayingPositionProps = {
  isPlaying: boolean,
  track: WejayApi.TrackInfoFragment,
}

type NowPlayingPositionState = {
  barWidth: number,
  playedDuration: number,
}

const PositionWrap = styled.div`
  align-items: center;
  display: none;
  grid-column-gap: 10px;
  grid-template-columns: auto 1fr auto;

  @media (min-width: 769px) {
    display: grid;
  }
`

const PositionBarWrap = styled.div`
  height: 5px;
`

const PositionBar = styled.div`
  background: rgba(255, 134, 0, 0.4);
  border-radius: 0 2px 0 0;
  height: 5px;
  transition: width 100ms ease-in-out;
`

class NowPlayingPosition extends React.Component<
  NowPlayingPositionProps,
  NowPlayingPositionState
> {
  timer: IntervalID

  state = {
    barWidth: 0,
    playedDuration: 0,
  }

  componentDidMount () {
    if (this.props.isPlaying) {
      this.startTrackingDuration()
    }
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  componentWillReceiveProps (nextProps: NowPlayingPositionProps) {
    const { track } = this.props

    if (track.spotifyUri !== nextProps.track.spotifyUri) {
      this.startTrackingDuration()
    }

    if (nextProps.isPlaying === false) {
      clearInterval(this.timer)
    }

    if (nextProps.isPlaying === true) {
      this.startTrackingDuration()
    }
  }

  startTrackingDuration = () => {
    this.timer = setInterval(this.updateTimer, 1000)
  }

  updateTimer = () => {
    const { track } = this.props
    const started = track.started || 0

    this.setState(state => ({
      barWidth: state.playedDuration / track.duration * 100,
      playedDuration:
        state.playedDuration > 0
          ? state.playedDuration + 1000
          : Date.now() - started,
    }))
  }

  render () {
    const { track } = this.props
    const { barWidth, playedDuration } = this.state

    return (
      <PositionWrap>
        <TrackDuration duration={playedDuration} />
        <PositionBarWrap>
          <PositionBar
            style={{ width: `${barWidth < 100 ? barWidth : 100}%` }}
          />
        </PositionBarWrap>
        <TrackDuration duration={track.duration} />
      </PositionWrap>
    )
  }
}

export default NowPlayingPosition
