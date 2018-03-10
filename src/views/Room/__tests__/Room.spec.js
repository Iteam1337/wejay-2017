import React from 'react'
import { shallow } from 'enzyme'
import Room from '../Room'

describe('components/Room', () => {
  let component
  let room

  beforeEach(() => {
    room = {
      currentTrack: {
        album: {
          images: [],
          name: 'test',
        },
        artists: [{ name: 'artist' }, { name: 'artist two' }],
        duration: 123132,
        name: 'track',
        spotifyUri: '12314',
        started: null,
        user: {
          email: 'cookie@monster.com',
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
