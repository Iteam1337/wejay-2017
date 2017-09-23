import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Users from '../Users'

describe('components/Users', () => {
  let component

  beforeEach(() => {
    component = shallow(
      <Users users={[{ email: 'cookie@monster.com', id: '1' }]} />
    )
  })

  it('returns null if no users', () => {
    component.setProps({
      users: []
    })

    expect(component.type()).toBeNull()
  })

  it('renders Users', () => {
    expect(toJson(component)).toMatchSnapshot()
  })
})
