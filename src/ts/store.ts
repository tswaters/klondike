import { createStore, applyMiddleware } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer, { StoreState, StoreActions } from './redux'
import subscribe from 'redux-subscribe-reselect'
import { ScoreStore } from './redux/score'
import { getScore } from './redux/selectors'
import { saveScore } from './lib/persist'

export default (state?: object) => {
  const middleware = []

  middleware.push(thunk as ThunkMiddleware<StoreState, StoreActions>)

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
  }

  const store = createStore(reducer, state!, applyMiddleware(...middleware))
  subscribe(store, getScore, (score: ScoreStore) => saveScore(score))
  return store
}
