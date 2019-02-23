import { Stack, StackType } from '../lib/Stack'
import {
  select_card,
  deselect_card,
  move_cards,
  append_cards
} from '../lib/util'
import { undoable } from './undoable'
import {
  GlobalActions,
  INITIALIZE,
  SELECT_CARD,
  DESELECT_CARD,
  MOVE_CARDS,
  APPEND_CARDS,
  REVEAL_TOP
} from './globals'

export type TableauStore = {
  readonly stacks: Stack[]
}

const initialState: TableauStore = {
  stacks: [
    { type: StackType.tableau, cards: [] },
    { type: StackType.tableau, cards: [] },
    { type: StackType.tableau, cards: [] },
    { type: StackType.tableau, cards: [] },
    { type: StackType.tableau, cards: [] },
    { type: StackType.tableau, cards: [] },
    { type: StackType.tableau, cards: [] }
  ]
}

function tableauReducer(
  state: TableauStore = initialState,
  action: GlobalActions
): TableauStore {
  if (action.type === INITIALIZE) {
    return { ...initialState }
  }

  if (
    action.type === SELECT_CARD &&
    state.stacks.some(stack => stack === action.stack)
  ) {
    return { ...state, stacks: select_card(state.stacks, action.card) }
  }

  if (
    action.type === DESELECT_CARD &&
    state.stacks.some(stack => !!stack.selection)
  ) {
    return { ...state, stacks: deselect_card(state.stacks) }
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

  if (action.type === REVEAL_TOP) {
    return {
      ...state,
      stacks: state.stacks.map(stack => {
        if (stack !== action.stack) {
          return stack
        }
        return {
          ...stack,
          cards: stack.cards.map((card, index) => {
            if (index < stack.cards.length - 1) {
              return card
            }
            return { ...card, hidden: false }
          })
        }
      })
    }
  }

  return state
}

export default undoable(tableauReducer)
