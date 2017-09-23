import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Room } from '../Room'

describe('components/Room', () => {
  let component
  let data

  beforeEach(() => {
    data = {
      error: null,
      loading: false,
      room: {
        currentTrack: {
          artists: [{ name: 'artist' }, { name: 'artist two' }],
          name: 'track',
          user: {
            id: '1337'
          }
        },
        name: 'test',
        queue: [],
        users: []
      },
      subscribeToMore: jest.fn()
    }

    component = shallow(
      <Room
        data={data}
        match={{
          params: {
            name: 'test'
          }
        }}
      />
    )
  })

  it('renders a loading message', () => {
    component.setProps({
      data: {
        ...data,
        loading: true
      }
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('renders error message', () => {
    component.setProps({
      data: {
        ...data,
        error: {
          message: 'Error'
        }
      }
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('renders Room', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
