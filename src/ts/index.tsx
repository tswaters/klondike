import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as offline from 'offline-plugin/runtime'
import { Provider } from 'react-redux'
import configStore from './store'
import { initialize } from './redux/actions'
import { Container } from './components/Container'
import { ThunkDispatch } from './redux'

offline.install({
  onUpdateReady() {
    offline.applyUpdate()
  },
  onUpdated() {
    window.location.reload()
  }
})

const store = configStore()
;(store.dispatch as ThunkDispatch)(initialize())

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('root')
)
