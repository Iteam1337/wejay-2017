import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AddTrack } from '../AddTrack'
import md5 from 'md5'

jest.mock('md5', () => jest.fn(() => 'md5'))
jest.mock('../Room', () => ({
  roomQuery: 'roomQuery'
}))

describe('components/AddTrack', () => {
  let component
  let mutate
  let instance

  beforeEach(() => {
    mutate = jest.fn()

    component = shallow(<AddTrack mutate={mutate} roomName="test" />)

    instance = component.instance()
  })

  it('can render', () => {
    expect(toJson(component)).toMatchSnapshot()
  })

  describe('#handleKeyUp', () => {
    it('does nothing if keypress is not enter (13)', () => {
      const event = {
        keyCode: 31
      }

      instance.handleKeyUp(event)

      expect(mutate).not.toBeCalled()
    })

    it('fetches the saved user and hashes the email', () => {
      const event = {
        keyCode: 13,
        target: {
          value: '1234'
        }
      }

      localStorage.getItem.mockReturnValue('cookie@monster.com')

      instance.handleKeyUp(event)

      expect(localStorage.getItem).toHaveBeenCalledWith('user')
      expect(md5).toHaveBeenCalledWith('cookie@monster.com')
    })

    it('calls mutation with variables', () => {
      const event = {
        keyCode: 13,
        target: {
          value: '1234'
        }
      }

      instance.handleKeyUp(event)

      expect(mutate.mock.calls[0][0].variables).toMatchSnapshot()
    })

    it('sets optimistic response', () => {
      const event = {
        keyCode: 13,
        target: {
          value: '1234'
        }
      }

      instance.handleKeyUp(event)

      expect(mutate.mock.calls[0][0].optimisticResponse).toMatchSnapshot()
    })

    it('handles updates', () => {
      const event = {
        keyCode: 13,
        target: {
          value: '1234'
        }
      }

      instance.handleKeyUp(event)

      const update = mutate.mock.calls[0][0].update
      const store = {
        readQuery: jest.fn().mockReturnValue({
          room: {
            currentTrack: {
              spotifyUri: '4321'
            },
            queue: []
          }
        }),
        writeQuery: jest.fn()
      }
      const updateData = {
        data: {
          queueTrack: {
            spotifyUri: '1234'
          }
        }
      }

      update(store, updateData)

      expect(store.readQuery).toHaveBeenCalledWith({
        query: 'roomQuery',
        variables: {
          name: 'test'
        }
      })

      expect(store.writeQuery).toHaveBeenCalledWith({
        query: 'roomQuery',
        variables: {
          name: 'test'
        },
        data: store.readQuery()
      })

      expect(event.target.value).toEqual('')
    })
  })
})
