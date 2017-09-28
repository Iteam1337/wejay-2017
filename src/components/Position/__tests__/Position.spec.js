import React from 'react'
import { shallow } from 'enzyme'
import Position from '../Position'

describe('components/Position', () => {
  let component

  beforeEach(() => {
    component = shallow(<Position />)
  })

  it('renders Position', () => {
    expect(component).toMatchSnapshot()
  })
})
