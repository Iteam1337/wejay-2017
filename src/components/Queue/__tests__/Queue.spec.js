import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
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
    expect(toJson(component)).toMatchSnapshot()
  })
})
