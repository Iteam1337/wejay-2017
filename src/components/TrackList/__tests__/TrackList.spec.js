import React from 'react'
import { shallow } from 'enzyme'
import TrackList from '../TrackList'

describe('components/TrackList', () => {
  let component

  beforeEach(() => {
    component = shallow(
      <TrackList
        tracks={[
          {
            name: 'Circles',
            spotifyUri: 1337,
          },
        ]}
      />
    )
  })

  it('can render', () => {
    expect(component).toMatchSnapshot()
  })

  it('should display empty state when no TrackList', () => {
    component.setProps({
      tracks: [],
    })

    expect(component.find('.EmptyState')).toMatchSnapshot()
  })
})
