import http from 'node:http'
import { promisify } from 'node:util'

/**
 * @param {http.RequestOptions} req
 * @param {http.ServerResponse} res
 */
const handler = (req, res) => {
  res.writeHead(200)
  res.end()

  // ? only a worker is finished
  console.log(
    `HTTP request handled by PID ${process.pid}. Killing worker with exit code 0`,
  )
  process.exit(0)
}

const server = http
  .createServer(handler)
  .listen(3000, () =>
    console.log(`server listening on port 3000 and pid ${process.pid}`),
  )

process.on('SIGINT', async (sig) => {
  console.log(
    `${sig} signal received for ${process.pid}. exiting application after running requests are finished`,
  )

  await promisify(server.close.bind(server))()

  console.log('application exited with success')
})

setTimeout(() => {
  process.exit(1)
}, Math.random() * 1e4)
