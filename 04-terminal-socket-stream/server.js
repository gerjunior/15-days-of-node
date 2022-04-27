import net from 'node:net'
import { pipeline } from 'node:stream/promises'
import { createWriteStream } from 'node:fs'

/**
 *
 * @param {net.Socket} socket
 */
function listener(socket) {
  pipeline(
    socket, // Readable stream, the socket entrance
    createWriteStream('output.log'), // Writable stream, the file output
  )

  // ? can't have two writable streams for the same pipeline
  pipeline(
    socket,
    process.stdout, // Writable stream, the terminal output
  )
}

net.createServer(listener).listen(1338)

// server.on('connection', (conn) => {
//   conn.id = uuidv4()
//   conn.on('data', () => {
//     conn.write(`ID: ${conn.id}`)
//   })
// })

// server.on('data', (conn) => {
//   conn.pipe(process.stdout)
// })
