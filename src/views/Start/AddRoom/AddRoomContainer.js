// @flow

import * as WejayApi from './__generated__/AddRoom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { StartQuery } from '../Start'
import AddRoom from './AddRoom'

const AddRoomMutation = gql`
  mutation AddRoom($roomName: String!) {
    addRoom(roomName: $roomName) {
      name
    }
  }
`

const withAddRoom = graphql(AddRoomMutation, {
  props: ({ mutate, ownProps }) => ({
    addRoom: async ({ roomName }: WejayApi.AddRoomVariables, actions) => {
      if (ownProps.rooms.find(room => room.name === roomName)) {
        actions.setFieldError('roomName', 'Room already exists')
        return
      }

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

export default withAddRoom(AddRoom)
