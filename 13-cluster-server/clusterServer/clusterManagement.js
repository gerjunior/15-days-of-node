import os from 'node:os'
import cluster from 'node:cluster'

const runPrimaryProcess = () => {
  const processes = os.cpus().length

  console.log(`Starting ${processes} processes...`)
  for (let i = 0; i < processes; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(
        `Worker ${worker.process.pid} died with code ${code}. Starting a new worker...`,
      )
      cluster.fork()
      console.log(`Running ${Object.keys(cluster.workers).length} workers`)
    }
  })
}

const runWorkerProcess = async () => {
  await import('./server.js')
}

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess()
