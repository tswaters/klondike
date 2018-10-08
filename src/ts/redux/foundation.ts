
import {INITIALIZE, GlobalActions, SELECT_CARD, DESELECT_CARD, MOVE_CARDS} from './actions'
import {Stack, StackType} from '../lib/Stack'
import {select_card, deselect_card, move_cards} from '../lib/util'
import {undoable} from './undoable'

export type FoundationStore = {
  readonly stacks: Stack[]
}

const initialState: FoundationStore = {
  stacks: [
    {type: StackType.foundation, cards: []},
    {type: StackType.foundation, cards: []},
    {type: StackType.foundation, cards: []},
    {type: StackType.foundation, cards: []}
  ]
}

function foundationReducer (
  state: FoundationStore = initialState,
  action: GlobalActions
): FoundationStore {

  if (action.type === INITIALIZE) {
    return {...initialState}
  }

  if (action.type === SELECT_CARD) {
    if (state.stacks.every(stack => stack !== action.stack)) { return state }
    return {...state, stacks: select_card(state.stacks, action.card)}
  }

  if (action.type === DESELECT_CARD) {
    if (state.stacks.every(stack => stack.selection == null)) { return state }
    return {...state, stacks: deselect_card(state.stacks)}
  }

  if (action.type === MOVE_CARDS) {
    if (state.stacks.every(stack => [action.from, action.to].indexOf(stack) === -1)) { return state }
    return {...state, stacks: move_cards(state.stacks, action.from, action.to, action.cards)}
  }

  return state

}

export default undoable(foundationReducer)
