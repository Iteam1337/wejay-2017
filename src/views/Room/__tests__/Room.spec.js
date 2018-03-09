// @flow

import React from 'react'
import { shallow } from 'enzyme'
import Room from '../Room'

describe('components/Room', () => {
  let component
  let room

  beforeEach(() => {
    room = {
      currentTrack: {
        artists: [{ name: 'artist' }, { name: 'artist two' }],
        name: 'track',
        user: {
          id: '1337',
        },
      },
      name: 'test',
      queue: [],
      users: [],
    }

    component = shallow(<Room room={room} />)
  })

  it('renders Room', () => {
    expect(component).toMatchSnapshot()
  })
})
