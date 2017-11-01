import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Gravatar from '../Gravatar'

jest.mock('md5', () => jest.fn(() => 'md5'))

describe('components/Gravatar', () => {
  let component

  beforeEach(() => {
    component = shallow(
      <Gravatar alt="Name" email="cookie@monster.com" size={50} />
    )
  })

  it('renders Gravatar', () => {
    expect(toJson(component)).toMatchSnapshot()
  })

  it('renders Gravatar using id', () => {
    component.setProps({
      id: '123',
      email: undefined,
    })

    expect(toJson(component)).toMatchSnapshot()
  })
})
