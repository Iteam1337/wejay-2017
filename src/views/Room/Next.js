import React from 'react'
import { gql, graphql } from 'react-apollo'

type NextProps = {
  mutate: Function,
  roomName: string
}

export const Next = ({ mutate, roomName }: NextProps) => {
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
