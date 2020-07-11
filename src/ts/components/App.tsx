import * as React from 'react'

import { Provider } from 'react-redux'

import configStore from '../store'
import { ThunkDispatch, initialize } from '../redux/thunks'
import Container from './Container'

const App: React.FC = () => {
  const store = configStore()
  const dispatch = store.dispatch as ThunkDispatch

  dispatch(initialize())

  return (
    <Provider store={store}>
      <Container />
    </Provider>
  )
}

export { App }

export default React.memo(App)
