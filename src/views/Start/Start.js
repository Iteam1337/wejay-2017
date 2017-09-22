// @flow

import React, { Component } from 'react'

import Rooms from 'components/Rooms'
import AddRoom from './AddRoom'
import { gql, graphql } from 'react-apollo'

type StartProps = {
  data: {}
}

type StartState = {
  user: string,
  hasUser: boolean
}

export class Start extends Component<StartProps, StartState> {
  state = {
    user: '',
    hasUser: false
  }

  componentDidMount () {
    if (localStorage.getItem('user')) {
      this.setState(() => ({
        hasUser: true
      }))
    }
  }

  saveEmail = () => {
    const { user } = this.state
    localStorage.setItem('user', user)

    this.setState(() => ({
      hasUser: true
    }))
  }

  updateEmail = event => {
    this.setState({
      user: event.target.value
    })
  }

  render () {
    const { data: { error, loading, rooms } } = this.props
    const { hasUser } = this.state

    if (loading) {
      return <div>Loading</div>
    }

    if (error) {
      return <div>{error.message}</div>
    }

    if (!hasUser) {
      return (
        <div>
          <input onChange={this.updateEmail} placeholder="E-mail" />
          <button onClick={this.saveEmail}>Save user</button>
        </div>
      )
    }

    return (
      <div className="Start">
        <h1>Wejay</h1>
        <Rooms joinRoom={this.joinRoom} rooms={rooms} />
        <AddRoom />
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
