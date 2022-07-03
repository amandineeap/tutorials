import thumbWar from './thumb-war'
import * as utils from './utils'
import assert from 'assert'

/* same as the jest.fn() */
function fn(impl = () => {}) {
  // default value
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args)
    return impl(...args)
  }
  mockFn.mock = { calls: [] }
  mockFn.mockImplementation = newImpl => (impl = newImpl)
  return mockFn
}

test('testing the fn mock', () => {
  const originalGetWinner = utils.getWinner
  utils.getWinner = fn((p1, p2) => p1) // our own fn()

  const winner = thumbWar('one', 'two')
  assert.strictEqual(winner, 'one')
  //   console.log(utils.getWinner.mock.calls)
  assert.deepStrictEqual(utils.getWinner.mock.calls, [
    ['one', 'two'],
    ['one', 'two'],
  ])

  utils.getWinner = originalGetWinner
})

/* same as the jest.spyOn() */
function spyOn(obj, prop) {
  const originalValue = obj[prop]
  obj[prop] = fn()
  obj[prop].mockRestore = () => (obj[prop] = originalValue)
}

test('testing the spyOn', () => {
  const winner = thumbWar('one', 'two')
  spyOn(utils, 'getWinner')

  assert.strictEqual(winner, 'one')
  utils.getWinner.mockImplementation((p1, p2) => p2)
})
