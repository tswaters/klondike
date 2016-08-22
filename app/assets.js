/* eslint no-console: 0 */

'use strict'

const isProd = process.env.NODE_ENV === 'production'

const watch = require('node-watch')
const promisify = require('es6-promisify')
const fs = require('fs.extra')
const sass = require('node-sass')
const UglifyJS = require('uglify-js')
const tscWrapper = require('tsc-wrapper')

const write = promisify(fs.writeFile)
const copy = promisify(fs.copy)
const mkdirp = promisify(fs.mkdirp)
const rmrf = promisify(fs.rmrf)
const copyRecursive = promisify(fs.copyRecursive)
const render = promisify(sass.render)

module.exports = () => {
  return generate()
    .then(() => {
      console.log('Finished generation...')
      if (isProd) { return }
      watch('./assets', fileName => {
        console.log(`${fileName} has changed, regenerating assets`)
        generate()
          .then(() => console.log('Finished generation...'))
          .catch(e => console.error(e))
      })

    })
}

function generate () {

  return rmrf('./public')

    .then(() => mkdirp('./public'))
    .then(() => mkdirp('./public/css'))
    .then(() => mkdirp('./public/js'))

    // copy html and images to public, and typescript if not prod (for source maps)
    .then(() => copy('./assets/index.html', './public/index.html'))
    .then(() => copyRecursive('./assets/images', './public/images'))
    .then(() => !isProd && copyRecursive('./assets/ts', './public/ts'))

    // compile typescript into public
    .then(() => tscWrapper('./tsconfig.json', isProd))

    // uglify program.js if in production
    .then(() => {
      if (!isProd) { return }
      const result = UglifyJS.minify('./public/js/program.js')
      return write('./public/js/program.js', result.code)
    })

    // compile sass and save to public
    .then(() => render({file: './assets/sass/importer.scss', outputStyle: isProd ? 'compressed' : 'compact'}))
    .then(sassFile => write('./public/css/page.css', sassFile.css))

}
