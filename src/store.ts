import { createStore, applyMiddleware } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer, { StoreState, StoreActions } from './redux'
import subscribe from 'redux-subscribe-reselect'
import { getScoringType, getGameState, getTheme, getGameNumber } from './redux/selectors'
import { persist, PersistanceType } from './lib/Persist'
import { ScoringType } from './redux/game-state'

export default () => {
  const middleware = []

  middleware.push(thunk as ThunkMiddleware<StoreState, StoreActions>)

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

  const store = createStore(reducer, void 0, applyMiddleware(...middleware))
  subscribe(store, getGameState, ({ scoringType, score }) => {
    if (scoringType === ScoringType.vegas) persist(PersistanceType.score, score)
  })
  subscribe(store, getScoringType, (scoringType) => persist(PersistanceType.gameMode, scoringType))
  subscribe(store, getTheme, (newTheme) => persist(PersistanceType.theme, newTheme))
  subscribe(store, getGameNumber, (gameNumber) => persist(PersistanceType.gameNumber, gameNumber))

  return store
}
