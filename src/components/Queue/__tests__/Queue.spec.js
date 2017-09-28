import React from 'react'
import { shallow } from 'enzyme'
import Queue from '../Queue'

describe('components/Queue', () => {
  let component

  beforeEach(() => {
    component = shallow(
      <Queue
        tracks={[
          {
            name: 'Circles',
            spotifyUri: 1337
          }
        ]}
      />
    )
  })

  it('can render', () => {
    expect(component).toMatchSnapshot()
  })

  it('should display empty state when no queue', () => {
    component.setProps({
      tracks: []
    })

    expect(component.find('.EmptyState')).toMatchSnapshot()
  })
})
