
'use strict'

const port = process.env.PORT || 1337
const app = require('./app/app')
const build = require('./app/assets')

build().then(() => {
  app.listen(port, () => console.log(`app listening on ${port}`))
})
.catch(console.error)


