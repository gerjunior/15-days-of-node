import { describe, it, beforeEach } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'

import LogEmitter from '../logEmitter.js'

describe('#logEmitter', () => {
  beforeEach(() => {
    sinon.restore()
  })

  describe('#formatLog', () => {
    it('should be able to format the log message correctly', () => {
      const fakeDate = '2022-01-01T00:00:00.000Z'
      sinon.stub(Date, 'now').returns(fakeDate)

      const result = LogEmitter.formatLog({
        type: 'GET:START',
        tableName: 'users',
        id: 1,
      })

      expect(result).to.equal(
        `[GET:START]: Table: users - Id: 1 on ${fakeDate}\n`,
      )
    })
  })

  describe('#appendFileCallback', () => {
    it('should log an error to console.error', () => {
      const mockError = sinon.stub(console, 'error').callsFake(() => {})

      const error = new Error('test error')

      LogEmitter.appendFileCallback(error)

      expect(mockError.called).to.be.true

      mockError.clean
    })

    it('should call no log if no error was thrown', () => {
      const mockError = sinon.stub(console, 'error').callsFake(() => {})

      LogEmitter.appendFileCallback(undefined)

      expect(mockError.called).to.be.false
    })
  })
})
