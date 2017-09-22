import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Backdrop from '../Backdrop'

describe('components/Backdrop', () => {
  let component

  beforeEach(() => {
    component = shallow(
      <Backdrop
        track={{
          album: {
            images: [
              {
                url: 'test.png'
              }
            ]
          }
        }}
      />
    )
  })

  it('returns null', () => {
    component.setProps({ track: undefined })

    expect(component.type()).toBeNull()
  })

  it('returns Backdrop', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
