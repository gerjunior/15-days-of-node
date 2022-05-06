import { describe, it } from 'mocha'
import { expect } from 'chai'
import { InvalidRegexError, evaluateRegex } from '../src/util.js'

describe('#util', () => {
  it('#evaluateRegex should throw an error using an unsafe regex', () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/
    expect(() => evaluateRegex(unsafeRegex)).to.throw(
      InvalidRegexError,
      `The expression "${unsafeRegex}" is unsafe!`,
    )
  })

  it('#evaluateRegex should not throw an error using a safe regex', () => {
    const safeRegex = /^([a-z])$/

    expect(() => evaluateRegex(safeRegex)).to.not.throw
    expect(evaluateRegex(safeRegex)).to.be.ok
  })
})
