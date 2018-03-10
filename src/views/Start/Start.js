// @flow

import './Start.css'
import * as Wejay from 'typings/wejay.flow'
import * as WejayApi from '__generated__/types.flow'
import React, { Component } from 'react'
import Rooms from './Rooms/Rooms'
import AddRoom from './AddRoom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

type Props = {
  data: Wejay.ApolloBase<WejayApi.StartQueryQuery>,
}

type State = {
  user: string,
  hasUser: boolean,
}

export class Start extends Component<Props, State> {
  state = {
    user: '',
    hasUser: false,
  }

  componentDidMount () {
    if (localStorage.getItem('user')) {
      this.setState(() => ({
        hasUser: true,
      }))
    }
  }

  saveEmail = () => {
    const { user } = this.state
    localStorage.setItem('user', user)

    this.setState(() => ({
      hasUser: true,
    }))
  }

  updateEmail = (event: { target: { value: string } }) => {
    this.setState({
      user: event.target.value,
    })
  }

  render () {
    const { data: { error, loading, rooms } } = this.props
    const { hasUser, user } = this.state

    if (loading) {
      return <div className="Loader">Loading</div>
    }

    if (error) {
      return <div className="Error">{error.message}</div>
    }

    return (
      <div className="Start">
        <div className="Start__content">
          <div className="Start__rooms">
            {!hasUser && (
              <div>
                <input
                  className="Input"
                  onChange={this.updateEmail}
                  placeholder="E-mail"
                />
                <button
                  className="Rooms__button"
                  disabled={user.length === 0}
                  onClick={this.saveEmail}
                >
                  Save user
                </button>
              </div>
            )}
            {hasUser && (
              <div>
                <Rooms rooms={rooms} />
                <hr className="Start__separator" />
                <AddRoom />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export const startQuery = gql`
  query StartQuery {
    rooms {
      name
    }
  }
`

export default graphql(startQuery)(Start)
