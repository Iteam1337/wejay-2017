import mockdate from 'mockdate'
import React from 'react'
import { shallow } from 'enzyme'
import Users from '../Users'

describe('components/Users', () => {
  let component

  beforeEach(() => {
    mockdate.set('2017-09-28 12:00')

    component = shallow(
      <Users
        users={[
          { email: 'cookie@monster.com', id: '1', lastPlay: 0 },
          { email: 'count@vancount.com', id: '2', lastPlay: 1505599875714 },
          { email: 'big@bird.com', id: '3', lastPlay: 1506599875714 },
          { email: 'big@bird.com', id: '3', lastPlay: 1506599873714 }
        ]}
      />
    )
  })

  afterEach(() => {
    mockdate.reset()
  })

  it('returns null if no users', () => {
    component.setProps({
      users: []
    })

    expect(component.type()).toBeNull()
  })

  it('renders Users and filters users without play and no plays in the last hour', () => {
    expect(component).toMatchSnapshot()
  })
})
