/* eslint no-console: 0 */

'use strict'

const isProd = process.env.NODE_ENV === 'production'

const watch = require('node-watch')
const promisify = require('es6-promisify')
const fs = require('fs.extra')
const sass = require('node-sass')
const UglifyJS = require('uglify-es')
const tscWrapper = require('tsc-wrapper')

const write = promisify(fs.writeFile)
const read = promisify(fs.readFile)
const copy = promisify(fs.copy)
const mkdirp = promisify(fs.mkdirp)
const rmrf = promisify(fs.rmrf)
const copyRecursive = promisify(fs.copyRecursive)
const render = promisify(sass.render)

async function start () {

  await generate()
  if (isProd) { return true }

  watch('./assets', fileName => {
    console.log(`${fileName} has changed, regenerating assets`)
    generate().catch(console.error)
  })
}

async function generate () {

  await rmrf('./public')
  await mkdirp('./public/js')
  await mkdirp('./public/css')

  await copy('./assets/index.html', './public/index.html')
  await copy('./assets/cards.html', './public/cards.html')
  await copyRecursive('./assets/images', './public/images')

  if (!isProd) {
    await copyRecursive('./assets/ts', './public/ts')
  }

  await tscWrapper('./tsconfig.json', isProd)


  if (isProd) {
    const program = await read('./public/js/program.js', {encoding: 'utf8'})
    const result = UglifyJS.minify(program, {compress: true, mangle: true})
    if (result.error) { throw result.error }
    await write('./public/js/program.js', result.code)
  }

  const sassFile = await render({
    file: './assets/sass/importer.scss',
    outputStyle: isProd ? 'compressed' : 'compact'
  })

  await write('./public/css/page.css', sassFile.css)
  console.log('Finished generation...')
}

module.exports = start
