// @flow

import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

type Props = {
  mutate: Function,
  roomName: string,
}

export const Next = ({ mutate, roomName }: Props) => {
  const handleNext = () => {
    mutate({
      variables: {
        roomName,
      },
    })
  }

  return <button onClick={handleNext}>Next</button>
}

const nextMutation = gql`
  mutation nextTrack($roomName: String!) {
    nextTrack(roomName: $roomName) {
      name
    }
  }
`

export default graphql(nextMutation)(Next)
