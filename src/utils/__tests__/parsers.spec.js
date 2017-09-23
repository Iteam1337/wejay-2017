import { timeParser } from '../parsers'

describe('#timeParser', () => {
  it('returns time with h:min:s', () => {
    expect(timeParser(5000000)).toEqual('1:23:20')
  })

  it('returns time with min:s', () => {
    expect(timeParser(500000)).toEqual('8:20')
  })

  it('returns time with 0:s', () => {
    expect(timeParser(50000)).toEqual('0:50')
  })

  it('returns when seconds are exactly 60', () => {
    expect(timeParser(60000)).toEqual('1:00')
  })

  it('returns when minutes are exactly 60', () => {
    expect(timeParser(3600000)).toEqual('1:00:00')
  })
})
