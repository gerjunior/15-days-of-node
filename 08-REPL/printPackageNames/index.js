/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const { existsSync, mkdirSync, rmSync } = require('node:fs')
const { execSync } = require('node:child_process')

const getFileName = (index) => (index >= 3 ? `js-0${index}` : `mjs-0${index}`)

const rmFolder = (folderName) => rmSync(`./${folderName}`, { recursive: true })

const makeDirAndReturnName = (folderName) => {
  if (existsSync(folderName)) {
    rmFolder(folderName)
  }

  mkdirSync(folderName)

  return folderName
}

const initializePackage = (folderName) => {
  execSync(`npm init -y --scope @gerjunior --silent`, { cwd: folderName })

  return folderName
}

const printNameAndPackageVersion = (folderName) => {
  console.log(`${folderName}/package.json`)
  const { name, version } = require(`${folderName}/package.json`)

  console.log({ n: name, v: version })

  return folderName
}

const FOLDER_AMOUNT = 4

Array.from(Array(FOLDER_AMOUNT).keys())
  .map((index) => makeDirAndReturnName(getFileName(index + 1)))
  .map(initializePackage)
  .map(printNameAndPackageVersion)
  .map(rmFolder)
