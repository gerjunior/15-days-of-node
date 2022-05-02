export const errorHandlers = {
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

export const getErrorHandler = (errorCode) => errorHandlers[errorCode]
