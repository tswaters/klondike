
import deck from '../lib/Deck'
import {INITIALIZE, GlobalActions, SELECT_CARD, DESELECT_CARD, MOVE_CARDS, REPLACE_TOP} from './actions'
import {Stack, StackType, } from '../lib/Stack'
import {select_card, deselect_card, move_cards} from '../lib/util'

export type TableauStore = {
  readonly stacks: Stack[]
}

const initialState: TableauStore = {stacks: []}

export default function tableauReducer (
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
      stack.cards.push({card: deck.getCard()})
      stacks.push(stack)
    }

    return {stacks}
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
