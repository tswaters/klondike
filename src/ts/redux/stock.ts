import { undoable } from './undoable'
import { Stack, StackType } from '../lib/Stack'
import { append_cards, move_cards } from '../lib/util'
import { GlobalActions, INITIALIZE, MOVE_CARDS, APPEND_CARDS } from './globals'

export type StockStore = {
  readonly stacks: Stack[]
}

const initialState: StockStore = {
  stacks: [
    {
      type: StackType.stock,
      cards: []
    }
  ]
}

function stockReducer(
  state: StockStore = initialState,
  action: GlobalActions
): StockStore {
  if (action.type === INITIALIZE) {
    return { ...initialState }
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
