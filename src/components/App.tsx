import * as React from 'react'

import { Provider } from 'react-redux'

import configStore from '../store'
import { ThunkDispatch, initialize } from '../redux/thunks'
import Container from './Container'
import { retrieve, PersistanceType } from '../lib/Persist'
import { ScoringType } from '../redux/game-state'
import { ColorSchemeType } from '../drawing/ColorScheme'

const App: React.FC = () => {
  const store = configStore()
  const dispatch = store.dispatch as ThunkDispatch

  const newNumber = retrieve(PersistanceType.number, 0)
  const newType = retrieve<ScoringType>(PersistanceType.type, ScoringType.regular)
  const newTheme = retrieve<ColorSchemeType>(PersistanceType.theme, ColorSchemeType.dark)

  dispatch(initialize({ newType, newNumber, newTheme }))

  return (
    <Provider store={store}>
      <Container />
    </Provider>
  )
}

export { App }

export default React.memo(App)
