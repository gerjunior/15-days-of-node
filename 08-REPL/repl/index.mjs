import http from 'http'

// curl "localhost:3000?salary=3000&discount=15"

function netSalary({ discount, salary }) {
  const percent = discount / 100
  const cost = salary * percent
  const result = salary - cost

  return result
}

http
  .createServer((req, res) => {
    const url = req.url.replace('/', '')
    const params = new URLSearchParams(url)
    const data = Object.fromEntries(params)

    const result = netSalary(data)

    res.end(`The final net salary is ${result}`)
  })
  .listen(3000, () => console.log('app running at 3000'))
