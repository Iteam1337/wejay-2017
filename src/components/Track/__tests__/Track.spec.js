import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Track from '../Track'

describe('components/Track', () => {
  let component

  beforeEach(() => {
    component = shallow(
      <Track
        track={{
          artists: [
            {
              name: 'artist',
            },
            { name: 'artist two' },
          ],
          duration: 200,
          name: 'track',
          user: {
            id: '1',
          },
        }}
      />
    )
  })

  it('returns null if no track', () => {
    component.setProps({
      track: undefined,
    })

    expect(component.type()).toBeNull()
  })

  it('renders a pending Track if no duration (optimisticResponse)', () => {
    component.setProps({
      track: {
        duration: 0,
        user: {
          id: '1',
        },
      },
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('renders Track', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
