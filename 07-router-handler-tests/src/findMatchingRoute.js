import { match } from 'path-to-regexp'
import { getRoutes } from './routes.js'
import { getErrorHandler } from './errorHandlers.js'

export const findMatchingRoute = (request) => {
  const routes = getRoutes()

  for (const path of Object.keys(routes)) {
    const checkPathMatch = match(path)
    const isMatch = checkPathMatch(request.url)

    if (!isMatch) continue

    const fn = routes[path][request.method]
    if (!fn) return getErrorHandler('NoMatchingMethod')

    request.params = isMatch.params
    request.matchingRoute = path

    return fn
  }

  return getErrorHandler('NoMatchingRoute')
}
