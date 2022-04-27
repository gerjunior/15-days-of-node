import { match } from 'path-to-regexp'
import { routes } from './routes.js'

const errorHandlers = {
  NoMatchingMethod: (_request, response) => {
    response
      .setHeader('Exception', 'NoMatchingMethod')
      .writeHead(404, 'Not found')
      .end()
  },
  NoMatchingRoute: (_request, response) => {
    response
      .setHeader('Exception', 'NoMatchingRoute')
      .writeHead(404, 'Not found')
      .end()
  },
}

export const findMatchingRoute = (request) => {
  for (const path of Object.keys(routes)) {
    const checkPathMatch = match(path)
    const isMatch = checkPathMatch(request.url)

    if (!isMatch) continue

    const fn = routes[path][request.method]
    if (!fn) return errorHandlers.NoMatchingMethod

    request.params = isMatch.params
    request.matchingRoute = path

    return fn
  }

  return errorHandlers.NoMatchingRoute
}
