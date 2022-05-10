import { MongoClient } from 'mongodb'
import http from 'node:http'
import { setTimeout } from 'node:timers/promises'

import { promisify } from 'node:util'

async function dbConnect() {
  const client = new MongoClient('mongodb://localhost:27017')
  await client.connect()
  console.log('mongodb is connected')

  const db = client.db('comics')
  return {
    collections: { heroes: db.collection('heroes') },
    client,
  }
}

const { client, collections } = await dbConnect()

async function handler(request, response) {
  for await (const data of request) {
    try {
      const hero = JSON.parse(data)
      await collections.heroes.insertOne({
        ...hero,
        updatedAt: new Date().toISOString(),
      })

      const heroes = await collections.heroes.find().toArray()

      await setTimeout(10000)

      response.writeHead(200)
      response.write(JSON.stringify(heroes))
    } catch (error) {
      console.log('a request error has happened', error)
      response.writeHead(500, { 'Content-Type': 'application/json' })
      response.write(JSON.stringify({ message: 'internal server error ' }))
    } finally {
      response.end()
    }
  }
}

// await client.close()

/**
 * curl -i localhost:3000 -X POST --data '{"name": "Batman", "age": "80"}'
 */

const server = http
  .createServer(handler)
  .listen(3000, () =>
    console.log('server is running at port 3000', process.pid),
  )

// SIGINT -> ctrl + c
// SIGTERM => KILL

const onStop = async (signal) => {
  console.info(`\n${signal} signal received.`)

  console.log('Closing http server')
  await promisify(server.close.bind(server))()
  console.log('http server has closed')

  console.log('Closing mongodb client')
  await client.close()
  console.log('mongodb has closed')

  process.exit(0)
}

;['SIGINT', 'SIGTERM'].forEach((event) => process.on(event, onStop))
