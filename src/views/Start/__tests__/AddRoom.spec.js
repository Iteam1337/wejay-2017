import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AddRoom } from '../AddRoom'

describe('components/AddRoom', () => {
  let component
  let instance

  beforeEach(() => {
    component = shallow(<AddRoom />)
    instance = component.instance()
  })

  it('renders AddRoom', () => {
    expect(toJson(component)).toMatchSnapshot()
  })

  describe('#updateRoomName', () => {
    it('sets room name on state', () => {
      const event = {
        target: {
          value: 'test'
        }
      }

      instance.updateRoomName(event)

      expect(component.state().roomName).toEqual('test')
    })
  })
})
