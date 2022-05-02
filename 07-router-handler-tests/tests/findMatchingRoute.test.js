/* eslint-disable import/first */
import { describe, it, beforeEach } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'

import * as routesModule from '../src/routes.js'
import { findMatchingRoute } from '../src/findMatchingRoute.js'
import * as errorHandlersModule from '../src/errorHandlers.js'

describe('#findMatchingRoute', () => {
  beforeEach(() => {
    sinon.restore()
  })

  it('should return NoMatchingRoute when no route with the informed path was found', () => {
    sinon.stub(routesModule, 'getRoutes').returns({
      '/cant-see-me': {
        POST: sinon.spy(),
      },
    })
    const getErrorHandler = sinon.spy(errorHandlersModule, 'getErrorHandler')

    const request = {
      method: 'GET',
      url: '/test',
    }

    const result = findMatchingRoute(request)

    const expectedReturnName =
      errorHandlersModule.errorHandlers.NoMatchingRoute.name

    expect(getErrorHandler.calledOnce).to.be.true
    expect(getErrorHandler.firstCall.firstArg).to.equal(expectedReturnName)
    expect(result.name).to.be.equal(expectedReturnName)
  })

  it('should return NoMatchingMethod when there is a route matching the path but not the HTTP method', () => {
    sinon.stub(routesModule, 'getRoutes').returns({
      '/test': {
        POST: sinon.spy(),
      },
    })
    const getErrorHandler = sinon.spy(errorHandlersModule, 'getErrorHandler')

    const request = {
      method: 'PUT',
      url: '/test',
    }

    const result = findMatchingRoute(request)

    const expectedReturnName =
      errorHandlersModule.errorHandlers.NoMatchingMethod.name

    expect(getErrorHandler.calledOnce).to.be.true
    expect(getErrorHandler.firstCall.firstArg).to.equal(expectedReturnName)
    expect(result.name).to.be.equal(expectedReturnName)
  })

  it('should return the route function when there is a matching HTTP method and path', () => {
    const getFunction = sinon.spy()
    sinon.stub(routesModule, 'getRoutes').returns({
      '/test': {
        GET: getFunction,
        POST: sinon.mock,
      },
    })

    const request = {
      method: 'GET',
      url: '/test',
    }

    const result = findMatchingRoute(request)

    expect(result).to.be.equal(getFunction)
    expect(request.params).to.deep.equal({})
    expect(request.matchingRoute).to.equal('/test')
  })

  it('should add add params to the request object from a matching route', () => {
    const getFunction = sinon.spy()
    sinon.stub(routesModule, 'getRoutes').returns({
      '/test/:id': {
        GET: getFunction,
        POST: sinon.mock,
      },
    })

    const id = 'john@email.com'

    const request = {
      method: 'GET',
      url: `/test/${id}`,
    }

    const result = findMatchingRoute(request)

    expect(result).to.be.equal(getFunction)
    expect(request.params).to.deep.equal({ id })
    expect(request.matchingRoute).to.equal('/test/:id')
  })
})
