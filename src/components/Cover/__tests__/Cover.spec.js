import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Cover from '../Cover'

describe('components/Cover', () => {
  let component

  beforeEach(() => {
    component = shallow(
      <Cover
        album={{
          images: [
            {
              url: 'test.png'
            }
          ]
        }}
        width={50}
      />
    )
  })

  it('renders a temp cover if no images are provided', () => {
    component.setProps({
      album: {}
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('renders Cover', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
