import { setTimeout as setTimeoutAsync } from 'node:timers/promises'

// const results = [1, 2].map(async (item) => {
//   console.log('starting process')
//   await setTimeoutAsync(100)
//   console.log(item)
//   console.log(await Promise.resolve('timeout order!'))
//   await setTimeoutAsync(100)
//   console.log(item)

//   return parseInt(item, 10) * 2
// })

// console.log('results', await Promise.all(results))

// setTimeout(async () => {
//   console.log('starting process')
//   await setTimeoutAsync(100)
//   console.count('debug')
//   console.log(await Promise.resolve('timeout order!'))
//   await setTimeoutAsync(100)
//   console.count('debug')

//   await Promise.reject('promise rejected on timeout')
// }, 1000)

const throwError = (msg) => {
  throw new Error(msg)
}

try {
  console.log('hello')
  console.log('world')
  throwError('error inside try block')
} catch (error) {
  console.log('catch!', error.message)
} finally {
  console.log('finally!')
}

process.on('unhandledRejection', (e) => {
  console.error('unhandledRejection', e.message || e)
})

process.on('uncaughtException', (e) => {
  console.error('uncaughtException', e.message || e)
})

// setTimeout context, unhandledRejection
setTimeout(async () => {
  await Promise.reject('error inside setTimeout')
}, 1000)

// unhandledRejection
Promise.reject('promised rejected')

// uncaughtException
await Promise.reject('await promised rejected')
