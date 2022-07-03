import thumbWar from '../thumb-war'
import * as utils from '../utils'

jest.mock('../utils', () => {
  return {
    getWinner: jest.fn((p1, p2) => p1),
  }
})

test('testing the winner', () => {
  const winner = thumbWar('one', 'two')
  expect(winner).toBe('one')
  expect(utils.getWinner.mock.calls).toEqual([['one', 'two'], ['one', 'two']])

  utils.getWinner.mockReset()
})
