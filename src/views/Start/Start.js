// @flow

import * as React from 'react'
import * as Wejay from 'typings/wejay.flow'
import * as WejayApi from './__generated__/StartQuery'
import Rooms from './Rooms/RoomsContainer'
import AddRoom from './AddRoom/AddRoomContainer'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import AddUserForm from './AddUserForm'
import type { FormValues } from './AddUserForm'
import * as storage from '../../utils/storage'
import md5 from 'md5'
import styled from 'styled-components'

type Props = {
  data: Wejay.ApolloBase<WejayApi.StartQuery>,
}

type State = {
  hasUser: boolean,
}

const Wrap = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
`

const Content = styled.div`
  max-width: 300px;
`

const Separator = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  height: 1px;
  border: 0;
  margin-bottom: 20px;
  margin-top: 20px;
`

export class Start extends React.Component<Props, State> {
  state = {
    hasUser: false,
  };

  async componentDidMount () {
    const id = localStorage.getItem('id')

    if (id && !!await storage.getValue(id)) {
      this.hasUser()
    }
  }

  saveUser = async ({ email }: FormValues) => {
    const id = md5(email)

    await storage.put({ id, email })
    localStorage.setItem('id', id)

    this.hasUser()
  };

  hasUser = () => {
    this.setState({
      hasUser: true,
    })
  };

  render () {
    const { data: { error, loading, rooms } } = this.props
    const { hasUser } = this.state

    if (loading) {
      return <div className="Loader">Loading</div>
    }

    if (error) {
      return <div className="Error">{error.message}</div>
    }

    return (
      <Wrap>
        <Content>
          {!hasUser && <AddUserForm saveUser={this.saveUser} />}

          {hasUser && (
            <React.Fragment>
              <Rooms rooms={rooms} />
              <Separator />
              <AddRoom />
            </React.Fragment>
          )}
        </Content>
      </Wrap>
    )
  }
}

export const StartQuery = gql`
  query StartQuery {
    rooms {
      name
    }
  }
`

export default graphql(StartQuery)(Start)
