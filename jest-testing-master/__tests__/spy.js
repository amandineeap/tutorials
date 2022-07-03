import thumbWar from '../thumb-war'
import * as utils from '../utils'

test('testing the winner', () => {
  jest.spyOn(utils, 'getWinner')
  utils.getWinner.mockImplementation((p1, p2) => p1)

  const winner = thumbWar('one', 'two')
  expect(winner).toBe('one')
  expect(utils.getWinner.mock.calls).toEqual([['one', 'two'], ['one', 'two']])
  expect(utils.getWinner).toHaveBeenCalledTimes(2)
  expect(utils.getWinner).toHaveBeenCalledWith('one', 'two')
  expect(utils.getWinner).toHaveBeenNthCalledWith(1, 'one', 'two')
  expect(utils.getWinner).toHaveBeenNthCalledWith(2, 'one', 'two')

  utils.getWinner.mockRestore() // replaces with empty mock function
})
