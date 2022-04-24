import { setTimeout } from 'timers/promises'

// ? generators declaration
function* fnGenerator() {
  yield 1
  yield 2
  yield 3
}

const iterator = fnGenerator()
console.log(
  iterator.next(), // { value: 1, done: false }
  iterator.next(), // { value: 2, done: false }
  iterator.next(), // { value: 3, done: false }
  iterator.next(), // { value: undefined, done: true }
)

// ? (thanks for the comment autocomplete, copilot)

// ? iterators are everywhere! They can be used in for-of loops
// ? it is like calling iterator.next() for each iteration
for (const iteration of fnGenerator()) {
  console.log(iteration) // 1, 2, 3
}

const object = {
  this: true,
  is: true,
  an: true,
  object: true,
}

for (const iteration of Object.keys(object)) {
  console.log(iteration) // this, is, an, object
}

// ? generators are just a "syntax sugar" for iterators. You can also make them manually
const array = {
  values: [1, 2, 3],
  [Symbol.iterator]() {
    let i = 0
    return {
      next: () => {
        if (i < this.values.length) {
          return { value: this.values[i++], done: false }
        }
        return { value: undefined, done: true }
      },
    }
  },
}

for (const item of array) {
  console.log(item) // 1, 2, 3
}

// ? You can also make them async!
const delay = 500
// async function* asyncGenerator() {
//   // node 18 async setTimeout!
//   yield setTimeout(delay).then(() => 1)
//   yield setTimeout(delay).then(() => 2)
//   yield setTimeout(delay).then(() => 3)
// }

// for await (const iteration of asyncGenerator()) {
//   console.log(iteration)
// }

// ? also async iterators (manually)

const database = {
  tables: {
    users: [
      {
        name: 'John',
        age: 17,
      },
      {
        name: 'Filisbine',
        age: 12,
      },
    ],
  },
  getAll(tableName) {
    return {
      [Symbol.asyncIterator]: () => {
        let i = 0
        return {
          next: () => {
            if (i < this.tables[tableName].length) {
              return setTimeout(delay, {
                value: this.tables[tableName][i++],
                done: false,
              })
            }

            return setTimeout(delay, {
              value: this.tables[tableName][i],
              done: true,
            })
          },
        }
      },
    }
  },
  getAllGenerator(tableName) {
    let i = 0
    const context = this
    return {
      *[Symbol.asyncIterator]() {
        while (i < context.tables[tableName].length) {
          yield setTimeout(delay, context.tables[tableName][i++])
        }
      },
    }
  },
}

for await (const user of database.getAll('users')) {
  console.log(await user)
}

for await (const user of database.getAllGenerator('users')) {
  console.log(await user)
}
