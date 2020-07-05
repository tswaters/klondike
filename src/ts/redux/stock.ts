import { undoable } from './undoable'
import { StackType } from '../lib/Card'
import {
  GlobalActions,
  INITIALIZE,
  MOVE_CARDS,
  APPEND_CARDS,
  ScoringType,
  Initialize,
  moveCards,
  StackLike,
  appendCards,
} from './globals'

const DECREMENT_DRAWS = 'DECREMENT_DRAWS'
type DECREMENT_DRAWS = typeof DECREMENT_DRAWS
type DecrementDrawsAction = { type: DECREMENT_DRAWS }
export const decrementDraws = (): DecrementDrawsAction => ({
  type: DECREMENT_DRAWS,
})

export type StockStore = StackLike & {
  readonly draws: number
}

export type StockActions = DecrementDrawsAction

const initialState: StockStore = {
  draws: Infinity,
  stacks: [
    {
      index: 0,
      type: StackType.stock,
      cards: [],
    },
  ],
}

const reducers: {
  [key: string]: (
    state: StockStore,
    action: GlobalActions | StockActions,
  ) => StockStore
} = {
  [INITIALIZE]: (state, action: Initialize) => ({
    ...initialState,
    draws: action.scoringType === ScoringType.vegas ? 2 : Infinity,
  }),
  [DECREMENT_DRAWS]: (state) => ({
    ...state,
    draws: state.draws - 1,
  }),
  [APPEND_CARDS]: appendCards,
  [MOVE_CARDS]: moveCards,
}

const stockReducer = (
  state: StockStore = initialState,
  action: GlobalActions | StockActions,
): StockStore => {
  const reducer = reducers[action.type]
  if (reducer != null) {
    return reducer(state, action)
  }
  return state
}

export default undoable(stockReducer)
