import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Rooms } from '../Rooms'

describe('components/Rooms', () => {
  let component
  let instance
  let mutate
  let history

  beforeEach(() => {
    mutate = jest.fn()
    history = { push: jest.fn() }

    component = shallow(
      <Rooms history={history} mutate={mutate} rooms={[{ name: 'test' }]} />
    )

    instance = component.instance()
  })

  it('returns empty state if no rooms', () => {
    component.setProps({
      rooms: []
    })

    expect(toJson(component)).toMatchSnapshot()
  })

  it('renders Rooms', () => {
    expect(toJson(component)).toMatchSnapshot()
  })

  it('should handle button clicks', () => {
    const button = component.find('button')

    button.simulate('click')

    expect(mutate).toBeCalled()
  })

  describe('#joinRoom', () => {
    it('returns if no user is set', () => {
      localStorage.getItem.mockReturnValue(null)

      instance.joinRoom('test')

      expect(mutate).not.toBeCalled()
    })

    it('calls the add room mutation', () => {
      localStorage.getItem.mockReturnValue('cookie@monster.com')

      instance.joinRoom('test')

      expect(mutate).toHaveBeenCalledWith({
        variables: {
          input: {
            roomName: 'test',
            email: 'cookie@monster.com'
          }
        }
      })
    })

    it('redirects to the room', async () => {
      try {
        localStorage.getItem.mockReturnValue('cookie@monster.com')

        await instance.joinRoom('test')

        expect(history.push).toHaveBeenCalledWith('/room/test')
      } catch (e) {
        throw new Error(e)
      }
    })
  })
})
