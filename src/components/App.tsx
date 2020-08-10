import * as React from 'react'

import { Provider } from 'react-redux'

import Container from './Container'
import { retrieve, PersistanceType } from '../lib/Persist'
import { ScoringType } from '../lib/Scoring'
import { ColorSchemeType } from '../drawing/ColorScheme'
import store from '../redux'
import { initializeGame } from '../redux/thunks'

const App: React.FC = () => {
  const newNumber = retrieve(PersistanceType.number, 0)
  const newType = retrieve<ScoringType>(PersistanceType.type, ScoringType.regular)
  const newTheme = retrieve<ColorSchemeType>(PersistanceType.theme, ColorSchemeType.dark)

  store.dispatch(initializeGame({ newType, newNumber, newTheme }))

  return (
    <Provider store={store}>
      <Container />
    </Provider>
  )
}

export { App }

export default React.memo(App)
