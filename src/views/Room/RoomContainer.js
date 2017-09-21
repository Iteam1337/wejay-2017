// @flow

import React, { Component } from 'react'
import type { Room } from 'models/models'
import RoomView from './Room'

type RoomContainerProps = {
  joinRoom: Function,
  room: Room
}

class RoomContainer extends Component {
  props: RoomContainerProps

  render () {
    return <RoomView {...this.props} />
  }
}

export default RoomContainer
