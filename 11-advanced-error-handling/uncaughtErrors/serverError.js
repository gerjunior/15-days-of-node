import http from 'node:http'

async function handler(request, response) {
  try {
    for await (const data of request) {
      await Promise.reject('error inside the for loop')
    }
    response.end()
  } catch (error) {
    console.log('a server error occurred', error)
    response.writeHead(500)
    response.write(JSON.stringify({ message: 'internal server error' }))
    response.end()
  }
}

http
  .createServer(handler)
  .listen(3000, () => console.log('Server running on port 3000'))
