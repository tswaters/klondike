import { undoable } from './undoable'
import { Stack, StackType } from '../lib/Stack'
import { append_cards, move_cards } from '../lib/util'
import {
  GlobalActions,
  INITIALIZE,
  MOVE_CARDS,
  APPEND_CARDS,
  ScoringType
} from './globals'

const DECREMENT_DRAWS = 'DECREMENT_DRAWS'
type DECREMENT_DRAWS = typeof DECREMENT_DRAWS
type DecrementDrawsAction = { type: DECREMENT_DRAWS }
export const decrementDraws = (): DecrementDrawsAction => ({
  type: DECREMENT_DRAWS
})

export type StockStore = {
  readonly drawsLeft: number
  readonly stacks: Stack[]
}

export type StockActions = DecrementDrawsAction

const initialState: StockStore = {
  drawsLeft: Infinity,
  stacks: [
    {
      type: StackType.stock,
      cards: []
    }
  ]
}

function stockReducer(
  state: StockStore = initialState,
  action: GlobalActions | StockActions
): StockStore {
  if (action.type === INITIALIZE) {
    return {
      ...initialState,
      drawsLeft: action.scoringType === ScoringType.vegas ? 2 : Infinity
    }
  }

  if (action.type === DECREMENT_DRAWS) {
    return {
      ...state,
      drawsLeft: state.drawsLeft - 1
    }
  }

  if (
    action.type === MOVE_CARDS &&
    state.stacks.some(stack => [action.from, action.to].indexOf(stack) > -1)
  ) {
    return {
      ...state,
      stacks: move_cards(
        state.stacks,
        action.from,
        action.to,
        action.cards,
        action.hidden
      )
    }
  }

  if (
    action.type === APPEND_CARDS &&
    state.stacks.some(stack => action.stack === stack)
  ) {
    return {
      ...state,
      stacks: append_cards(state.stacks, action.stack, action.cards)
    }
  }

  return state
}

export default undoable(stockReducer)
