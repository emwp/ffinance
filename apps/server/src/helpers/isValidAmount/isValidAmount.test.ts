import { expect, it } from 'vitest'
import isValidAmount from '.'
 
it('should be true for integer string', () => {
  expect(isValidAmount("100000")).toBe(true)
})

it('should be true for float string', () => {
  expect(isValidAmount("142.55")).toBe(true)
})

it('should be true for scientific notation string', () => {
  expect(isValidAmount("1.23e6")).toBe(true)
})

it('should be false for javascript object (array)', () => {
  expect(isValidAmount("[]")).toBe(false)
})

it('should be false for undefined', () => {
  expect(isValidAmount("undefined")).toBe(false)
})

it('should be false for null', () => {
  expect(isValidAmount("null")).toBe(false)
})

it('should be false for non numeric values', () => {
  expect(isValidAmount("こんにちは")).toBe(false)
})