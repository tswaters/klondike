import { createStore, applyMiddleware } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer, { StoreState, StoreActions } from './redux'

export default function configStore(state?: object) {
  const middleware = []

  middleware.push(thunk as ThunkMiddleware<StoreState, StoreActions>)

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
  }

  return createStore(reducer, state!, applyMiddleware(...middleware))
}
