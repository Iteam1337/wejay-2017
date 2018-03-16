// @flow

import * as storage from '../../../utils/storage'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Rooms from './Rooms'
import { withRouter } from 'react-router-dom'

const JoinRoomMutation = gql`
  mutation JoinRoom($input: JoinRoomInput!) {
    joinRoom(input: $input) {
      name
    }
  }
`

const withJoinRoom = graphql(JoinRoomMutation, {
  props: ({ ownProps, mutate }) => ({
    joinRoom: async roomName => {
      const userId = localStorage.getItem('id')
      const { email } = await storage.getValue(userId)

      await mutate({
        variables: {
          input: { email, roomName },
        },
      })

      ownProps.history.push(`/room/${roomName}`)
    },
  }),
})

export default withRouter(withJoinRoom(Rooms))
