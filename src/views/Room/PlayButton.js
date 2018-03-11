// @flow

import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Icon from 'react-icons-kit'
import { play } from 'react-icons-kit/ikons/play'
import { pause } from 'react-icons-kit/ikons/pause'
import styled from 'styled-components'

type PlayButtonProps = {
  isPlaying: boolean,
  pause: Function,
  play: Function,
  roomName: string,
}

const PlayButtonWrap = styled.button`
  -moz-appearance: none;
  -webkit-appearance: none;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 0;
  border-radius: 100%;
  color: #fff;
  display: flex;
  height: 80px;
  justify-content: center;
  width: 80px;

  &:focus {
    outline: none;
  }
`

class PlayButton extends Component<PlayButtonProps> {
  handleClick = () => {
    const { isPlaying, pause, play, roomName } = this.props
    const variables = {
      roomName,
    }

    if (isPlaying) {
      pause({ variables })
    } else {
      play({ variables })
    }
  }

  render () {
    return (
      <PlayButtonWrap onClick={this.handleClick}>
        <Icon icon={this.props.isPlaying ? pause : play} size={60} />
      </PlayButtonWrap>
    )
  }
}

const pauseSubscription = gql`
  mutation pause($roomName: String!) {
    pause(roomName: $roomName)
  }
`

const playSubscription = gql`
  mutation play($roomName: String!) {
    play(roomName: $roomName)
  }
`

export default compose(
  graphql(pauseSubscription, { name: 'pause' }),
  graphql(playSubscription, { name: 'play' })
)(PlayButton)
