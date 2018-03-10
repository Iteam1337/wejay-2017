// @flow

import React, { Component } from 'react'
import styled from 'styled-components'

type DropareaProps = {
  addToQueue: (spotifyId: string) => Promise<void>,
}

type DropareaState = {
  isDragOver: boolean,
}

const Dropzone = styled.textarea`
  background: ${({ isDragging }) =>
    isDragging ? 'rgba(255, 134, 0, 0.2)' : 'none'};
  border: 0;
  bottom: 0;
  color: transparent;
  cursor: default;
  height: 100%;
  left: 0;
  position: fixed;
  resize: none;
  width: 100%;

  &:focus {
    outline: none;
  }
`

export class Droparea extends Component<DropareaProps, DropareaState> {
  state = {
    isDragOver: false,
  }

  onDragEnter = (e: SyntheticDragEvent<HTMLTextAreaElement>) => {
    if (e) {
      e.preventDefault()
    }

    this.setState({
      isDragOver: true,
    })
  }

  onDragLeave = (e: SyntheticDragEvent<HTMLTextAreaElement>) => {
    if (e) {
      e.preventDefault()
    }

    this.setState({
      isDragOver: false,
    })
  }

  onDrop = (e: SyntheticDragEvent<HTMLTextAreaElement>) => {
    e.stopPropagation()
    e.preventDefault()

    const songs = e.dataTransfer
      .getData('text')
      .replace(/https:\/\/open.spotify.com\/track\//gi, '')
      .split('\n')

    songs.reverse().forEach(track => {
      this.props.addToQueue(track)
    })

    this.setState({
      isDragOver: false,
    })
  }

  render () {
    return (
      <Dropzone
        defaultValue=""
        isDragging={this.state.isDragOver}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        spellCheck={false}
      />
    )
  }
}

export default Droparea
