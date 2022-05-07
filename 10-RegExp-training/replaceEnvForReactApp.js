import fs from 'node:fs/promises'

const file = await fs.readFile('.env', 'utf8')

const envExp = /^\w+/gm
const replaced = file.replace(envExp, 'REACT_APP_$&')

await fs.writeFile('.env.replaced', replaced)

// ? extract devDependencies from package.json
// cat package.json | jq -r '.devDependencies | keys | .[]' | xargs echo npm install -D
