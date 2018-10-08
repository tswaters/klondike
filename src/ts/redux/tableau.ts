
import {INITIALIZE, GlobalActions, SELECT_CARD, DESELECT_CARD, MOVE_CARDS, REPLACE_TOP, APPEND_CARDS} from './actions'
import {Stack, StackType} from '../lib/Stack'
import {select_card, deselect_card, move_cards, append_cards} from '../lib/util'
import {undoable} from './undoable'

export type TableauStore = {
  readonly stacks: Stack[]
}

const initialState: TableauStore = {stacks: []}

function tableauReducer (
  state: TableauStore = initialState,
  action: GlobalActions
): TableauStore {

  if (action.type === INITIALIZE) {

    const stacks: Stack[] = []
    for (let i = 0; i <= 6; i++) {
      const stack: Stack = {type: StackType.tableau, cards: []}
      for (let j = 0; j < i; j++) {
          stack.cards.push({})
      }
      stacks.push(stack)
    }

    return {stacks}
  }

  if (action.type === SELECT_CARD && state.stacks.some(stack => stack === action.stack)) {
    return {...state, stacks: select_card(state.stacks, action.card)}
  }

  if (action.type === DESELECT_CARD && state.stacks.some(stack => !!stack.selection)) {
    return {...state, stacks: deselect_card(state.stacks)}
  }

  if (action.type === MOVE_CARDS && state.stacks.some(stack => [action.from, action.to].indexOf(stack) > -1)) {
    return {...state, stacks: move_cards(state.stacks, action.from, action.to, action.cards)}
  }

  if (action.type === APPEND_CARDS && state.stacks.some(stack => action.stack === stack)) {
    return {...state, stacks: append_cards(state.stacks, action.stack, action.cards)}
  }

  if (action.type === REPLACE_TOP) {
    return {
      ...state,
      stacks: state.stacks.map(stack => {
        if (stack !== action.stack) { return stack }
        return {
          ...stack,
          cards: stack.cards.map((card, index) => {
            if (index < stack.cards.length - 1) { return card }
            return {card: action.card}
          })
        }
      })
    }
  }


  return state

}

export default undoable(tableauReducer)
