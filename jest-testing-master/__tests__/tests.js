// require('./setup-global')
const { sum, substract, asyncSum, asyncSubstract } = require('../math')

test('testing sum', () => {
  const result = sum(3, 7)
  const expected = 10
  expect(result).toBe(expected)
})

test('testing substract', () => {
  const result = substract(7, 3)
  const expected = 4
  expect(result).toBe(expected)
})

test('testing asyncSum', async () => {
  const result = await asyncSum(3, 7)
  const expected = 10
  expect(result).toBe(expected)
})

test('testing asyncSubstract', async () => {
  const result = await asyncSubstract(7, 3)
  const expected = 4
  expect(result).toBe(expected)
})
