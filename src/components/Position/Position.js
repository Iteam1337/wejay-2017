// @flow

import React, { Component } from 'react'
import type { Track } from 'models/models'

type Props = {
  track: Track
}

type State = {
  position: number
}

class PositionTracker extends Component<Props, State> {
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

    this.timer = setInterval(() => {
      this.setState(() => ({
        position: (Date.now() - track.started) / track.duration * 100,
      }))
    }, 1000)
  }

  render () {
    const { position } = this.state

    return (
      <div className="Position">
        <div className="Position__bar" style={{ width: `${position}%` }} />
      </div>
    )
  }
}

export default PositionTracker
