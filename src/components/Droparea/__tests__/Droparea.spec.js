import React from 'react'
import { shallow } from 'enzyme'
import { Droparea } from '../Droparea'

describe('components/Droparea', () => {
  let component
  let event
  let instance

  beforeEach(() => {
    event = {
      preventDefault: jest.fn()
    }

    component = shallow(<Droparea />)

    instance = component.instance()
  })

  it('renders Droparea', () => {
    expect(component).toMatchSnapshot()
  })

  describe('#onDragEnter', () => {
    it('should prevent default if an event is provided', () => {
      instance.onDragEnter(event)

      expect(event.preventDefault).toHaveBeenCalled()
    })

    it('should set dragover on state', () => {
      instance.onDragEnter()

      expect(event.preventDefault).not.toHaveBeenCalled()
      expect(component.state().isDragOver).toBe(true)
    })
  })

  describe('#onDragLeave', () => {
    it('should prevent default if an event is provided', () => {
      instance.onDragLeave(event)

      expect(event.preventDefault).toHaveBeenCalled()
    })

    it('should reset dragover on state', () => {
      instance.onDragLeave()

      expect(event.preventDefault).not.toHaveBeenCalled()
      expect(component.state().isDragOver).toBe(false)
    })
  })
})
