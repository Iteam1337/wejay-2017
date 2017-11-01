import React from 'react'
import { shallow } from 'enzyme'
import NowPlaying from '../NowPlaying'

describe('components/NowPlaying', () => {
  let component

  beforeEach(() => {
    component = shallow(
      <NowPlaying
        track={{
          artists: [{ name: 'artist one' }, { name: 'artist two' }],
          user: {
            id: '1337',
          },
        }}
      />
    )
  })

  it('should return null if no track is provided', () => {
    component.setProps({
      track: null,
    })

    expect(component.type()).toBeNull()
  })

  it('renders NowPlaying', () => {
    expect(component).toMatchSnapshot()
  })
})
