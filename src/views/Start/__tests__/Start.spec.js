import React from 'react'
import { shallow } from 'enzyme'
import { Start } from '../Start'

describe('components/Start', () => {
  let component
  let instance

  beforeEach(() => {
    component = shallow(
      <Start
        data={{
          loading: true
        }}
      />
    )

    instance = component.instance()
  })

  it('renders loading message', () => {
    expect(component).toMatchSnapshot()
  })

  it('renders error message', () => {
    component.setProps({
      data: {
        error: {
          message: 'error'
        }
      }
    })

    expect(component).toMatchSnapshot()
  })

  it('renders Start', () => {
    component.setProps({
      data: {
        loading: false,
        error: null,
        rooms: []
      }
    })

    expect(component).toMatchSnapshot()
  })

  it('renders Start if user is set', () => {
    component.setProps({
      data: {
        loading: false,
        error: null,
        rooms: []
      }
    })

    component.setState({
      hasUser: true
    })

    expect(component).toMatchSnapshot()
  })

  describe('#saveEmail', () => {
    it('saves email to localStorage', () => {
      component.setState({
        user: 'cookie@monster.com'
      })

      instance.saveEmail()

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'user',
        'cookie@monster.com'
      )
    })

    it('sets has user to true', () => {
      component.setState({
        user: 'cookie@monster.com'
      })

      instance.saveEmail()

      expect(component.state().hasUser).toBe(true)
    })
  })

  describe('#updateEmail', () => {
    it('sets email on state', () => {
      const event = {
        target: {
          value: 'cookie@monster.com'
        }
      }

      instance.updateEmail(event)

      expect(component.state().user).toEqual('cookie@monster.com')
    })
  })
})
