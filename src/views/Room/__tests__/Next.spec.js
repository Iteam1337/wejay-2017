import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Next } from '../Next'

describe('components/Next', () => {
  let component
  let mutate

  beforeEach(() => {
    mutate = jest.fn()

    component = shallow(<Next mutate={mutate} roomName="test" />)
  })

  it('can render', () => {
    expect(toJson(component)).toMatchSnapshot()
  })

  it('handles the mutation on click', () => {
    component.simulate('click')

    expect(mutate).toHaveBeenCalledWith({
      variables: {
        roomName: 'test'
      }
    })
  })
})
