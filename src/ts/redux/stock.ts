
import {undoable} from './undoable'
import {INITIALIZE, GlobalActions, APPEND_CARDS, MOVE_CARDS} from './actions'
import {Stack, StackType} from '../lib/Stack'
import {append_cards, move_cards} from '../lib/util'

const USE_STOCK = 'USE_STOCK'
type USE_STOCK = typeof USE_STOCK
type UseStockAction = {type: USE_STOCK, count: number}

export function useStock (count: number): UseStockAction {
  return {type: USE_STOCK, count}
}

export type StockActions = UseStockAction

export type StockStore = {
  readonly stacks: Stack[] // this is an array for consistency with other stores
  readonly left: number
}

const initialState: StockStore = {
  stacks: [{
    type: StackType.stock,
    cards: []
  }],
  left: 24
}

function stockReducer (
  state: StockStore = initialState,
  action: StockActions | GlobalActions
): StockStore {

  if (action.type === INITIALIZE) {
    return {...initialState}
  }

  if (action.type === USE_STOCK) {
    return {...state, left: state.left - action.count}
  }

  if (action.type === MOVE_CARDS && state.stacks.some(stack => [action.from, action.to].indexOf(stack) > -1)) {
    return {...state, stacks: move_cards(state.stacks, action.from, action.to, action.cards)}
  }

  if (action.type === APPEND_CARDS && state.stacks.some(stack => action.stack === stack)) {
    return {...state, stacks: append_cards(state.stacks, action.stack, action.cards)}
  }

  return state

}

export default undoable(stockReducer)
