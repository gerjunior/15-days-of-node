import { readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import pdf from 'pdf-parse'

const DIRNAME = dirname(fileURLToPath(import.meta.url))

const dataBuffer = await readFile(join(DIRNAME, '..', 'docs', 'contrato.pdf'))
const data = await pdf(dataBuffer)
console.log(data)
