import net from 'node:net'
import { pipeline } from 'node:stream/promises'

const connection = net.connect(1338)

pipeline(process.stdin, connection)
