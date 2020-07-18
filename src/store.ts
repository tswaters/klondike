import { createStore, applyMiddleware } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer, { StoreState, StoreActions } from './redux'
import subscribe from 'redux-subscribe-reselect'
import { saveScore, GameStateStore } from './redux/game-state'
import { getGameState } from './redux/selectors'

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
  subscribe(store, getGameState, (score: GameStateStore) => saveScore(score))
  return store
}
