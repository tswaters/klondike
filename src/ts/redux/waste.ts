
import {INITIALIZE, GlobalActions, SELECT_CARD, DESELECT_CARD, MOVE_CARDS, APPEND_CARDS} from './actions'
import {select_card, deselect_card, move_cards, append_cards} from '../lib/util'
import {Stack, StackType} from '../lib/Stack'
import {undoable} from './undoable'

export type WasteStore = {
  readonly stacks: Stack[] // this is an array for consistency with other stores
  readonly showing: number
}

const initialState: WasteStore = {stacks: [{type: StackType.waste, cards: []}], showing: 0}

function wasteReducer (
  state: WasteStore = initialState,
  action: GlobalActions
): WasteStore {

  if (action.type === INITIALIZE) {
    return {...initialState}
  }

  if (action.type === SELECT_CARD && state.stacks.some(stack => stack === action.stack)) {
    return {...state, stacks: select_card(state.stacks, action.card)}
  }

  if (action.type === DESELECT_CARD && state.stacks.some(stack => !!stack.selection)) {
    return {...state, stacks: deselect_card(state.stacks)}
  }

  if (action.type === MOVE_CARDS && state.stacks.some(stack => [action.from, action.to].indexOf(stack) > -1)) {
    return {
      ...state,
      showing: action.to === state.stacks[0]
        ? Math.min(state.stacks[0].cards.length + action.cards.length, 3)
        : Math.max(1, state.showing - 1),
      stacks: move_cards(state.stacks, action.from, action.to, action.cards)
    }
  }

  if (action.type === APPEND_CARDS && state.stacks.some(stack => action.stack === stack)) {
    return {
      ...state,
      showing: action.stack === state.stacks[0]
        ? Math.min(state.stacks[0].cards.length + action.cards.length, 3)
        : Math.max(1, state.showing - 1),
      stacks: append_cards(state.stacks, action.stack, action.cards)
    }
  }

  return state

}

export default undoable(wasteReducer)
