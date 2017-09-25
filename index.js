/* eslint no-console: 0 */

'use strict'

const port = process.env.PORT || 1337
const app = require('./app/app')

app.listen(port, () => console.log(`app listening on ${port}`))
