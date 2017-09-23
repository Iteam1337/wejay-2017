import React, { Component } from 'react'

class Position extends Component {
  state = {
    position: 1500
  }

  timer = null

  componentDidMount () {
    this.startTimer(this.props)
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props.track, nextProps.track)
    if (this.props.track.spotifyUri !== nextProps.track.spotifyUri) {
      clearInterval(this.timer)

      this.startTimer(nextProps)
    }
  }

  startTimer = props => {
    const { track } = props

    this.timer = setInterval(() => {
      this.setState(() => ({
        position: 1500 - (Date.now() - track.started) / track.duration * 1500
      }))
    }, 1000)
  }

  render () {
    const { track } = this.props
    const style = {
      height: 310 / track.album.images[0].width * track.album.images[0].height,
      width: 310 / track.album.images[0].width * track.album.images[0].width
    }

    return (
      <div className="Position" style={style}>
        <svg
          height="310"
          width="310"
          xmlns="http://www.w3.org/2000/svg"
          style={style}
        >
          <rect
            className="shape"
            height="310"
            width="310"
            style={{
              ...style,
              strokeDashoffset: this.state.position
            }}
          />
        </svg>
      </div>
    )
  }
}

export default Position
