import React, { Component } from 'react'

class PositionTracker extends Component {
  state = {
    position: 0
  }

  timer = null

  componentDidMount () {
    this.startTimer(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.track.spotifyUri !== nextProps.track.spotifyUri) {
      clearInterval(this.timer)

      this.startTimer(nextProps)
    }
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  startTimer = props => {
    const { track } = props

    this.timer = setInterval(() => {
      this.setState(() => ({
        position: (Date.now() - track.started) / track.duration * 100
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