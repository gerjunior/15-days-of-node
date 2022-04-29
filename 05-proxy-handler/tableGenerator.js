import { setTimeout } from 'node:timers/promises'

import LogEmitter from './logEmitter.js'

// node >= v17.5 syntax
import defaultData from './users.json' assert { type: 'json' };

export default class TableGenerator {
  constructor() {
    this.tables = {}
    this.log = new LogEmitter().getInstance()
  }

  createTable(tableName) {
    const table = new Proxy(defaultData, {
      get: async (target, prop) => {
        this.log.emit('startGetData', { tableName, id: prop })
        const data = target[prop]

        await setTimeout(Math.random() * 1000)
        this.log.emit('finishGetData', { tableName, id: prop })

        return data
      },
    })

    this.tables[tableName] = table
    return table
  }

  getData(tableName, userId) {
    const table = this.tables[tableName]
    return table[userId]
  }
}
