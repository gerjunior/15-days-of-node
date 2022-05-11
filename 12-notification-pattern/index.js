import http from 'node:http'
import HeroEntity from './entities/heroEntity.js'
import BusinessError from './errors/businessError.js'
import { statusCodes } from './util/httpStatusCodes.js'

/**
 * @param {http.RequestOptions} request
 * @param {http.ServerResponse} response
 */
async function handler(request, response) {
  for await (const data of request) {
    try {
      const parsedData = JSON.parse(data)

      // ? simulating an internal error
      if (Reflect.has(parsedData, 'connectionError')) {
        throw new Error('error connecting to DB!')
      }

      const hero = new HeroEntity(parsedData)
      // if (!hero.isValid()) {
      //   response.writeHead(statusCodes.BAD_REQUEST)
      //   // ? showing all errors at once
      //   response.end(hero.notifications.join('\n'))
      //   continue
      // }

      if (!hero.isValid()) {
        // ? showing all errors at once, but letting the http layer handle it
        throw new BusinessError(hero.notifications.join('\n'))
      }

      response.writeHead(statusCodes.OK)
      response.end()
    } catch (error) {
      if (error instanceof BusinessError) {
        response.writeHead(statusCodes.BAD_REQUEST)
        response.end(error.message)
        continue
      }

      response.writeHead(statusCodes.INTERNAL_SERVER_ERROR)
      response.end()
    }
  }
}

http.createServer(handler).listen(3000, () => {
  console.log('server is running at port 3000 and pid', process.pid)
})

/**
 * curl -i localhost:3000 -X POST --data '{"name": "Avenger", "age": "80"}'
 */
