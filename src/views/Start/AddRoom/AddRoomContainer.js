// @flow

import React from 'react'
import * as WejayApi from './__generated__/AddRoom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { StartQuery } from '../Start'
import AddRoom from './AddRoom'

type Props = {
  addRoom: (formValues: WejayApi.AddRoomVariables) => void,
}

const AddRoomContainer = ({ addRoom }: Props) => {
  return <AddRoom addRoom={addRoom} />
}

const AddRoomMutation = gql`
  mutation AddRoom($roomName: String!) {
    addRoom(roomName: $roomName) {
      name
    }
  }
`

const withAddRoom = graphql(AddRoomMutation, {
  props: ({ mutate }) => ({
    addRoom: async ({ roomName }: WejayApi.AddRoomVariables, actions) => {
      await mutate({
        variables: {
          roomName,
        },
        optimisticResponse: {
          addRoom: {
            name: roomName,
            __typename: 'Room',
          },
        },
        update: (store, { data: { addRoom } }) => {
          const data = store.readQuery({ query: StartQuery })

          data.rooms.push(addRoom)

          store.writeQuery({ query: StartQuery, data })
        },
      })

      actions.resetForm()
    },
  }),
})

export default withAddRoom(AddRoomContainer)
