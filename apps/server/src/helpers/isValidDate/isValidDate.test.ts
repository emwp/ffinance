import { expect, it } from 'vitest'
import isValidDate from '.'
 
it('should be true for date string', () => {
  expect(isValidDate("2020-01-01")).toBe(true)
})

it('should be false for regular string', () => {
  expect(isValidDate("invalid")).toBe(false)
})

it('should be false for object string', () => {
  expect(isValidDate("{}")).toBe(false)
})

it('should be false for boolean string', () => {
  expect(isValidDate("true")).toBe(false)
})

it('should be true for valid year', () => {
  expect(isValidDate("2023")).toBe(true)
})
