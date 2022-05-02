import http from 'node:http'

import { findMatchingRoute } from './findMatchingRoute.js'

http
  .createServer((request, response) => {
    const fn = findMatchingRoute(request, response)
    fn(request, response)
  })
  .listen(3000, () => {
    console.log('Server running on port 3000!')
  })
