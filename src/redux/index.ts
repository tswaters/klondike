import { configureStore, combineReducers, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import subscribe from 'redux-subscribe-reselect'

import { getType, getGameState, getTheme, getNumber } from './selectors'
import stacks from './stacks'
import gameState from './game-state'
import { persist, PersistanceType } from '../lib/Persist'
import { StackCard, Stack } from '../lib/Card'
import { ScoringType } from '../lib/Scoring'

const middleware = getDefaultMiddleware({ immutableCheck: false, serializableCheck: false })

if (process.env.NODE_ENV !== 'production') {
  middleware.push(
    createLogger({
      stateTransformer: (state: StoreState) => ({
        gameState: state.gameState.present,
        stacks: state.stacks.present,
      }),
    }),
  )
}

const reducer = combineReducers({ stacks, gameState })
const store = configureStore({ reducer, middleware })

subscribe(store, getGameState, ({ scoringType, score }) => {
  if (scoringType === ScoringType.vegas) persist(PersistanceType.score, score)
})
subscribe(store, getType, (scoringType) => persist(PersistanceType.type, scoringType))
subscribe(store, getTheme, (newTheme) => persist(PersistanceType.theme, newTheme))
subscribe(store, getNumber, (number) => persist(PersistanceType.number, number))

export type StoreState = ReturnType<typeof reducer>

export type AppDispatch = typeof store.dispatch
export type AppThunk<T = void> = ThunkAction<T, StoreState, unknown, Action>

export type CardSelection = { stackCard: StackCard | null; stack: Stack }

export default store
