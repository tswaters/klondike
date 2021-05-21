import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as offline from '@lcdp/offline-plugin/runtime'

import App from './components/App'

const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === 'production') {
  offline.install({
    onUpdateReady() {
      offline.applyUpdate()
    },
    onUpdated() {
      window.location.reload()
    },
  })
}

ReactDOM.render(<App />, document.getElementById('root'))
