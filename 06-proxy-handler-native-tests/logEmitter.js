import { EventEmitter } from 'node:events'
import { appendFile, writeFile } from 'node:fs'

export default class LogEmitter {
  constructor() {
    const log = new EventEmitter()

    this.fileName = 'output.log'

    this.#generateLogEvents()
    writeFile(this.fileName, '------LOG START------\n', () => {})

    this.log = log
  }

  #generateLogEvents() {
    this.log.on('startGetData', ({ tableName, id }) => {
      const content = LogEmitter.formatLog({
        type: 'GET:START',
        tableName,
        id,
      })
      appendFile(this.fileName, content, LogEmitter.appendFileCallback)
    })

    this.log.on('finishGetData', ({ tableName, id }) => {
      const content = LogEmitter.formatLog({
        type: 'GET:FINISH',
        tableName,
        id,
      })
      appendFile(this.fileName, content, LogEmitter.appendFileCallback)
    })
  }

  static formatLog = ({ type, tableName, id }) =>
    `[${type}]: Table: ${tableName} - Id: ${id} on ${Date.now()}\n`

  static appendFileCallback = (err) => {
    if (err) {
      console.error('error writing to file', err)
    }
  }

  getInstance() {
    return this.log
  }
}
