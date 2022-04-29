import http from 'node:http'
import TableGenerator from './tableGenerator.js'

const tableGenerator = new TableGenerator()
tableGenerator.createTable('users')

http
  .createServer(async (request, response) => {
    const urlPaths = request.url.split('/')
    const domain = urlPaths[1]
    const id = urlPaths[2]

    const data = await tableGenerator.getData(domain, id)

    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(data))
  })
  .listen(3001, () => console.log('Listening on port 3001'))
