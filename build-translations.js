#!/usr/bin/env node
const babel = require('babel-core')
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const ts = require('typescript')
const tsConfig = require('./tsconfig.json')

const tsFiles = './src/**/*.{ts,tsx}'
const jsFiles = './dist/**/*.{js,jsx}'

const options = ts.convertCompilerOptionsFromJson(tsConfig.compilerOptions, __dirname)
if (!options) {
  console.error(options.errors)
  process.exit(1)
}

function compile(fileNames, options) {
  const program = ts.createProgram(fileNames, options)
  const emitResult = program.emit()

  if (emitResult.emitSkipped) {
    console.error(`Tsbuild failed`)
    process.exit(1)
  }
}

let allMessages = []

compile(glob.sync(tsFiles), options.options)
glob.sync(jsFiles).forEach(file => {
  const stuff = babel.transformFileSync(file, {
    presets: ['env', 'react'],
    plugins: ['react-intl'],
  })
  allMessages = allMessages.concat(stuff.metadata['react-intl'].messages)
})

const sv = {}

allMessages.forEach(message => {
  sv[message.id] = message.defaultMessage
})

fs.writeFileSync(path.join(__dirname, 'src', 'translations', 'sv.json'), JSON.stringify(sv, null, 2))
