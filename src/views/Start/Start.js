// @flow

import React, { Component } from 'react'

import Rooms from 'components/Rooms'
import { gql, graphql } from 'react-apollo'

type StartProps = {
  data: {}
}

class Start extends Component {
  props: StartProps

  saveEmail = event => {
    localStorage.setItem('user', event.target.value)
  }

  render () {
    const { data: { error, loading, rooms } } = this.props

    if (loading) {
      return <div>Loading</div>
    }

    if (error) {
      return <div>{error.message}</div>
    }

    return (
      <div className="Start">
        <h1>1</h1>
        <input onChange={this.saveEmail} placeholder="E-mail" />

        <h2>2</h2>
        <Rooms joinRoom={this.joinRoom} rooms={rooms} />
      </div>
    )
  }
}

const startQuery = gql`
  query StartQuery {
    rooms {
      name
    }
  }
`

export default graphql(startQuery)(Start)
