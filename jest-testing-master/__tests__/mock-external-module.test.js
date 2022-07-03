import thumbWar from '../thumb-war'
import * as utils from '../utils'

jest.mock('../utils')

test('testing the winner - external module', () => {
  const winner = thumbWar('one', 'two')
  expect(winner).toBe('one')
  expect(utils.getWinner.mock.calls).toEqual([['one', 'two'], ['one', 'two']])

  utils.getWinner.mockReset()
})
