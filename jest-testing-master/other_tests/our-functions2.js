import thumbWar from './thumb-war'
import * as utils from './utils'
import assert from 'assert'

function fn(impl = () => {}) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args)
    return impl(...args)
  }
  mockFn.mock = { calls: [] }
  return mockFn
}

test('testing solution to mock modules', () => {
  const utilsPath = require.resolve('./utils')
  require.cache[utilsPath] = {
    id: utilsPath,
    filename: utilsPath,
    loaded: true,
    exports: {
      getWinner: fn((p1, p2) => p1),
    },
  }

  const winner = thumbWar('one', 'two')

  assert.strictEqual(winner, 'one')
  assert.deepStrictEqual(utils.getWinner.mock.calls, [
    ['one', 'two'],
    ['one', 'two'],
  ])

  // cleanup
  delete require.cache[utilsPath]
})
