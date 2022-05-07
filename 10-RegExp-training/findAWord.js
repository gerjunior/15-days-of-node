function processData(input) {
  const splittedInput = input.split('\n')

  const n = Number(splittedInput[0])
  const sentences = splittedInput.slice(1, n + 1)

  const words = splittedInput.slice(n + 1)

  for (let w = 0; w < words.length; w++) {
    const wordExp = new RegExp(String.raw`\b${words[w]}\b`, 'g')

    let matches = 0

    for (let s = 0; s < sentences.length; s++) {
      const sentenceMatches = sentences[s].match(wordExp)

      matches += (sentenceMatches && sentenceMatches.length) || 0
    }

    console.log(matches)
  }
}

process.stdin.resume()
process.stdin.setEncoding('ascii')
let _input = ''
process.stdin.on('data', (input) => {
  _input += input
})

process.stdin.on('end', () => {
  processData(_input)
})
