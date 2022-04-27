export const routeFunction = (request, response) => {
  const { url, params, matchingRoute } = request

  response.end(
    JSON.stringify({
      url,
      params,
      matchingRoute,
    }),
  )
}

export const routes = {
  '/files': {
    POST: routeFunction,
    GET: routeFunction,
  },
  '/files/:id': {
    GET: routeFunction,
  },
  '/files/move/:from/:to': {
    GET: routeFunction,
  },
}
