import '../__no-framework-mocks__/utils'
const utilsPath = require.resolve('../utils')
const mocksUtilsPath = require.resolve('../__no-framework-mocks__/utils')
require.cache[utilsPath] = require.cache[mocksUtilsPath]

import thumbWar from '../thumb-war'
import * as utils from '../utils'
import assert from 'assert'

test('testing solution to mock external modules', () => {
  const winner = thumbWar('one', 'two')

  assert.strictEqual(winner, 'one')
  //   assert.deepStrictEqual(utils.getWinner.mock.calls[0], [
  //     ['one', 'two'],
  //     ['one', 'two'],
  //   ])

  // cleanup
  delete require.cache[utilsPath]
})
